import React, { useState } from 'react';
import { TaxReconciliationDisclosure } from '../types/taxReconciliation';
import { Copy, Check, Download, FileCode, CheckCheck } from 'lucide-react';

interface JsonViewerProps {
  data: TaxReconciliationDisclosure;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `${(data.company_name || 'tax_reconciliation')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')}_${data.financial_year || 'disclosure'}.json`;

    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
      <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-semibold text-slate-200">
            Standardized Output JSON (Exact Schema)
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
            Valid JSON
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy JSON</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors cursor-pointer shadow-sm shadow-indigo-600/30"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .json</span>
          </button>
        </div>
      </div>

      <div className="p-4 bg-slate-950 overflow-x-auto max-h-[600px]">
        <pre className="text-xs font-mono text-emerald-400/90 leading-relaxed select-all">
          {jsonString}
        </pre>
      </div>
    </div>
  );
};
