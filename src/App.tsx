import React, { useState } from 'react';
import { Header } from './components/Header';
import { PromptModal } from './components/PromptModal';
import { ExtractionInput } from './components/ExtractionInput';
import { ReconciliationTable } from './components/ReconciliationTable';
import { JsonViewer } from './components/JsonViewer';
import { AuditPanel } from './components/AuditPanel';
import { SAMPLE_REPORTS } from './data/samples';
import { SampleReport, TaxReconciliationDisclosure } from './types/taxReconciliation';
import { 
  TableProperties, 
  FileCode, 
  Scale, 
  AlertCircle, 
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  
  // Default to Infosys FY24 sample
  const initialSample = SAMPLE_REPORTS[0];
  const [content, setContent] = useState(initialSample.rawText);
  const [pageNumber, setPageNumber] = useState(initialSample.reportPage);
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(initialSample.id);
  
  // Extracted disclosure state
  const [disclosure, setDisclosure] = useState<TaxReconciliationDisclosure>(initialSample.benchmarkJson);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'table' | 'json' | 'audit'>('table');

  const handleSelectSample = (sample: SampleReport) => {
    setSelectedSampleId(sample.id);
    setContent(sample.rawText);
    setPageNumber(sample.reportPage);
    setDisclosure(sample.benchmarkJson);
    setErrorMessage(null);
  };

  const handleExtract = async () => {
    if (!content.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page_content: content,
          page_number: pageNumber.trim() || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to extract tax reconciliation disclosure.');
      }

      setDisclosure(result.data);
    } catch (err: any) {
      console.error('Extraction error:', err);
      setErrorMessage(
        err.message || 'An error occurred while extracting the tax reconciliation disclosure.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Header onOpenPrompt={() => setIsPromptModalOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Intro Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-indigo-950/40 border border-slate-800">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <span>Ind AS 12 Income Tax Reconciliation Disclosures</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                Indian Listed Companies (BSE / NSE)
              </span>
            </h2>
            <p className="text-xs text-slate-400 max-w-3xl">
              Extracts company tax provision reconciliations into standardized JSON format with strict zero-calculation and zero-inference rules. Supplies verified categories for permanent differences, timing differences, tax incentives (SEZ / 80-IA), and prior period adjustments.
            </p>
          </div>

          <button
            onClick={() => setIsPromptModalOpen(true)}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>View Extraction Rules</span>
          </button>
        </div>

        {/* Input Section */}
        <ExtractionInput
          content={content}
          onChangeContent={(newContent) => {
            setContent(newContent);
            setSelectedSampleId(null);
          }}
          pageNumber={pageNumber}
          onChangePageNumber={setPageNumber}
          onExtract={handleExtract}
          isLoading={isLoading}
          onSelectSample={handleSelectSample}
          selectedSampleId={selectedSampleId}
        />

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">Extraction Issue</strong>
              <p className="mt-0.5 text-red-200/90">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Output Section */}
        {disclosure && (
          <div className="space-y-4">
            {/* View Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
                <button
                  onClick={() => setActiveTab('table')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeTab === 'table'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <TableProperties className="w-3.5 h-3.5" />
                  <span>Disclosure Table</span>
                </button>

                <button
                  onClick={() => setActiveTab('json')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeTab === 'json'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Standardized JSON</span>
                </button>

                <button
                  onClick={() => setActiveTab('audit')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeTab === 'audit'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Audit & Integrity Check</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {disclosure.company_name || 'Extracted Report'} • {disclosure.financial_year || 'FY'}
                </span>
              </div>
            </div>

            {/* Tab Contents */}
            {activeTab === 'table' && <ReconciliationTable data={disclosure} />}
            {activeTab === 'json' && <JsonViewer data={disclosure} />}
            {activeTab === 'audit' && <AuditPanel data={disclosure} />}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>
            Ind AS 12 (Indian Accounting Standard 12) Tax-Reconciliation Disclosure Extractor
          </span>
          <span className="text-[11px] text-slate-600 font-mono">
            Zero-Calculation • Exact Negative Signs Preserved • Schema Compliant
          </span>
        </div>
      </footer>

      {/* Modal */}
      <PromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
      />
    </div>
  );
}
