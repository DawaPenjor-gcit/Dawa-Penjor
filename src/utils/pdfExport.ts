/**
 * High-fidelity PDF generation and Print utilities for the Bhutan Certificate Generator
 */
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export interface ExportPdfOptions {
  candidateName?: string;
  onProgress?: (status: string) => void;
}

export async function exportCertificateAsPdf(
  elementId: string,
  options: ExportPdfOptions = {}
): Promise<void> {
  const { candidateName = 'Elected_Candidate', onProgress } = options;

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Target certificate element #${elementId} not found.`);
  }

  onProgress?.('Preparing high-resolution certificate canvas...');

  // Wait for fonts to be ready
  if (document.fonts) {
    await document.fonts.ready;
  }

  // Add capturing class to suppress UI guides, tooltips, or edit outlines
  element.classList.add('is-exporting-pdf');

  try {
    onProgress?.('Rendering vector graphics & Dzongkha typography...');

    // Use scale 3 for ~300 DPI print quality without memory crashes
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      imageTimeout: 15000,
      onclone: (clonedDoc) => {
        const clonedElem = clonedDoc.getElementById(elementId);
        if (clonedElem) {
          clonedElem.style.transform = 'none';
          clonedElem.style.boxShadow = 'none';
        }
      },
    });

    onProgress?.('Assembling official A4 landscape PDF...');

    // A4 Landscape: 297mm x 210mm
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    // Standard A4 landscape dimensions
    const pdfWidth = 297;
    const pdfHeight = 210;

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

    // Clean filename
    const sanitizedName = candidateName.replace(/[\/\\?%*:|"<>]/g, '_').trim() || 'Candidate';
    const filename = `Bhutan_Election_Certificate_${sanitizedName}.pdf`;

    pdf.save(filename);
    onProgress?.('Download complete!');
  } finally {
    element.classList.remove('is-exporting-pdf');
  }
}

export function printCertificate(): void {
  window.print();
}
