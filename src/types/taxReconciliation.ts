export type ReconciliationCategory =
  | 'permanent_difference'
  | 'timing_difference'
  | 'incentive'
  | 'prior_year_adjustment'
  | 'other';

export interface ReconciliationItem {
  label_as_reported: string;
  category: ReconciliationCategory;
  amount: number | null;
  rate_effect: number | string | null;
  page_reference: string;
}

export interface TaxReconciliationDisclosure {
  company_name: string | null;
  financial_year: string | null;
  annual_report_page: string | number | null;
  reporting_currency: string | null;
  reporting_unit: string | null;
  profit_before_tax: number | null;
  current_tax_expense: number | null;
  deferred_tax_expense: number | null;
  total_tax_expense: number | null;
  reported_effective_tax_rate: number | string | null;
  statutory_tax_rate: number | string | null;
  reconciliation_items: ReconciliationItem[];
  extraction_notes: string | null;
  missing_or_ambiguous_items: string[] | string | null;
  source_url?: string | null;
  publisher?: string | null;
  date_pulled?: string | null;
}

export interface SampleReport {
  id: string;
  companyName: string;
  ticker: string;
  financialYear: string;
  reportPage: string;
  industry: string;
  reportingUnit: string;
  rawText: string;
  sourceUrl?: string;
  publisher?: string;
  datePulled?: string;
  benchmarkJson: TaxReconciliationDisclosure;
}
