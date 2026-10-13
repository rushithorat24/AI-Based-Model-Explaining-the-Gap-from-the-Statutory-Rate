import React from 'react';
import { TaxReconciliationDisclosure } from '../types/taxReconciliation';
import { formatCurrencyAmount, formatRate, getCategoryBadge } from '../utils/formatters';
import { 
  Building, 
  Calendar, 
  FileText, 
  Coins, 
  Percent, 
  Calculator, 
  AlertTriangle,
  Info,
  Scale,
  Globe,
  ExternalLink
} from 'lucide-react';

interface ReconciliationTableProps {
  data: TaxReconciliationDisclosure;
}

export const ReconciliationTable: React.FC<ReconciliationTableProps> = ({ data }) => {
  const currency = data.reporting_currency || 'INR';
  const unit = data.reporting_unit || '';

  return (
    <div className="space-y-6">
      {/* Company Metadata Header */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-white">
                  {data.company_name || <span className="text-slate-500 italic">null (Not stated)</span>}
                </h3>
                {data.publisher && (
                  <span className="px-2 py-0.5 text-[11px] rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                    {data.publisher}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>FY: {data.financial_year || 'null'}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Page: {data.annual_report_page !== null ? String(data.annual_report_page) : 'null'}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-slate-500" />
                  <span>Currency: {data.reporting_currency || 'null'}</span>
                </span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                  Unit: {data.reporting_unit || 'null'}
                </span>
                {data.date_pulled && (
                  <>
                    <span>•</span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      Pulled: {data.date_pulled}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {data.source_url && (
            <a
              href={data.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>Source Filing</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          )}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {/* Profit Before Tax */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400 flex items-center justify-between">
            <span>Profit Before Tax</span>
            <Calculator className="w-3.5 h-3.5 text-indigo-400" />
          </span>
          <div className="mt-2">
            <div className="text-lg font-bold font-mono text-white tracking-tight">
              {formatCurrencyAmount(data.profit_before_tax, unit, currency)}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Base for theoretical tax
            </div>
          </div>
        </div>

        {/* Statutory Tax Rate */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400 flex items-center justify-between">
            <span>Statutory Tax Rate</span>
            <Scale className="w-3.5 h-3.5 text-blue-400" />
          </span>
          <div className="mt-2">
            <div className="text-lg font-bold font-mono text-blue-400 tracking-tight">
              {formatRate(data.statutory_tax_rate)}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Enacted domestic tax rate
            </div>
          </div>
        </div>

        {/* Total Tax Expense */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400 flex items-center justify-between">
            <span>Total Tax Expense</span>
            <Coins className="w-3.5 h-3.5 text-emerald-400" />
          </span>
          <div className="mt-2">
            <div className="text-lg font-bold font-mono text-emerald-400 tracking-tight">
              {formatCurrencyAmount(data.total_tax_expense, unit, currency)}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1.5 font-mono">
              <span>Cur: {data.current_tax_expense !== null ? data.current_tax_expense : 'null'}</span>
              <span>|</span>
              <span>Def: {data.deferred_tax_expense !== null ? data.deferred_tax_expense : 'null'}</span>
            </div>
          </div>
        </div>

        {/* Reported Effective Tax Rate */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400 flex items-center justify-between">
            <span>Reported ETR</span>
            <Percent className="w-3.5 h-3.5 text-purple-400" />
          </span>
          <div className="mt-2">
            <div className="text-lg font-bold font-mono text-purple-400 tracking-tight">
              {formatRate(data.reported_effective_tax_rate)}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Effective tax rate as stated
            </div>
          </div>
        </div>
      </div>

      {/* Ind AS 12 Reconciliation Items Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <h4 className="text-sm font-semibold text-white">
              Ind AS 12 Reconciliation Disclosures ({data.reconciliation_items?.length || 0} Line Items)
            </h4>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Signs preserved verbatim
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Line Item (As Reported)</th>
                <th className="py-3 px-4">Classification Category</th>
                <th className="py-3 px-4 text-right">Amount ({unit || 'As Stated'})</th>
                <th className="py-3 px-4 text-right">Rate Effect (%)</th>
                <th className="py-3 px-4 text-center">Page Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {(!data.reconciliation_items || data.reconciliation_items.length === 0) ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 font-sans">
                    No reconciliation line items found or reported in disclosure.
                  </td>
                </tr>
              ) : (
                data.reconciliation_items.map((item, idx) => {
                  const badge = getCategoryBadge(item.category);
                  const isNegative = item.amount !== null && item.amount < 0;
                  const isPositive = item.amount !== null && item.amount > 0;

                  return (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 text-slate-500 text-[11px] font-mono">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-4 font-sans text-slate-200 font-medium max-w-md">
                        {item.label_as_reported}
                      </td>
                      <td className="py-3 px-4 font-sans">
                        <span 
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border ${badge.bg}`}
                          title={badge.desc}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                          {badge.label}
                        </span>
                      </td>
                      <td className={`py-3 px-4 text-right font-semibold ${
                        isNegative ? 'text-emerald-400' : isPositive ? 'text-amber-400' : 'text-slate-400'
                      }`}>
                        {item.amount !== null ? item.amount.toLocaleString('en-IN') : <span className="text-slate-500 font-normal italic">null</span>}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-300">
                        {item.rate_effect !== null ? formatRate(item.rate_effect) : <span className="text-slate-500 italic">null</span>}
                      </td>
                      <td className="py-3 px-4 text-center text-slate-400 text-[11px]">
                        {item.page_reference || data.annual_report_page || <span className="text-slate-600">—</span>}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Extraction Notes & Missing/Ambiguous Notice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Extraction Notes */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-2">
            <Info className="w-4 h-4 text-indigo-400" />
            <span>Extraction Notes</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            {data.extraction_notes || (
              <span className="italic text-slate-500">No special extraction notes recorded.</span>
            )}
          </p>
        </div>

        {/* Missing or Ambiguous Items */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Missing or Ambiguous Items</span>
          </div>
          <div className="text-xs text-slate-400 leading-relaxed font-sans">
            {data.missing_or_ambiguous_items ? (
              Array.isArray(data.missing_or_ambiguous_items) ? (
                <ul className="list-disc list-inside space-y-1">
                  {data.missing_or_ambiguous_items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{data.missing_or_ambiguous_items}</p>
              )
            ) : (
              <span className="text-emerald-400/80 flex items-center gap-1.5">
                <span>None flagged. All core fields explicitly reported.</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
