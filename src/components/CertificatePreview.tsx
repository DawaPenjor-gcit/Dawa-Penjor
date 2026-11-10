import React, { useState } from 'react';
import { CertificateData, SpacingConfig, ORIGINAL_SAMPLE_CERTIFICATE } from '../types';
import { ZoomIn, ZoomOut, RotateCcw, Eye, CheckCircle2, Sliders, Type, Square, User, X, QrCode } from 'lucide-react';
import { DynamicQrCode } from './DynamicQrCode';

interface CertificatePreviewProps {
  data: CertificateData;
  spacing: SpacingConfig;
  focusedField: keyof CertificateData | null;
  highlightBoldFields: boolean;
  onSelectField?: (field: keyof CertificateData) => void;
  onUpdateSpacing?: (spacing: SpacingConfig) => void;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  data,
  spacing,
  focusedField,
  highlightBoldFields,
  onSelectField,
  onUpdateSpacing,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(80);
  const [showOriginalComparison, setShowOriginalComparison] = useState<boolean>(false);
  const [showSpacingToolbar, setShowSpacingToolbar] = useState<boolean>(false);
  const [showSafeZone, setShowSafeZone] = useState<boolean>(true);
  const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(175, Math.max(50, prev + delta)));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  const handleFitZoom = () => {
    setZoomLevel(75);
  };

  const isChanged = (key: keyof CertificateData) => {
    return data[key] !== ORIGINAL_SAMPLE_CERTIFICATE[key];
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/5 rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Top Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-white border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg p-0.5 bg-slate-100 border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setShowOriginalComparison(false)}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                !showOriginalComparison
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              Certificate Preview
            </button>
            <button
              onClick={() => setShowOriginalComparison(!showOriginalComparison)}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                showOriginalComparison
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Compare with Attached PDF
            </button>
          </div>

          {/* Safe Rectangle Zone Box Toggle */}
          <button
            onClick={() => setShowSafeZone(!showSafeZone)}
            className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              showSafeZone
                ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-xs'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
            }`}
            title="Toggle Safe Rectangle Zone (as shown in annotated screenshot)"
          >
            <Square className="w-3.5 h-3.5 text-blue-600" />
            <span>Designated Area Box</span>
          </button>

          {/* Passport Photo Quick View */}
          <button
            onClick={() => setShowPhotoModal(true)}
            className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
            title="View Official Candidate Passport Photo in High Resolution"
          >
            <img
              src={data.candidatePhoto || '/photo_final.png'}
              alt="Candidate"
              className="w-4 h-4 rounded-full object-cover border border-slate-300"
            />
            <span>Passport Photo</span>
          </button>

          {/* QR Code Quick View */}
          <button
            onClick={() => setShowQrModal(true)}
            className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
            title="View Official Verification QR Code"
          >
            <QrCode className="w-3.5 h-3.5 text-slate-600" />
            <span>QR Code</span>
          </button>

          {/* Quick Font Size & Spacing Controls */}
          {onUpdateSpacing && (
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <span className="text-[10px] font-semibold text-slate-500 uppercase px-1.5 flex items-center gap-1">
                <Type className="w-3 h-3 text-slate-400" />
                Font Size:
              </span>
              <button
                onClick={() =>
                  onUpdateSpacing({
                    ...spacing,
                    fontSizePercent: Math.max(70, spacing.fontSizePercent - 4),
                  })
                }
                className="px-2 py-0.5 text-slate-700 hover:text-slate-900 rounded hover:bg-white font-bold transition-colors cursor-pointer"
                title="Decrease font size"
              >
                A-
              </button>
              <span className="font-mono text-[11px] px-1 text-slate-700 font-semibold min-w-[2.5rem] text-center">
                {((14 * spacing.fontSizePercent) / 100).toFixed(0)}px
              </span>
              <button
                onClick={() =>
                  onUpdateSpacing({
                    ...spacing,
                    fontSizePercent: Math.min(130, spacing.fontSizePercent + 4),
                  })
                }
                className="px-2 py-0.5 text-slate-700 hover:text-slate-900 rounded hover:bg-white font-bold transition-colors cursor-pointer"
                title="Increase font size"
              >
                A+
              </button>
              <button
                onClick={() => setShowSpacingToolbar(!showSpacingToolbar)}
                className={`flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded transition-colors cursor-pointer ml-1 ${
                  showSpacingToolbar
                    ? 'bg-amber-100 text-amber-900 font-semibold'
                    : 'text-slate-700 hover:bg-white'
                }`}
                title="Open Fine-Tuning Spacing Sliders"
              >
                <Sliders className="w-3 h-3 text-amber-600" />
                <span>Fine-Tune</span>
              </button>
            </div>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs">
          <button
            onClick={handleFitZoom}
            className={`px-2 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer ${
              zoomLevel === 75
                ? 'bg-white text-slate-900 font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Fit Entire Certificate and Photo on Screen"
          >
            Fit (75%)
          </button>
          <button
            onClick={() => handleZoom(-15)}
            className="p-1.5 text-slate-600 hover:text-slate-900 rounded hover:bg-white transition-colors cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-1.5 font-mono text-slate-700 select-none min-w-[2.75rem] text-center">
            {zoomLevel}%
          </span>
          <button
            onClick={() => handleZoom(15)}
            className="p-1.5 text-slate-600 hover:text-slate-900 rounded hover:bg-white transition-colors cursor-pointer"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1.5 text-slate-600 hover:text-slate-900 rounded hover:bg-white transition-colors cursor-pointer"
            title="Reset to 100% Zoom"
            aria-label="Reset to 100% Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Spacing Sliders Bar */}
      {showSpacingToolbar && onUpdateSpacing && (
        <div className="px-5 py-2.5 bg-amber-50/70 border-b border-amber-200/80 flex flex-wrap items-center gap-6 text-xs text-amber-950">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-amber-900">Line Delta:</span>
            <input
              type="range"
              min="4.0"
              max="6.0"
              step="0.1"
              value={spacing.lineSpacingDelta}
              onChange={(e) =>
                onUpdateSpacing({ ...spacing, lineSpacingDelta: parseFloat(e.target.value) })
              }
              className="w-24 accent-amber-600 cursor-pointer"
            />
            <span className="font-mono text-[11px] min-w-[2.5rem]">{spacing.lineSpacingDelta.toFixed(1)}%</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-amber-900">Vertical Offset:</span>
            <input
              type="range"
              min="-3.0"
              max="3.0"
              step="0.2"
              value={spacing.verticalOffset}
              onChange={(e) =>
                onUpdateSpacing({ ...spacing, verticalOffset: parseFloat(e.target.value) })
              }
              className="w-24 accent-amber-600 cursor-pointer"
            />
            <span className="font-mono text-[11px] min-w-[2.5rem]">{spacing.verticalOffset.toFixed(1)}%</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-amber-900">Word Spacing:</span>
            <input
              type="range"
              min="-2"
              max="8"
              step="1"
              value={spacing.wordSpacing}
              onChange={(e) =>
                onUpdateSpacing({ ...spacing, wordSpacing: parseInt(e.target.value, 10) })
              }
              className="w-20 accent-amber-600 cursor-pointer"
            />
            <span className="font-mono text-[11px] min-w-[2rem]">{spacing.wordSpacing}px</span>
          </div>

          <button
            onClick={() =>
              onUpdateSpacing({
                fontSizePercent: 100,
                lineSpacingDelta: 5.04,
                wordSpacing: 0,
                verticalOffset: 0,
              })
            }
            className="text-[11px] text-amber-800 underline hover:text-amber-950 ml-auto cursor-pointer font-medium"
          >
            Reset Default Layout Spacing
          </button>
        </div>
      )}

      {/* Main Viewport Container */}
      <div className="relative flex-1 overflow-auto p-4 md:p-8 flex items-center justify-center bg-slate-100/80 min-h-[500px]">
        {showOriginalComparison ? (
          /* Side-by-Side Comparison View */
          <div className="flex flex-col xl:flex-row gap-6 w-full max-w-6xl">
            <div className="flex-1 bg-white p-3 rounded-lg border border-slate-300 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                Original Attached Sample PDF
              </div>
              <div className="relative border border-slate-200 rounded overflow-hidden aspect-[3513/2479] bg-white">
                <img
                  src="/sample_certificate_render.png"
                  alt="Original Certificate PDF"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="flex-1 bg-white p-3 rounded-lg border border-slate-300 shadow-sm">
              <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                Evenly Spaced Dynamic Certificate
              </div>
              <div className="relative border border-slate-200 rounded overflow-hidden aspect-[3513/2479] bg-white">
                <ExactCertificateContent
                  data={data}
                  spacing={spacing}
                  focusedField={focusedField}
                  highlightBoldFields={highlightBoldFields}
                  onSelectField={onSelectField}
                  isChanged={isChanged}
                  scaleFactor={0.55}
                  showSafeZone={showSafeZone}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Standard Interactive Canvas View with Zoom */
          <div
            className="transition-transform duration-150 origin-center max-w-full"
            style={{
              transform: `scale(${zoomLevel / 100})`,
              width: '1000px',
            }}
          >
            <div
              id="certificate-print-area"
              className="relative w-full aspect-[3513/2479] bg-white shadow-2xl rounded-sm overflow-hidden select-none border border-slate-300/80 print:shadow-none print:border-none print:w-full print:h-full"
            >
              <ExactCertificateContent
                data={data}
                spacing={spacing}
                focusedField={focusedField}
                highlightBoldFields={highlightBoldFields}
                onSelectField={onSelectField}
                isChanged={isChanged}
                showSafeZone={showSafeZone}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer Status Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-t border-slate-200 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Evenly Spaced Layout: Calibrated 14px paragraph font size · Strictly fitted inside designated area (17.44% - 81.64%, 49.0% - 75.8%)
          </span>
          <span className="text-slate-300">|</span>
          <span>A4 Landscape (297 × 210 mm)</span>
        </div>
        <div className="text-right text-slate-500 text-[11px]">
          Section 465, Election Act of the Kingdom of Bhutan 2008
        </div>
      </div>

      {/* Candidate Passport Photo Inspector Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Official Candidate Passport Photo</h3>
                  <p className="text-[11px] text-slate-500">Embedded on the right side of the certificate</p>
                </div>
              </div>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col items-center text-center">
              <div className="relative border-4 border-slate-900 shadow-lg rounded-sm overflow-hidden bg-white mb-4">
                <img
                  src={data.candidatePhoto || '/photo_final.png'}
                  alt="Candidate Passport Photo"
                  className="w-44 h-56 object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-white text-[10px] py-1 font-mono tracking-wider flex items-center justify-center gap-2">
                  <span>35 × 45 mm Spec</span>
                  <span>·</span>
                  <span className="text-amber-300 font-bold">Size: {data.photoScalePercent ?? 100}%</span>
                </div>
              </div>

              <h4 className="text-base font-bold text-slate-900 font-dzongkha">
                {data.candidateName || 'དི་པིན་ ག་ལེ་'}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Elected Candidate · {data.dzongkhag} {data.constituency}
              </p>

              <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200 text-left text-xs text-blue-900 w-full space-y-1.5">
                <div className="font-semibold flex items-center gap-1.5 text-blue-950">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  Certificate Placement & Status:
                </div>
                <div className="text-[11px] leading-relaxed text-blue-800">
                  • <strong>Position:</strong> Right section of certificate (X: 81.6%, Y: 53.2%)<br />
                  • <strong>Visibility:</strong> Directly visible between paragraph line 1–4 and the blue border<br />
                  • <strong>Preservation:</strong> Locked fixed image asset strictly preserved from the source PDF
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">CID: {data.cid}</span>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official QR Code Inspector Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Official Verification QR Code</h3>
                  <p className="text-[11px] text-slate-500">Embedded on the left side of the certificate</p>
                </div>
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col items-center text-center">
              <div className="relative border-4 border-slate-900 shadow-lg rounded-sm overflow-hidden bg-white p-2 mb-4 w-48 h-48 flex items-center justify-center">
                <DynamicQrCode
                  qrData={data.qrCodeData}
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-white text-[10px] py-1 font-mono tracking-wider flex items-center justify-center gap-2">
                  <span>Official QR Spec</span>
                  <span>·</span>
                  <span className="text-amber-300 font-bold">Size: {data.qrCodeScalePercent ?? 100}%</span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 font-mono break-all px-2">
                {data.qrCodeData || 'https://ecb.bt/verify'}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Election Commission Verification Barcode
              </p>

              <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-left text-xs text-amber-950 w-full space-y-1.5">
                <div className="font-semibold flex items-center gap-1.5 text-amber-950">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  Certificate Placement & Status:
                </div>
                <div className="text-[11px] leading-relaxed text-amber-900">
                  • <strong>Position:</strong> Left section of certificate (X: 11.67%, Y: 28.24%)<br />
                  • <strong>Visibility:</strong> Directly visible to the left of the central watermark and paragraph<br />
                  • <strong>Customization:</strong> Fully editable text/URL or custom image upload
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">Size: {data.qrCodeScalePercent ?? 100}%</span>
              <button
                onClick={() => setShowQrModal(false)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface ExactCertificateContentProps {
  data: CertificateData;
  spacing: SpacingConfig;
  focusedField: keyof CertificateData | null;
  highlightBoldFields: boolean;
  onSelectField?: (field: keyof CertificateData) => void;
  isChanged: (key: keyof CertificateData) => boolean;
  scaleFactor?: number;
  showSafeZone?: boolean;
}

const ExactCertificateContent: React.FC<ExactCertificateContentProps> = ({
  data,
  spacing,
  focusedField,
  highlightBoldFields,
  onSelectField,
  isChanged,
  scaleFactor = 1.0,
  showSafeZone = true,
}) => {
  // Paragraph font size: calibrated to 14px (fits naturally inside designated area without collision)
  const baseFontSizePx = 14;
  const currentScale = scaleFactor ?? 1.0;
  const computedFontSize = baseFontSizePx * (spacing.fontSizePercent / 100) * currentScale;
  const fontSize = `${computedFontSize === 14 ? '14' : computedFontSize.toFixed(1)}px`;
  const startTop = 49.20 + spacing.verticalOffset;
  const delta = spacing.lineSpacingDelta;

  return (
    <div className="relative w-full h-full bg-white overflow-hidden text-slate-950 font-dzongkha">
      {/* 
        Clean Background Template from PDF:
        Outer border, Royal Emblem, Election Commission logo, QR code, 
        top headers, and central circular transparent watermark.
        Old bold text is removed and photo area is clean white for dynamic customization.
      */}
      <img
        src="/certificate_clean_base.png"
        alt="Bhutan Election Certificate Template"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
      />

      {/* 
        DYNAMIC OFFICIAL QR CODE
        Original PDF geometry: x=410, y=700, width=380, height=380 on 3513x2479 canvas
        Base percentages: left=11.67%, top=28.24%, width=10.82%, height=15.33%
        Supports real-time text/URL generation, image replacement, and QR size scaling (70% - 140%).
      */}
      {(() => {
        const baseWidth = 10.82;
        const baseHeight = 15.33;
        const scale = (data.qrCodeScalePercent ?? 100) / 100;
        const width = baseWidth * scale;
        const height = baseHeight * scale;
        const centerLeft = 11.67 + baseWidth / 2;
        const centerTop = 28.24 + baseHeight / 2;
        const left = centerLeft - width / 2;
        const top = centerTop - height / 2;
        const isQrFocused = focusedField === ('qrCode' as any);

        return (
          <div
            className={`absolute z-20 group transition-all duration-150 cursor-pointer ${
              isQrFocused
                ? 'ring-3 ring-amber-500 ring-offset-2 ring-offset-white shadow-lg'
                : 'hover:ring-2 hover:ring-amber-400'
            }`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${width}%`,
              height: `${height}%`,
            }}
            onClick={() => onSelectField?.('qrCode' as any)}
            title="Click to edit/replace QR code or enter verification URL"
          >
            <div className="relative w-full h-full bg-white border border-slate-300 shadow-xs overflow-hidden flex items-center justify-center p-0.5">
              <DynamicQrCode
                qrData={data.qrCodeData}
                className="w-full h-full object-contain select-none pointer-events-none"
              />
              {highlightBoldFields && (
                <div className="absolute inset-0 bg-amber-400/20 border-2 border-amber-500 pointer-events-none is-exporting-hide" />
              )}
            </div>
            {isQrFocused && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-500 text-slate-950 font-bold text-[9px] px-1.5 py-0.5 rounded shadow-xs is-exporting-hide pointer-events-none flex items-center gap-1">
                <span>QR Size: {data.qrCodeScalePercent ?? 100}%</span>
              </div>
            )}
          </div>
        );
      })()}

      {/* 
        DYNAMIC PASSPORT-SIZE CANDIDATE PHOTO
        Original PDF geometry: x=2698, y=718, width=346, height=446 on 3513x2479 canvas
        Base percentages: left=76.80%, top=28.96%, width=9.85%, height=17.99%
        Supports real-time image replacement and passport size scaling (70% - 140%).
      */}
      {(() => {
        const baseWidth = 9.85;
        const baseHeight = 17.99;
        const scale = (data.photoScalePercent ?? 100) / 100;
        const width = baseWidth * scale;
        const height = baseHeight * scale;
        const centerLeft = 76.80 + baseWidth / 2;
        const centerTop = 28.96 + baseHeight / 2;
        const left = centerLeft - width / 2;
        const top = centerTop - height / 2;
        const photoSrc = data.candidatePhoto || '/photo_final.png';
        const isPhotoFocused = focusedField === ('candidatePhoto' as any);

        return (
          <div
            className={`absolute z-20 group transition-all duration-150 cursor-pointer ${
              isPhotoFocused
                ? 'ring-3 ring-amber-500 ring-offset-2 ring-offset-white shadow-lg'
                : 'hover:ring-2 hover:ring-amber-400'
            }`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${width}%`,
              height: `${height}%`,
            }}
            onClick={() => onSelectField?.('candidatePhoto' as any)}
            title="Click to edit/replace passport photo or adjust size"
          >
            <div className="relative w-full h-full bg-white border border-slate-300 shadow-xs overflow-hidden">
              <img
                src={photoSrc}
                alt={data.candidateName || 'Candidate Passport Photo'}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              {highlightBoldFields && (
                <div className="absolute inset-0 bg-amber-400/20 border-2 border-amber-500 pointer-events-none is-exporting-hide" />
              )}
            </div>
            {isPhotoFocused && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-500 text-slate-950 font-bold text-[9px] px-1.5 py-0.5 rounded shadow-xs is-exporting-hide pointer-events-none flex items-center gap-1">
                <span>Passport Size: {data.photoScalePercent ?? 100}%</span>
              </div>
            )}
          </div>
        );
      })()}

      {/* 
        SAFE RECTANGLE ZONE (Exactly matching the annotated screenshot)
        X: 17.44% to 81.64% (width: 64.20%)
        Y: 49.0% to 75.8% (height: 26.8%)
        Encloses all 5 paragraph lines between QR code (left) and candidate photo (right).
      */}
      {showSafeZone && (
        <div
          className="absolute left-[17.44%] w-[64.2%] pointer-events-none rounded border-2 border-blue-500/90 bg-blue-500/5 shadow-xs transition-opacity is-exporting-hide"
          style={{
            top: '48.5%',
            height: '27.0%',
            zIndex: 10,
          }}
        >
          <div className="absolute -top-6 left-0 text-[10px] font-bold text-blue-700 bg-white/95 px-2 py-0.5 rounded shadow-xs flex items-center gap-1.5 border border-blue-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Designated Area (17.44% - 81.64%) · Paragraph fits inside designated area
          </div>
        </div>
      )}

      {/* 
        EXACT LINE-BY-LINE LAYOUT INSIDE THE DESIGNATED AREA
        Each line starts at 49.20% and flows evenly with 14px font,
        filling the designated area cleanly with natural breathing room.
      */}

      {/* LINE 1 (top: 49.20% in PDF) */}
      <FitParagraphLine
        topPercent={startTop}
        fontSize={fontSize}
        wordSpacing={spacing.wordSpacing}
      >
        <EditableBoldText
          text={data.dzongkhag}
          field="dzongkhag"
          focused={focusedField === 'dzongkhag'}
          highlight={highlightBoldFields}
          changed={isChanged('dzongkhag')}
          onClick={() => onSelectField?.('dzongkhag')}
        />
        <span className="font-normal text-slate-900 mx-0.5">རྫོང་ཁག་</span>
        <EditableBoldText
          text={data.constituency}
          field="constituency"
          focused={focusedField === 'constituency'}
          highlight={highlightBoldFields}
          changed={isChanged('constituency')}
          onClick={() => onSelectField?.('constituency')}
        />
        <span className="font-normal text-slate-900 mx-0.5">ཁྲོམ་སྡེ་འདེམས་ཁོངས་ལས་ མི་ཁུངས་ངོ་སྤྲོད་ལག་ཁྱེར་ཨང་</span>
        <EditableBoldText
          text={data.cid}
          field="cid"
          focused={focusedField === 'cid'}
          highlight={highlightBoldFields}
          changed={isChanged('cid')}
          onClick={() => onSelectField?.('cid')}
        />
      </FitParagraphLine>

      {/* LINE 2 (top: 54.30% in PDF) */}
      <FitParagraphLine
        topPercent={startTop + delta * 1.0}
        fontSize={fontSize}
        wordSpacing={spacing.wordSpacing}
      >
        <span className="font-normal text-slate-900 mr-0.5">ཅན་མ་འཆང་མི་ ངོམ་</span>
        <EditableBoldText
          text={data.candidateName}
          field="candidateName"
          focused={focusedField === 'candidateName'}
          highlight={highlightBoldFields}
          changed={isChanged('candidateName')}
          onClick={() => onSelectField?.('candidateName')}
        />
        <span className="font-normal text-slate-900 mx-0.5">འདི་ སྤྱི་ཚེས་</span>
        <EditableBoldText
          text={data.electionDate}
          field="electionDate"
          focused={focusedField === 'electionDate'}
          highlight={highlightBoldFields}
          changed={isChanged('electionDate')}
          onClick={() => onSelectField?.('electionDate')}
        />
        <span className="font-normal text-slate-900 mx-0.5">ལུ་ ས་གནས་གཞུང་བཞི་པའི་ རྫོང་ཁག་ཁྲོམ་སྡེ་</span>
      </FitParagraphLine>

      {/* LINE 3 (top: 59.40% in PDF) */}
      <FitParagraphLine
        topPercent={startTop + delta * 2.0}
        fontSize={fontSize}
        wordSpacing={spacing.wordSpacing}
      >
        <span className="font-normal text-slate-900 mr-0.5">ཚོགས་སྡེ་ཚོགས་པའི་ བཙག་འཐུ་འགོ་འདྲེན་འཐབ་པའི་སྐབས་</span>
        <EditableBoldText
          text={data.designation}
          field="designation"
          focused={focusedField === 'designation'}
          highlight={highlightBoldFields}
          changed={isChanged('designation')}
          onClick={() => onSelectField?.('designation')}
        />
        <span className="font-normal text-slate-900 mx-0.5">གོ་གནས་ལུ་ ཚུལ་མཐུན་བཙག་འཐུ་</span>
      </FitParagraphLine>

      {/* LINE 4 (top: 65.01% in PDF) */}
      <FitParagraphLine
        topPercent={startTop + delta * 3.10}
        fontSize={fontSize}
        wordSpacing={spacing.wordSpacing}
      >
        <span className="font-normal text-slate-900">གྲུབ་ཡོད་པའི་ངོ་སྦྱོར་ལུ།</span>
      </FitParagraphLine>

      {/* LINE 5: STATUTORY LEGAL CITATION (top: 70.88% in PDF) */}
      <FitParagraphLine
        topPercent={startTop + delta * 4.25}
        fontSize={fontSize}
        wordSpacing={spacing.wordSpacing}
      >
        <span className="font-normal text-slate-900">
          ལག་ཁྱེར་འདི་ འབྲུག་གི་བཙག་འཐུའི་བཅའ་ཁྲིམས་ ༢༠༠༨ ཅན་མའི་དོན་ཚན་ ༤༦༥ དང་འཁྲིལ་གནངམ་ཨིན།
        </span>
      </FitParagraphLine>

      {/* BOTTOM LEFT: CERTIFICATE ISSUE DATE (top: 93.11% = 554pt in PDF) */}
      <div
        className="absolute left-[8.78%] text-slate-950 select-text flex items-baseline leading-none"
        style={{
          top: '93.11%',
          fontSize: fontSize,
        }}
      >
        <span className="font-normal text-slate-900 mr-1.5">སྤྱི་ཚེས་</span>
        <EditableBoldText
          text={data.issueDate}
          field="issueDate"
          focused={focusedField === 'issueDate'}
          highlight={highlightBoldFields}
          changed={isChanged('issueDate')}
          onClick={() => onSelectField?.('issueDate')}
        />
      </div>

      {/* BOTTOM RIGHT: CHIEF ELECTION COMMISSIONER (top: 92.94% = 553pt in PDF) */}
      <div
        className="absolute right-[8.78%] text-slate-950 font-normal select-none leading-none"
        style={{
          top: '92.94%',
          fontSize: fontSize,
        }}
      >
        འབྲུག་གི་བཙག་འཐུ་ལྷན་འཛིན་སྤྱི་ཁྱབ།
      </div>
    </div>
  );
};

