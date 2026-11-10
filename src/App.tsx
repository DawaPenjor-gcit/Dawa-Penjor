/**
 * CertiCraft Bhutan Election Certificate Generator
 * Official Certificate of Election recreation with customizable bold fields and PDF generation
 */
import React, { useState } from 'react';
import { CertificateData, SpacingConfig, ORIGINAL_SAMPLE_CERTIFICATE, DEFAULT_SPACING_CONFIG } from './types';
import { Header } from './components/Header';
import { CertificateEditor } from './components/CertificateEditor';
import { CertificatePreview } from './components/CertificatePreview';
import { exportCertificateAsPdf, printCertificate } from './utils/pdfExport';
import {
  ShieldCheck,
  Lock,
  Download,
  Printer,
  Sparkles,
  Info,
  X,
  FileCheck2,
  ExternalLink,
} from 'lucide-react';

export default function App() {
  const [data, setData] = useState<CertificateData>(ORIGINAL_SAMPLE_CERTIFICATE);
  const [spacing, setSpacing] = useState<SpacingConfig>(DEFAULT_SPACING_CONFIG);
  const [focusedField, setFocusedField] = useState<keyof CertificateData | null>(null);
  const [highlightBoldFields, setHighlightBoldFields] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportStatus, setExportStatus] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showOriginalModal, setShowOriginalModal] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleDownloadPdf = async () => {
    try {
      setIsExporting(true);
      await exportCertificateAsPdf('certificate-print-area', {
        candidateName: data.candidateName || 'Candidate',
        onProgress: (status) => setExportStatus(status),
      });
      showToast('Certificate successfully downloaded as high-resolution PDF!');
    } catch (err: any) {
      console.error('PDF Export Error:', err);
      showToast(`Export failed: ${err.message || 'Please try again.'}`);
    } finally {
      setIsExporting(false);
      setExportStatus('');
    }
  };

  const handlePrint = () => {
    printCertificate();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 text-slate-900 font-sans">
      {/* Top Header */}
      <Header
        onDownloadPdf={handleDownloadPdf}
        onPrint={handlePrint}
        isExporting={isExporting}
        exportStatus={exportStatus}
        onViewOriginalPdf={() => setShowOriginalModal(true)}
      />

      {/* Institutional Info Banner */}
      <div className="bg-slate-800 text-white px-6 py-2 border-b border-slate-700/80 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-slate-200">
              Election Commission of Bhutan (འབྲུག་གི་བཙག་འཐུ་ལྷན་ཚོགས།)
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">
              Certificate of Election for Elected Candidate (ངོ་སྦྱོར་ལག་ཁྱེར།)
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-amber-400" />
              Editable bold fields, changeable passport photo &amp; QR code · Dynamic space adjustment
            </span>
            <span>·</span>
            <span className="text-slate-300">Section 465, Election Act 2008</span>
          </div>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex items-center bg-white border-b border-slate-200 p-2 gap-2">
        <button
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors ${
            mobileTab === 'editor'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Edit Bold Fields & Spacing
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors ${
            mobileTab === 'preview'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Certificate Preview
        </button>
      </div>

      {/* Main Workspace: Split View */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Editor Controls */}
        <section
          className={`lg:col-span-5 xl:col-span-4 h-[calc(100vh-140px)] sticky top-20 flex flex-col ${
            mobileTab === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <CertificateEditor
            data={data}
            onChange={setData}
            spacing={spacing}
            onUpdateSpacing={setSpacing}
            focusedField={focusedField}
            onFocusField={setFocusedField}
            highlightBoldFields={highlightBoldFields}
            onToggleHighlight={() => setHighlightBoldFields(!highlightBoldFields)}
          />
        </section>

        {/* Right Column: Live Certificate Canvas Preview */}
        <section
          className={`lg:col-span-7 xl:col-span-8 min-h-[calc(100vh-140px)] flex flex-col ${
            mobileTab === 'editor' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <CertificatePreview
            data={data}
            spacing={spacing}
            focusedField={focusedField}
            highlightBoldFields={highlightBoldFields}
            onSelectField={(field) => {
              setFocusedField(field);
              setMobileTab('editor');
            }}
            onUpdateSpacing={setSpacing}
          />
        </section>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl border border-slate-700 text-xs flex items-center gap-2 animate-bounce-subtle">
          <FileCheck2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Modal: View Source Sample PDF */}
      {showOriginalModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-300">
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold">Source Sample Certificate Reference (PDF)</h3>
              </div>
              <button
                onClick={() => setShowOriginalModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 bg-slate-100 flex items-center justify-center">
              <div className="w-full aspect-[3513/2479] max-w-3xl bg-white shadow border border-slate-300">
                <img
                  src="/sample_certificate_render.png"
                  alt="Original Attached Certificate"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span>Attached reference: Sample_Certificate_ff197a30.pdf</span>
              <a
                href="/assets/aistudio/Sample_Certificate_ff197a30.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1"
              >
                Open Raw PDF <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
