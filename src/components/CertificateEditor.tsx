import React, { useState, useRef } from 'react';
import {
  CertificateData,
  SpacingConfig,
  ORIGINAL_SAMPLE_CERTIFICATE,
  DEFAULT_SPACING_CONFIG,
  DZONGKHAG_PRESETS,
  DESIGNATION_PRESETS,
  SAMPLE_CANDIDATE_PRESETS,
} from '../types';
import {
  toDzongkhaDigits,
  toWesternDigits,
  hasDzongkhaDigits,
  DZONGKHA_QUICK_SYMBOLS,
} from '../utils/dzongkhaHelpers';
import {
  RotateCcw,
  Sparkles,
  Lock,
  Edit3,
  Calendar,
  User,
  MapPin,
  Award,
  Hash,
  Sliders,
  Type,
  AlignLeft,
  Upload,
  Camera,
  Image as ImageIcon,
  QrCode,
} from 'lucide-react';
import { DynamicQrCode } from './DynamicQrCode';

interface CertificateEditorProps {
  data: CertificateData;
  onChange: (data: CertificateData) => void;
  spacing: SpacingConfig;
  onUpdateSpacing: (spacing: SpacingConfig) => void;
  focusedField: keyof CertificateData | null;
  onFocusField: (field: keyof CertificateData | null) => void;
  highlightBoldFields: boolean;
  onToggleHighlight: () => void;
}

