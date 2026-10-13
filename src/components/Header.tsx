import React from 'react';
import { FileSpreadsheet, ShieldAlert, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onOpenPrompt: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPrompt }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 ring-1 ring-white/10">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-white tracking-tight">
                Tax-Reconciliation Disclosure Extractor
              </h1>
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Ind AS 12
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Deterministic extraction for Indian listed company annual reports (BSE / NSE)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenPrompt}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors cursor-pointer"
            title="View exact extraction system instructions & schema"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>Extraction Directives</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Strict Zero-Inference Mode</span>
          </div>
        </div>
      </div>
    </header>
  );
};