interface FitParagraphLineProps {
  topPercent: number;
  fontSize: string;
  wordSpacing: number;
  children: React.ReactNode;
}

const FitParagraphLine: React.FC<FitParagraphLineProps> = ({
  topPercent,
  fontSize,
  wordSpacing,
  children,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [scaleX, setScaleX] = React.useState<number>(1);

  React.useLayoutEffect(() => {
    const checkFit = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const contentWidth = contentRef.current.scrollWidth;
        if (contentWidth > containerWidth && containerWidth > 0) {
          const ratio = Math.max(0.65, containerWidth / contentWidth);
          setScaleX(ratio);
        } else {
          setScaleX(1);
        }
      }
    };

    checkFit();
    if (document.fonts) {
      document.fonts.ready.then(checkFit);
    }
    window.addEventListener('resize', checkFit);
    return () => window.removeEventListener('resize', checkFit);
  }, [children, fontSize, wordSpacing]);

  return (
    <div
      ref={containerRef}
      className="absolute left-[17.44%] w-[64.2%] max-w-[64.2%] flex items-baseline leading-none select-text overflow-visible"
      style={{
        top: `${topPercent}%`,
        fontSize: fontSize,
        wordSpacing: `${wordSpacing}px`,
        letterSpacing: '-0.025em',
      }}
    >
      <div
        ref={contentRef}
        className="flex items-baseline whitespace-nowrap"
        style={{
          transform: scaleX < 1 ? `scaleX(${scaleX})` : undefined,
          transformOrigin: 'left center',
          width: scaleX < 1 ? `${(100 / scaleX).toFixed(3)}%` : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
};

interface EditableBoldTextProps {
  text: string;
  field: keyof CertificateData;
  focused: boolean;
  highlight: boolean;
  changed: boolean;
  onClick: () => void;
}

const EditableBoldText: React.FC<EditableBoldTextProps> = ({
  text,
  field,
  focused,
  highlight,
  changed,
  onClick,
}) => {
  return (
    <span
      onClick={onClick}
      className={`font-dzongkha font-black text-black inline-block cursor-pointer transition-all ${
        focused
          ? 'bg-amber-100 ring-2 ring-amber-500 rounded px-1 -mx-0.5'
          : highlight
          ? 'bg-amber-50/80 ring-1 ring-amber-400 rounded px-1 -mx-0.5'
          : ''
      }`}
      style={{
        fontWeight: 900,
      }}
      title={`Editable Bold Field: ${field} (Click to edit in sidebar)`}
    >
      {text}
    </span>
  );
};
