import React from 'react';
import { X, Copy, Check, Terminal, ShieldCheck } from 'lucide-react';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromptModal: React.FC<PromptModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const promptText = `You are extracting a tax-reconciliation disclosure from an Indian listed company annual report.

Return JSON only. Do not calculate, infer, or fill missing values.
Use only values explicitly stated in the supplied pages.

Fields:
- company_name
- financial_year
- annual_report_page
- reporting_currency
- reporting_unit
- profit_before_tax
- current_tax_expense
- deferred_tax_expense
- total_tax_expense
- reported_effective_tax_rate
- statutory_tax_rate
- reconciliation_items: [
  {
    "label_as_reported": "",
    "category": "permanent_difference | timing_difference | incentive | prior_year_adjustment | other",
    "amount": null,
    "rate_effect": null,
    "page_reference": ""
  }
]
- extraction_notes
- missing_or_ambiguous_items

If a value is absent, use null. Preserve negative signs exactly.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-semibold text-white">
              Extraction System Prompt & Schema
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-200 leading-relaxed">
              <strong>Strict Compliance Guarantee:</strong> The extractor executes with zero temperature. No values are calculated or hallucinated. All fields missing in the supplied pages evaluate strictly to <code className="text-indigo-300 font-mono">null</code>, preserving verbatim signs and reported labels.
            </div>
          </div>

          <div className="relative">
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed select-all">
              {promptText}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
