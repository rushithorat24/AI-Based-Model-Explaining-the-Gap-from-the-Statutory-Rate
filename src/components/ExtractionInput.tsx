import React, { useRef } from 'react';
import { SAMPLE_REPORTS } from '../data/samples';
import { SampleReport } from '../types/taxReconciliation';
import { 
  Sparkles, 
  Upload, 
  Trash2, 
  FileText, 
  Building2, 
  AlertCircle,
  HelpCircle,
  FileCheck2
} from 'lucide-react';

interface ExtractionInputProps {
  content: string;
  onChangeContent: (val: string) => void;
  pageNumber: string;
  onChangePageNumber: (val: string) => void;
  onExtract: () => void;
  isLoading: boolean;
  onSelectSample: (sample: SampleReport) => void;
  selectedSampleId: string | null;
}

export const ExtractionInput: React.FC<ExtractionInputProps> = ({
  content,
  onChangeContent,
  pageNumber,
  onChangePageNumber,
  onExtract,
  isLoading,
  onSelectSample,
  selectedSampleId,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        onChangeContent(text);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3.5">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-semibold text-slate-200">
            Supplied Annual Report Pages / Note Excerpt
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".txt,.csv,.json,.md"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Upload text excerpt from report"
          >
            <Upload className="w-3.5 h-3.5 text-slate-400" />
            <span>Upload File</span>
          </button>

          {content && (
            <button
              onClick={() => onChangeContent('')}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-red-400 hover:text-red-300 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 rounded-lg transition-colors cursor-pointer"
              title="Clear input"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Preset Indian Company Samples */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Load Authentic Disclosures (BSE / NSE Ind AS 12):</span>
          </label>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {SAMPLE_REPORTS.map((sample) => {
            const isSelected = selectedSampleId === sample.id;
            return (
              <button
                key={sample.id}
                onClick={() => onSelectSample(sample)}
                className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-950/50 border-indigo-500/70 shadow-sm shadow-indigo-500/10'
                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold text-slate-200 truncate">
                    {sample.companyName.split(' ')[0]}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300">
                    {sample.ticker}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                  <span>{sample.financialYear}</span>
                  <span className="text-[10px] text-slate-500">{sample.reportPage}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Area */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 flex items-center gap-2">
            <label className="text-xs font-medium text-slate-300">
              Report Page Reference (Optional):
            </label>
            <input
              type="text"
              value={pageNumber}
              onChange={(e) => onChangePageNumber(e.target.value)}
              placeholder="e.g. 218, Note 2.14"
              className="w-36 px-2.5 py-1 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {content.length.toLocaleString()} characters
          </span>
        </div>

        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => onChangeContent(e.target.value)}
            placeholder="Paste text excerpt from the Indian listed company's annual report tax note (e.g. Note on Income Taxes, Tax reconciliation table, PBT, statutory rate, deductible items)..."
            rows={10}
            className="w-full p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/20 resize-y leading-relaxed"
          />
        </div>
      </div>

      {/* Rules Notice */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400">
        <AlertCircle className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5" />
        <div>
          <span className="font-medium text-slate-300">Extraction Constraint Enforced: </span>
          Values will only be extracted if explicitly reported in the text. Missing fields will strictly evaluate to <code className="text-amber-300 font-mono">null</code>. Negative signs are preserved verbatim.
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-end gap-3 pt-1">
        <button
          onClick={onExtract}
          disabled={isLoading || !content.trim()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>Extracting Disclosure...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Extract Tax-Reconciliation (JSON)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
