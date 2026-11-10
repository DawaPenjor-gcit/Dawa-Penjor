import React from 'react';
import { Download, Printer, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onDownloadPdf: () => void;
  onPrint: () => void;
  isExporting: boolean;
  exportStatus?: string;
  onViewOriginalPdf: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onDownloadPdf,
  onPrint,
  isExporting,
  exportStatus,
  onViewOriginalPdf,
}) => {
  return (
    <header className="relative z-20 flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      {/* Zone 1: Brand Wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a href="/" className="flex items-center gap-2.5 text-white group">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-sm">
            <ShieldCheck className="w-5 h-5 text-slate-950" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight whitespace-nowrap leading-none">
              CertiCraft
            </span>
            <span className="text-[10px] text-amber-400 font-medium tracking-wide">
              Bhutan Election Credential System
            </span>
          </div>
        </a>
      </div>

      {/* Zone 2: Concise Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
        <span className="inline-flex items-center gap-1.5 text-teal-400 whitespace-nowrap shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
          Section 465 Verified
        </span>
        <button
          onClick={onViewOriginalPdf}
          className="hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer text-slate-300"
        >
          <FileText className="w-3.5 h-3.5 text-slate-400" />
          View Source Sample PDF
        </button>
        <button
          onClick={onPrint}
          className="hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer text-slate-300"
        >
          <Printer className="w-3.5 h-3.5 text-slate-400" />
          Print Preview
        </button>
      </nav>

      {/* Zone 3: 1 Primary Action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onDownloadPdf}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-md hover:from-amber-300 hover:to-amber-400 transition-all shadow-sm disabled:opacity-50 cursor-pointer whitespace-nowrap shrink-0"
        >
          <Download className="w-4 h-4 text-slate-950" />
          <span>{isExporting ? (exportStatus || 'Generating PDF...') : 'Download Official PDF'}</span>
        </button>
      </div>
    </header>
  );
};