export const CertificateEditor: React.FC<CertificateEditorProps> = ({
  data,
  onChange,
  spacing,
  onUpdateSpacing,
  focusedField,
  onFocusField,
  highlightBoldFields,
  onToggleHighlight,
}) => {
  const [activeTab, setActiveTab] = useState<'fields' | 'presets' | 'spacing' | 'guide'>('fields');
  const [showSymbolBar, setShowSymbolBar] = useState<boolean>(true);

  const updateField = (field: keyof CertificateData, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleReset = () => {
    onChange(ORIGINAL_SAMPLE_CERTIFICATE);
    onUpdateSpacing(DEFAULT_SPACING_CONFIG);
  };

  const toggleDigits = (field: 'cid' | 'electionDate' | 'issueDate') => {
    const current = data[field];
    if (hasDzongkhaDigits(current)) {
      updateField(field, toWesternDigits(current));
    } else {
      updateField(field, toDzongkhaDigits(current));
    }
  };

  const insertSymbol = (char: string) => {
    if (!focusedField) return;
    const current = (data[focusedField] as string) || '';
    updateField(focusedField, current + char);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange({
            ...data,
            candidatePhoto: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    onChange({
      ...data,
      candidatePhoto: '/photo_final.png',
      photoScalePercent: 100,
    });
  };

  const handleScalePhoto = (newScale: number) => {
    onChange({
      ...data,
      photoScalePercent: newScale,
    });
  };

  const qrFileInputRef = useRef<HTMLInputElement>(null);

  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange({
            ...data,
            qrCodeData: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetQrCode = () => {
    onChange({
      ...data,
      qrCodeData: '/qr_crop.png',
      qrCodeScalePercent: 100,
    });
  };

  const handleScaleQr = (newScale: number) => {
    onChange({
      ...data,
      qrCodeScalePercent: newScale,
    });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Editor Header */}
      <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/70">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              <Edit3 className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Certificate Editor
              </h2>
              <p className="text-xs text-slate-500">
                <strong className="text-slate-800">7 bold fields</strong>, <strong className="text-slate-800">photo &amp; QR code</strong> are changeable
              </p>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
            title="Reset to original attached PDF certificate sample"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset All</span>
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 mt-4 p-1 bg-slate-200/60 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveTab('fields')}
            className={`flex-1 py-1.5 px-2 rounded-md transition-all text-center cursor-pointer ${
              activeTab === 'fields'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bold Fields (7)
          </button>
          <button
            onClick={() => setActiveTab('spacing')}
            className={`flex-1 py-1.5 px-2 rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'spacing'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3 h-3 text-amber-600" />
            Spacing
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-1.5 px-2 rounded-md transition-all text-center cursor-pointer ${
              activeTab === 'presets'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Presets
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-1.5 px-2 rounded-md transition-all text-center cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Locked
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {activeTab === 'fields' && (
          <>
            {/* Real-time Field Highlight Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50/70 border border-amber-200/70 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-amber-900 font-medium">
                  Highlight editable bold fields in certificate preview
                </span>
              </div>
              <button
                onClick={onToggleHighlight}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  highlightBoldFields ? 'bg-amber-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    highlightBoldFields ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Quick Dzongkha Symbols Insert Bar */}
            {showSymbolBar && (
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <span>Quick Dzongkha Glyphs:</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    Click to insert at active field
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {DZONGKHA_QUICK_SYMBOLS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => insertSymbol(item.char)}
                      title={item.name}
                      className="px-2 py-1 text-xs font-dzongkha font-bold bg-white border border-slate-200 rounded hover:bg-amber-50 hover:border-amber-300 text-slate-800 transition-colors shadow-2xs"
                    >
                      {item.char}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* The 7 Editable Bold Fields */}
            <div className="space-y-4">
              {/* Field 1: Dzongkhag */}
              <div
                className={`p-3 rounded-lg border transition-all ${
                  focusedField === 'dzongkhag'
                    ? 'border-amber-500 ring-2 ring-amber-100 bg-amber-50/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    1. Dzongkhag (རྫོང་ཁག་)
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">Bold Field #1</span>
                </div>
                <input
                  type="text"
                  value={data.dzongkhag}
                  onChange={(e) => updateField('dzongkhag', e.target.value)}
                  onFocus={() => onFocusField('dzongkhag')}
                  onBlur={() => onFocusField(null)}
                  className="w-full h-10 px-3 font-dzongkha font-bold text-slate-900 border border-slate-300 rounded-md focus:border-slate-900 focus:outline-hidden text-sm"
                  placeholder="e.g. ཆུ་ཁ"
                />
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Surrounding space dynamically adjusts</span>
                  <div className="flex gap-1">
                    {['ཆུ་ཁ', 'ཐིམ་ཕུག་', 'སྤ་རོ་', 'སྤུངས་ཁ་'].map((dz) => (
                      <button
                        key={dz}
                        type="button"
                        onClick={() => updateField('dzongkhag', dz)}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                      >
                        {dz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Field 2: Constituency / Demkhong */}
              <div
                className={`p-3 rounded-lg border transition-all ${
                  focusedField === 'constituency'
                    ? 'border-amber-500 ring-2 ring-amber-100 bg-amber-50/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    2. Constituency / Thromde (ཁྲོམ་སྡེ་འདེམས་ཁོངས་)
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">Bold Field #2</span>
                </div>
                <input
                  type="text"
                  value={data.constituency}
                  onChange={(e) => updateField('constituency', e.target.value)}
                  onFocus={() => onFocusField('constituency')}
                  onBlur={() => onFocusField(null)}
                  className="w-full h-10 px-3 font-dzongkha font-bold text-slate-900 border border-slate-300 rounded-md focus:border-slate-900 focus:outline-hidden text-sm"
                  placeholder="e.g. ཕུན་ཚོགས་གླིང་"
                />
                <div className="mt-1.5 text-[11px] text-slate-500">
                  Followed by fixed text: ཁྲོམ་སྡེ་འདེམས་ཁོངས་ལས་ མི་ཁུངས་ངོ་སྤྲོད་ལག་ཁྱེར་ཨང་
                </div>
              </div>

              {/* Field 3: CID Number */}
              <div
                className={`p-3 rounded-lg border transition-all ${
                  focusedField === 'cid'
                    ? 'border-amber-500 ring-2 ring-amber-100 bg-amber-50/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-slate-500" />
                    3. CID Number (མི་ཁུངས་ངོ་སྤྲོད་ལག་ཁྱེར་ཨང་)
                  </label>
                  <button
                    type="button"
                    onClick={() => toggleDigits('cid')}
                    className="text-[11px] font-medium text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
                    title="Toggle Western (123) and Dzongkha (༡༢༣) numerals"
                  >
                    <span>{hasDzongkhaDigits(data.cid) ? '→ Convert to 123' : '→ Convert to ༡༢༣'}</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={data.cid}
                  onChange={(e) => updateField('cid', e.target.value)}
                  onFocus={() => onFocusField('cid')}
                  onBlur={() => onFocusField(null)}
                  className="w-full h-10 px-3 font-dzongkha font-bold text-slate-900 border border-slate-300 rounded-md focus:border-slate-900 focus:outline-hidden text-sm"
                  placeholder="e.g. ༡༠༢༡༢༠༠༠༢༥༧"
                />
                <div className="mt-1.5 text-[11px] text-slate-500">
                  Followed by fixed text: ཅན་མ་འཆང་མི་ ངོམ་
                </div>
              </div>

              {/* Field 4: Candidate Name */}
              <div
                className={`p-3 rounded-lg border transition-all ${
                  focusedField === 'candidateName'
                    ? 'border-amber-500 ring-2 ring-amber-100 bg-amber-50/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    4. Elected Candidate Name (འདེམས་ངོའི་མིང་)
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">Bold Field #4</span>
                </div>
                <input
                  type="text"
                  value={data.candidateName}
                  onChange={(e) => updateField('candidateName', e.target.value)}
                  onFocus={() => onFocusField('candidateName')}
                  onBlur={() => onFocusField(null)}
                  className="w-full h-10 px-3 font-dzongkha font-bold text-slate-900 border border-slate-300 rounded-md focus:border-slate-900 focus:outline-hidden text-sm"
                  placeholder="e.g. དི་པིན་ ག་ལེ་"
                />
                {/* Dynamic Passport Photo & Size Controls */}
                <div
                  className={`mt-3 p-3 bg-slate-50 border rounded-lg transition-all ${
                    focusedField === ('candidatePhoto' as any)
                      ? 'border-amber-500 ring-2 ring-amber-100 bg-amber-50/20'
                      : 'border-slate-200'
                  }`}
                  onMouseEnter={() => onFocusField('candidatePhoto' as any)}
                  onMouseLeave={() => {
                    if (focusedField === ('candidatePhoto' as any)) onFocusField(null);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-amber-600" />
                      <span className="text-xs font-bold text-slate-800">
                        Passport-Size Photo (འདྲ་པར།)
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      Changeable
                    </span>
                  </div>

                  {/* Photo Display and Upload Actions */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-14 rounded border-2 border-slate-300 overflow-hidden bg-white shrink-0 shadow-2xs group">
                      <img
                        src={data.candidatePhoto || '/photo_final.png'}
                        alt="Candidate Passport Photo"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer"
                        title="Upload New Photo"
                      >
                        <Upload className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded hover:bg-slate-100 hover:text-slate-950 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Upload className="w-3 h-3 text-slate-600" />
                          <span>Change Photo</span>
                        </button>

                        {(data.candidatePhoto && data.candidatePhoto !== '/photo_final.png') && (
                          <button
                            type="button"
                            onClick={handleResetPhoto}
                            className="px-2 py-1 text-[11px] font-medium text-slate-600 hover:text-red-700 transition-colors cursor-pointer"
                            title="Reset to official sample candidate photo"
                          >
                            Reset Original
                          </button>
                        )}
                      </div>

                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handlePhotoUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <span className="text-[10px] text-slate-500">
                        Supports PNG, JPG, WebP · High-resolution
                      </span>
                    </div>
                  </div>

                  {/* Passport Size (Scale) Slider & Quick Presets */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-700 flex items-center gap-1 text-[11px]">
                        <Sliders className="w-3 h-3 text-slate-500" />
                        Passport Photo Size:
                      </span>
                      <span className="font-mono text-[11px] font-bold text-amber-700">
                        {data.photoScalePercent ?? 100}%
                        <span className="font-normal text-slate-500 ml-1">
                          ({((35 * (data.photoScalePercent ?? 100)) / 100).toFixed(0)} × {((45 * (data.photoScalePercent ?? 100)) / 100).toFixed(0)} mm)
                        </span>
                      </span>
                    </div>

                    <input
                      type="range"
                      min="70"
                      max="140"
                      step="2"
                      value={data.photoScalePercent ?? 100}
                      onChange={(e) => handleScalePhoto(parseInt(e.target.value, 10))}
                      className="w-full accent-amber-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                    />

                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-500">Presets:</span>
                      {[
                        { label: 'Compact', scale: 85 },
                        { label: 'Standard 35×45mm', scale: 100 },
                        { label: 'Large', scale: 115 },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => handleScalePhoto(preset.scale)}
                          className={`text-[10px] px-2 py-0.5 rounded transition-colors cursor-pointer ${
                            (data.photoScalePercent ?? 100) === preset.scale
                              ? 'bg-amber-600 text-white font-bold'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dynamic Verification QR Code & Size Controls */}
                <div
                  className={`mt-3 p-3 bg-slate-50 border rounded-lg transition-all ${
                    focusedField === ('qrCode' as any)
                      ? 'border-amber-500 ring-2 ring-amber-100 bg-amber-50/20'
                      : 'border-slate-200'
                  }`}
                  onMouseEnter={() => onFocusField('qrCode' as any)}
                  onMouseLeave={() => {
                    if (focusedField === ('qrCode' as any)) onFocusField(null);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <QrCode className="w-3.5 h-3.5 text-amber-600" />
                      <span className="text-xs font-bold text-slate-800">
                        Verification QR Code (ཨང་རྟགས།)
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      Changeable
                    </span>
                  </div>

                  {/* QR Content Input & Actions */}
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1">
                        <span>QR Code Content / Verification Link:</span>
                        <span className="text-[10px] text-slate-400">Live Generator</span>
                      </div>
                      <input
                        type="text"
                        value={data.qrCodeData || ''}
                        onChange={(e) => updateField('qrCodeData' as any, e.target.value)}
                        onFocus={() => onFocusField('qrCode' as any)}
                        onBlur={() => onFocusField(null)}
                        className="w-full h-8 px-2.5 text-xs text-slate-900 border border-slate-300 rounded focus:border-slate-900 focus:outline-hidden font-mono"
                        placeholder="e.g. https://ecb.bt/verify/10212000257 or custom text"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <div className="relative w-12 h-12 rounded border border-slate-300 overflow-hidden bg-white shrink-0 p-1 flex items-center justify-center shadow-2xs group">
                        <DynamicQrCode
                          qrData={data.qrCodeData}
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => qrFileInputRef.current?.click()}
                          className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer"
                          title="Upload Custom QR Image"
                        >
                          <Upload className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => qrFileInputRef.current?.click()}
                            className="px-2.5 py-1 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <Upload className="w-3 h-3 text-slate-600" />
                            <span>Upload QR Image</span>
                          </button>

                          {(data.qrCodeData && data.qrCodeData !== '/qr_crop.png') && (
                            <button
                              type="button"
                              onClick={handleResetQrCode}
                              className="px-2 py-1 text-[11px] font-medium text-slate-600 hover:text-red-700 transition-colors cursor-pointer"
                              title="Reset to official sample QR code"
                            >
                              Reset Original
                            </button>
                          )}
                        </div>

                        <input
                          type="file"
                          ref={qrFileInputRef}
                          onChange={handleQrUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <span className="text-[10px] text-slate-500">
                          Enter URL/text or upload image · Auto-generates
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* QR Size (Scale) Slider & Quick Presets */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-700 flex items-center gap-1 text-[11px]">
                        <Sliders className="w-3 h-3 text-slate-500" />
                        QR Code Size:
                      </span>
                      <span className="font-mono text-[11px] font-bold text-amber-700">
                        {data.qrCodeScalePercent ?? 100}%
                      </span>
                    </div>

                    <input
                      type="range"
                      min="70"
                      max="140"
                      step="2"
                      value={data.qrCodeScalePercent ?? 100}
                      onChange={(e) => handleScaleQr(parseInt(e.target.value, 10))}
                      className="w-full accent-amber-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                    />

                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-500">Presets:</span>
                      {[
                        { label: 'Compact', scale: 85 },
                        { label: 'Standard', scale: 100 },
                        { label: 'Large', scale: 115 },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => handleScaleQr(preset.scale)}
                          className={`text-[10px] px-2 py-0.5 rounded transition-colors cursor-pointer ${
                            (data.qrCodeScalePercent ?? 100) === preset.scale
                              ? 'bg-amber-600 text-white font-bold'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-1.5 text-[11px] text-slate-500">
                  Preceded by &quot;ངོམ་&quot; and followed by &quot;འདི་ སྤྱི་ཚེས་&quot;
                </div>
              </div>

              {/* Field 5: Election Date */}
              <div
                className={`p-3 rounded-lg border transition-all ${
                  focusedField === 'electionDate'
                    ? 'border-amber-500 ring-2 ring-amber-100 bg-amber-50/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    5. Election Date (བཙག་འཐུའི་སྤྱི་ཚེས་)
                  </label>
                  <button
                    type="button"
                    onClick={() => toggleDigits('electionDate')}
                    className="text-[11px] font-medium text-teal-700 hover:text-teal-900 cursor-pointer"
                  >
                    {hasDzongkhaDigits(data.electionDate) ? '→ Convert to 123' : '→ Convert to ༡༢༣'}
                  </button>
                </div>
                <input
                  type="text"
                  value={data.electionDate}
                  onChange={(e) => updateField('electionDate', e.target.value)}
                  onFocus={() => onFocusField('electionDate')}
                  onBlur={() => onFocusField(null)}
                  className="w-full h-10 px-3 font-dzongkha font-bold text-slate-900 border border-slate-300 rounded-md focus:border-slate-900 focus:outline-hidden text-sm"
                  placeholder="e.g. ༡༥/༧/༢༠༢༦"
                />
                <div className="mt-1.5 text-[11px] text-slate-500">
                  Followed by fixed text: ལུ་ ས་གནས་གཞུང་བཞི་པའི་ རྫོང་ཁག་ཁྲོམ་སྡེ་...
                </div>
              </div>

              {/* Field 6: Post / Designation */}
              <div
                className={`p-3 rounded-lg border transition-all ${
                  focusedField === 'designation'
                    ? 'border-amber-500 ring-2 ring-amber-100 bg-amber-50/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-slate-500" />
                    6. Elected Post / Designation (གོ་གནས་)
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">Bold Field #6</span>
                </div>
                <input
                  type="text"
                  value={data.designation}
                  onChange={(e) => updateField('designation', e.target.value)}
                  onFocus={() => onFocusField('designation')}
                  onBlur={() => onFocusField(null)}
                  className="w-full h-10 px-3 font-dzongkha font-bold text-slate-900 border border-slate-300 rounded-md focus:border-slate-900 focus:outline-hidden text-sm"
                  placeholder="e.g. ཁྲོམ་དཔོན་གྱི་"
                />
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {DESIGNATION_PRESETS.map((p) => (
                    <button
                      key={p.dzongkha}
                      type="button"
                      onClick={() => updateField('designation', p.dzongkha)}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                    >
                      {p.dzongkha} ({p.english.split(' ')[0]})
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 7: Issue Date */}
              <div
                className={`p-3 rounded-lg border transition-all ${
                  focusedField === 'issueDate'
                    ? 'border-amber-500 ring-2 ring-amber-100 bg-amber-50/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    7. Certificate Issue Date (ལག་ཁྱེར་སྤྱི་ཚེས་)
                  </label>
                  <button
                    type="button"
                    onClick={() => toggleDigits('issueDate')}
                    className="text-[11px] font-medium text-teal-700 hover:text-teal-900 cursor-pointer"
                  >
                    {hasDzongkhaDigits(data.issueDate) ? '→ Convert to 123' : '→ Convert to ༡༢༣'}
                  </button>
                </div>
                <input
                  type="text"
                  value={data.issueDate}
                  onChange={(e) => updateField('issueDate', e.target.value)}
                  onFocus={() => onFocusField('issueDate')}
                  onBlur={() => onFocusField(null)}
                  className="w-full h-10 px-3 font-dzongkha font-bold text-slate-900 border border-slate-300 rounded-md focus:border-slate-900 focus:outline-hidden text-sm"
                  placeholder="e.g. ༢༠/༠༧/༢༠༢༦"
                />
                <div className="mt-1.5 text-[11px] text-slate-500">
                  Preceded by fixed prefix: སྤྱི་ཚེས་ (Bottom-Left)
                </div>
              </div>
            </div>
          </>
        )}

        {/* Spacing & Layout Adjustment Tab */}
        {activeTab === 'spacing' && (
          <div className="space-y-5">
            <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200/80 text-xs text-amber-950">
              <div className="font-bold mb-1 flex items-center gap-1.5 text-amber-900">
                <Sliders className="w-4 h-4 text-amber-600" />
                Adjustable Space Controls
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800">
                Fine-tune font scaling, line vertical baselines, and word spacing.
                The certificate automatically reflows smoothly with exact 1:1 PDF geometry.
              </p>
            </div>

            {/* Font Size Scaling Slider */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-slate-500" />
                  Paragraph Font Size (Calibrated: 14px)
                </span>
                <span className="font-mono text-amber-700 font-bold">
                  {((14 * spacing.fontSizePercent) / 100).toFixed(0)}px ({spacing.fontSizePercent}%)
                </span>
              </div>
              <input
                type="range"
                min="70"
                max="130"
                step="2"
                value={spacing.fontSizePercent}
                onChange={(e) =>
                  onUpdateSpacing({ ...spacing, fontSizePercent: parseInt(e.target.value, 10) })
                }
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex flex-wrap gap-1 pt-1">
                {[
                  { label: '12px (85%)', val: 85 },
                  { label: '13px (93%)', val: 93 },
                  { label: '14px (Default)', val: 100 },
                  { label: '15px (107%)', val: 107 },
                  { label: '16px (114%)', val: 114 },
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => onUpdateSpacing({ ...spacing, fontSizePercent: preset.val })}
                    className={`text-[10px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                      spacing.fontSizePercent === preset.val
                        ? 'bg-amber-100 border-amber-400 font-bold text-amber-900'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Spacing Delta Slider */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <AlignLeft className="w-3.5 h-3.5 text-slate-500" />
                  Line Baseline Spacing (PDF default: 5.04%)
                </span>
                <span className="font-mono text-amber-700 font-bold">{spacing.lineSpacingDelta.toFixed(2)}%</span>
              </div>
              <input
                type="range"
                min="4.0"
                max="6.0"
                step="0.05"
                value={spacing.lineSpacingDelta}
                onChange={(e) =>
                  onUpdateSpacing({ ...spacing, lineSpacingDelta: parseFloat(e.target.value) })
                }
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Compact (4.0%)</span>
                <span>Exact PDF (5.04%)</span>
                <span>Spacious (6.0%)</span>
              </div>
            </div>

            {/* Vertical Position Offset */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-slate-500" />
                  Vertical Position Offset
                </span>
                <span className="font-mono text-amber-700 font-bold">
                  {spacing.verticalOffset > 0 ? `+${spacing.verticalOffset.toFixed(1)}` : spacing.verticalOffset.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min="-3.0"
                max="3.0"
                step="0.1"
                value={spacing.verticalOffset}
                onChange={(e) =>
                  onUpdateSpacing({ ...spacing, verticalOffset: parseFloat(e.target.value) })
                }
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Higher (-3.0%)</span>
                <span>Original (0.0%)</span>
                <span>Lower (+3.0%)</span>
              </div>
            </div>

            {/* Word & Letter Spacing Slider */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-slate-500" />
                  Word & Tsheg Spacing
                </span>
                <span className="font-mono text-amber-700 font-bold">{spacing.wordSpacing} px</span>
              </div>
              <input
                type="range"
                min="-2"
                max="8"
                step="1"
                value={spacing.wordSpacing}
                onChange={(e) =>
                  onUpdateSpacing({ ...spacing, wordSpacing: parseInt(e.target.value, 10) })
                }
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Tight (-2px)</span>
                <span>Normal (0px)</span>
                <span>Loose (+8px)</span>
              </div>
            </div>

            {/* Safe Rectangle Zone Notice */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-blue-800">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Safe Rectangle Enclosure (17.44% - 81.64%)
              </div>
              <p className="text-[11px] text-blue-700 leading-relaxed">
                All 5 paragraph lines are bound inside the central rectangle between the QR code and Candidate Photo. Text automatically fits without overflowing or crossing the box boundaries.
              </p>
            </div>

            <button
              onClick={() => onUpdateSpacing(DEFAULT_SPACING_CONFIG)}
              className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Spacing to Default
            </button>
          </div>
        )}

        {/* Presets Tab */}
        {activeTab === 'presets' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-600 mb-2">
              Select a sample profile to quickly load realistic election certificate data:
            </div>
            {SAMPLE_CANDIDATE_PRESETS.map((preset, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-white border border-slate-200 rounded-lg hover:border-slate-400 transition-all cursor-pointer shadow-2xs"
                onClick={() => onChange(preset.data)}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-bold text-slate-900">{preset.name}</h4>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                    Load
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{preset.desc}</p>
                <div className="mt-2 text-[11px] font-dzongkha text-slate-700 border-t border-slate-100 pt-1.5">
                  {preset.data.candidateName} · {preset.data.constituency} · {preset.data.dzongkhag}
                </div>
              </div>
            ))}

            <div className="pt-3 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Bhutan Dzongkhag Directory</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {DZONGKHAG_PRESETS.map((d) => (
                  <button
                    key={d.english}
                    type="button"
                    onClick={() => {
                      updateField('dzongkhag', d.dzongkha);
                      if (d.thromdeOrDemkhongs[0]) {
                        updateField('constituency', d.thromdeOrDemkhongs[0]);
                      }
                    }}
                    className="p-2 border border-slate-200 rounded-md text-left hover:bg-slate-50 transition-colors"
                  >
                    <div className="font-bold text-slate-900">{d.english}</div>
                    <div className="font-dzongkha text-slate-600 text-[11px]">{d.dzongkha}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Locked Fixed Sections Tab */}
        {activeTab === 'guide' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
              <Lock className="w-4 h-4 text-slate-500 shrink-0" />
              <span>
                All non-bold text is locked in its original wording and layout to preserve official validity.
              </span>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg space-y-2 bg-white">
              <h4 className="text-xs font-bold text-slate-800">Fixed Header Elements</h4>
              <ul className="text-xs space-y-1 text-slate-600 list-disc list-inside">
                <li>འབྲུག་གི་བཙག་འཐུ་ལྷན་ཚོགས། (Election Commission of Bhutan)</li>
                <li>བཙག་འཐུ་གྲུབ་མི་འདེམས་ངོ་ལུ་ ངོ་སྦྱོར་ལག་ཁྱེར། (Certificate of Election for Elected Candidate)</li>
                <li>Royal Emblem of Bhutan (Top-Left)</li>
                <li>Election Commission of Bhutan Seal (Top-Right)</li>
                <li>QR Code (Middle-Left) & Candidate Photo (Middle-Right)</li>
              </ul>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg space-y-2 bg-white">
              <h4 className="text-xs font-bold text-slate-800">Fixed Legal Provision</h4>
              <p className="text-xs font-dzongkha text-slate-800 bg-slate-50 p-2 rounded">
                ལག་ཁྱེར་འདི་ འབྲུག་གི་བཙག་འཐུའི་བཅའ་ཁྲིམས་ ༢༠༠༨ ཅན་མའི་དོན་ཚན་ ༤༦༥ དང་འཁྲིལ་གནངམ་ཨིན།
              </p>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg space-y-2 bg-white">
              <h4 className="text-xs font-bold text-slate-800">Fixed Signatory</h4>
              <p className="text-xs font-dzongkha text-slate-800">
                འབྲུག་གི་བཙག་འཐུ་ལྷན་འཛིན་སྤྱི་ཁྱབ།
              </p>
              <p className="text-[11px] text-slate-500">
                Chief Election Commissioner of Bhutan (Bottom-Right)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
