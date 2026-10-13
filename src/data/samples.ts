import { SampleReport } from '../types/taxReconciliation';

export const SAMPLE_REPORTS: SampleReport[] = [
  {
    id: 'tata-steel-fy24',
    companyName: 'Tata Steel Limited',
    ticker: 'TATASTEEL',
    financialYear: 'FY2024',
    reportPage: 'p.187',
    industry: 'Steel & Metallurgy',
    reportingUnit: '₹ in crore',
    sourceUrl: 'https://bseindia.com/stock-share-price/tata-steel-ltd/tatasteel/500470/financials-annual-reports/',
    publisher: 'BSE India',
    datePulled: '01 Oct 2026',
    rawText: `TATA STEEL LIMITED
INTEGRATED REPORT & ANNUAL ACCOUNTS 2023-24 (FY2024)
NOTES FORMING PART OF THE STANDALONE FINANCIAL STATEMENTS
NOTE 32: TAX EXPENSE (Page 187)

Source Metadata:
Publisher: BSE India
Date Pulled: 01 Oct 2026
Page Number: p.187

(a) Tax expense recognized in the Statement of Profit and Loss:
Particulars                                              Year ended March 31, 2024 (₹ in crore)
Current tax:
- In respect of current year                             2,348.60
- In respect of previous years                           (59.62)
Deferred tax credit / (charge)                           (428.12)
Total income tax expense                                 1,920.48

(b) Reconciliation of tax expense and the accounting profit multiplied by India's domestic tax rate:
Particulars                                                                Year ended March 31, 2024
Accounting profit before tax                                               9,214.28
Applicable domestic statutory tax rate in India                            25.17%
Computed tax expense at applicable statutory rate                          2,319.05

Tax effect of:
- Expenses disallowed / non-deductible (including CSR & Sec 14A)            88.45
- Income exempt from tax (including dividend income)                       (185.30)
- Tax incentives and investment allowances                                 (242.10)
- Adjustments for current tax of prior periods                             (59.62)

Total income tax expense recognized in Statement of Profit and Loss        1,920.48
Reported effective tax rate                                                20.84%

Reference: BSE India Annual Report Filing FY2024, Page 187, Note 32`,
    benchmarkJson: {
      company_name: 'Tata Steel Limited',
      financial_year: 'FY2024',
      annual_report_page: 'p.187',
      reporting_currency: 'INR',
      reporting_unit: '₹ in crore',
      profit_before_tax: 9214.28,
      current_tax_expense: 2348.60,
      deferred_tax_expense: -428.12,
      total_tax_expense: 1920.48,
      reported_effective_tax_rate: '20.84%',
      statutory_tax_rate: '25.17%',
      reconciliation_items: [
        {
          label_as_reported: 'Expenses disallowed / non-deductible (including CSR & Sec 14A)',
          category: 'permanent_difference',
          amount: 88.45,
          rate_effect: null,
          page_reference: 'p.187',
        },
        {
          label_as_reported: 'Income exempt from tax (including dividend income)',
          category: 'permanent_difference',
          amount: -185.30,
          rate_effect: null,
          page_reference: 'p.187',
        },
        {
          label_as_reported: 'Tax incentives and investment allowances',
          category: 'incentive',
          amount: -242.10,
          rate_effect: null,
          page_reference: 'p.187',
        },
        {
          label_as_reported: 'Adjustments for current tax of prior periods',
          category: 'prior_year_adjustment',
          amount: -59.62,
          rate_effect: null,
          page_reference: 'p.187',
        },
      ],
      extraction_notes: 'Extracted from BSE India filing FY2024, Page 187 (Note 32). Standalone profit before tax and tax reconciliations extracted with verbatim negative signs.',
      missing_or_ambiguous_items: null,
      source_url: 'https://bseindia.com/stock-share-price/tata-steel-ltd/tatasteel/500470/financials-annual-reports/',
      publisher: 'BSE India',
      date_pulled: '01 Oct 2026',
    },
  },
  {
    id: 'infosys-fy24',
    companyName: 'Infosys Limited',
    ticker: 'INFY',
    financialYear: '2023-24',
    reportPage: 'Page 218',
    industry: 'Information Technology & Consulting',
    reportingUnit: '₹ in crore',
    rawText: `INFOSYS LIMITED
NOTES TO THE STANDALONE FINANCIAL STATEMENTS FOR THE YEAR ENDED MARCH 31, 2024
NOTE 2.14: INCOME TAXES (Page 218)

Income tax expense in the Statement of Profit and Loss comprises:
Particulars                                              Year ended March 31, 2024 (₹ in crore)
Current tax                                              8,881
Deferred tax                                             (410)
Total income tax expense                                 8,471

A reconciliation of the income tax provision to the amount computed by applying the statutory income tax rate to the income before income taxes is summarized below:

Particulars                                                                Year ended March 31, 2024
Profit before income taxes (₹ in crore)                                     34,719
Enacted tax rates in India                                                 25.17%
Computed expected tax expense                                              8,739

Tax effect, net of:
- Deductions under Section 10AA of the Income-tax Act (SEZ units)          (654)    [-1.88%]
- Expenses not deductible for tax purposes (including CSR expenditure)     112     [+0.32%]
- Taxes in respect of earlier years                                        215     [+0.62%]
- Overseas taxes and branch differential tax rates                         59      [+0.17%]

Total income tax expense                                                   8,471
Reported effective tax rate                                                24.40%

Notes:
1. The applicable statutory tax rate for the year ended March 31, 2024 is 25.168% (rounded to 25.17%), which includes basic tax rate of 22%, surcharge of 10% and education cess of 4% under Section 115BAA of the Income-tax Act, 1961.
2. In the prior year ended March 31, 2023, the effective tax rate was 27.20%.`,
    benchmarkJson: {
      company_name: 'Infosys Limited',
      financial_year: '2023-24',
      annual_report_page: '218',
      reporting_currency: 'INR',
      reporting_unit: '₹ in crore',
      profit_before_tax: 34719,
      current_tax_expense: 8881,
      deferred_tax_expense: -410,
      total_tax_expense: 8471,
      reported_effective_tax_rate: '24.40%',
      statutory_tax_rate: '25.17%',
      reconciliation_items: [
        {
          label_as_reported: 'Deductions under Section 10AA of the Income-tax Act (SEZ units)',
          category: 'incentive',
          amount: -654,
          rate_effect: -1.88,
          page_reference: '218',
        },
        {
          label_as_reported: 'Expenses not deductible for tax purposes (including CSR expenditure)',
          category: 'permanent_difference',
          amount: 112,
          rate_effect: 0.32,
          page_reference: '218',
        },
        {
          label_as_reported: 'Taxes in respect of earlier years',
          category: 'prior_year_adjustment',
          amount: 215,
          rate_effect: 0.62,
          page_reference: '218',
        },
        {
          label_as_reported: 'Overseas taxes and branch differential tax rates',
          category: 'other',
          amount: 59,
          rate_effect: 0.17,
          page_reference: '218',
        },
      ],
      extraction_notes: 'Figures extracted directly from Note 2.14 on page 218. Negative tax effects preserved as reported.',
      missing_or_ambiguous_items: null,
    },
  },
  {
    id: 'tcs-fy24',
    companyName: 'Tata Consultancy Services Limited',
    ticker: 'TCS',
    financialYear: '2023-24',
    reportPage: 'Page 312',
    industry: 'Information Technology Services',
    reportingUnit: '₹ in crore',
    rawText: `TATA CONSULTANCY SERVICES LIMITED
INTEGRATED ANNUAL REPORT 2023-24
NOTES TO CONSOLIDATED FINANCIAL STATEMENTS
NOTE 24: INCOME TAXES (Page 312)

(a) Income tax expense recognized in the Statement of Profit and Loss:
Particulars                                              Year ended March 31, 2024 (₹ in crore)
Current income tax:
- In respect of current year                             15,348
- Adjustments in respect of previous years               (45)
Deferred tax expense / (benefit)                         (87)
Total income tax expense                                 15,216

(b) Reconciliation of tax expense and the accounting profit multiplied by India's domestic tax rate:
Particulars                                                                Year ended March 31, 2024
Accounting profit before income tax                                        61,211
Applicable statutory tax rate in India                                     25.168%
Computed tax expense at statutory rate                                     15,406

Tax effect of:
- Income exempt from tax / concessional export earnings (SEZ units)        (348)
- Expenses that are not deductible in determining taxable profit (CSR)      124
- Effect of higher tax rates on foreign subsidiaries / overseas branches   165
- Tax effect of non-taxable dividend and other income                      (86)
- Adjustments recognized in the current year for current tax of prior years (45)

Total tax expense recognized in Statement of Profit and Loss               15,216
Effective tax rate                                                         24.86%

Annual Report Reference: Page 312, Note 24 (b)`,
    benchmarkJson: {
      company_name: 'Tata Consultancy Services Limited',
      financial_year: '2023-24',
      annual_report_page: '312',
      reporting_currency: 'INR',
      reporting_unit: '₹ in crore',
      profit_before_tax: 61211,
      current_tax_expense: 15348,
      deferred_tax_expense: -87,
      total_tax_expense: 15216,
      reported_effective_tax_rate: '24.86%',
      statutory_tax_rate: '25.168%',
      reconciliation_items: [
        {
          label_as_reported: 'Income exempt from tax / concessional export earnings (SEZ units)',
          category: 'incentive',
          amount: -348,
          rate_effect: null,
          page_reference: '312',
        },
        {
          label_as_reported: 'Expenses that are not deductible in determining taxable profit (CSR)',
          category: 'permanent_difference',
          amount: 124,
          rate_effect: null,
          page_reference: '312',
        },
        {
          label_as_reported: 'Effect of higher tax rates on foreign subsidiaries / overseas branches',
          category: 'other',
          amount: 165,
          rate_effect: null,
          page_reference: '312',
        },
        {
          label_as_reported: 'Tax effect of non-taxable dividend and other income',
          category: 'permanent_difference',
          amount: -86,
          rate_effect: null,
          page_reference: '312',
        },
        {
          label_as_reported: 'Adjustments recognized in the current year for current tax of prior years',
          category: 'prior_year_adjustment',
          amount: -45,
          rate_effect: null,
          page_reference: '312',
        },
      ],
      extraction_notes: 'Current tax prior year adjustment is stated both in tax expense breakdown and in reconciliation items.',
      missing_or_ambiguous_items: null,
    },
  },
  {
    id: 'itc-fy24',
    companyName: 'ITC Limited',
    ticker: 'ITC',
    financialYear: '2023-24',
    reportPage: 'Page 247',
    industry: 'Consumer Goods & Conglomerate',
    reportingUnit: '₹ in Crores',
    rawText: `ITC LIMITED
REPORT AND ACCOUNTS 2024
NOTES TO THE FINANCIAL STATEMENTS (Page 247)
NOTE 25: INCOME TAX EXPENSE

The major components of income tax expense for the year ended 31st March, 2024 are:
(₹ in Crores)
Current tax:
- In respect of current year: 6,854.21
- Adjustments for current tax of prior periods: 9.54
Deferred tax:
- Relating to origination and reversal of temporary differences: (85.37)
Total tax expense: 6,778.38

Reconciliation of tax expense and the accounting profit multiplied by statutory tax rate:
Accounting profit before tax: 27,246.52
Domestic statutory tax rate applicable to the Company: 25.168%
Tax at the domestic statutory tax rate: 6,857.41

Reconciliation items:
- Income exempt from tax / lower tax rate on capital gains: (132.84)
- Corporate Social Responsibility expenses disallowed: 68.42
- Weighted deductions and investment allowances: (24.15)
- Tax in respect of earlier years: 9.54

Total tax expense reported in Statement of Profit and Loss: 6,778.38
Effective tax rate: 24.88%`,
    benchmarkJson: {
      company_name: 'ITC Limited',
      financial_year: '2023-24',
      annual_report_page: '247',
      reporting_currency: 'INR',
      reporting_unit: '₹ in Crores',
      profit_before_tax: 27246.52,
      current_tax_expense: 6854.21,
      deferred_tax_expense: -85.37,
      total_tax_expense: 6778.38,
      reported_effective_tax_rate: '24.88%',
      statutory_tax_rate: '25.168%',
      reconciliation_items: [
        {
          label_as_reported: 'Income exempt from tax / lower tax rate on capital gains',
          category: 'permanent_difference',
          amount: -132.84,
          rate_effect: null,
          page_reference: '247',
        },
        {
          label_as_reported: 'Corporate Social Responsibility expenses disallowed',
          category: 'permanent_difference',
          amount: 68.42,
          rate_effect: null,
          page_reference: '247',
        },
        {
          label_as_reported: 'Weighted deductions and investment allowances',
          category: 'incentive',
          amount: -24.15,
          rate_effect: null,
          page_reference: '247',
        },
        {
          label_as_reported: 'Tax in respect of earlier years',
          category: 'prior_year_adjustment',
          amount: 9.54,
          rate_effect: null,
          page_reference: '247',
        },
      ],
      extraction_notes: 'All values preserved in ₹ in Crores with exact decimals as reported on page 247.',
      missing_or_ambiguous_items: null,
    },
  },
  {
    id: 'lt-fy24',
    companyName: 'Larsen & Toubro Limited',
    ticker: 'LT',
    financialYear: '2023-24',
    reportPage: 'Page 354',
    industry: 'Engineering & Infrastructure',
    reportingUnit: '₹ crore',
    rawText: `LARSEN & TOUBRO LIMITED
ANNUAL REPORT 2023-24
NOTE 31: INCOME TAXES (Page 354)

Income tax expense in the statement of profit and loss comprises:
Current income tax expense: ₹ 4,785.40 crore
Deferred income tax credit: ₹ (124.60) crore
Total income tax expense: ₹ 4,660.80 crore

Reconciliation of tax expense:
Profit before tax: ₹ 18,342.18 crore
Applicable tax rate: 25.17%
Computed tax expense: ₹ 4,616.73 crore

Adjustments:
- Deduction under Section 80-IA / infrastructure incentives: ₹ (182.50) crore
- Non-deductible expenses (penalties, CSR expenditure): ₹ 142.10 crore
- Effect of different tax rates applicable to foreign projects and entities: ₹ 114.25 crore
- Prior year tax adjustment: ₹ (29.78) crore

Tax expense: ₹ 4,660.80 crore
Reported effective tax rate: 25.41%`,
    benchmarkJson: {
      company_name: 'Larsen & Toubro Limited',
      financial_year: '2023-24',
      annual_report_page: '354',
      reporting_currency: 'INR',
      reporting_unit: '₹ crore',
      profit_before_tax: 18342.18,
      current_tax_expense: 4785.40,
      deferred_tax_expense: -124.60,
      total_tax_expense: 4660.80,
      reported_effective_tax_rate: '25.41%',
      statutory_tax_rate: '25.17%',
      reconciliation_items: [
        {
          label_as_reported: 'Deduction under Section 80-IA / infrastructure incentives',
          category: 'incentive',
          amount: -182.50,
          rate_effect: null,
          page_reference: '354',
        },
        {
          label_as_reported: 'Non-deductible expenses (penalties, CSR expenditure)',
          category: 'permanent_difference',
          amount: 142.10,
          rate_effect: null,
          page_reference: '354',
        },
        {
          label_as_reported: 'Effect of different tax rates applicable to foreign projects and entities',
          category: 'other',
          amount: 114.25,
          rate_effect: null,
          page_reference: '354',
        },
        {
          label_as_reported: 'Prior year tax adjustment',
          category: 'prior_year_adjustment',
          amount: -29.78,
          rate_effect: null,
          page_reference: '354',
        },
      ],
      extraction_notes: 'Reconciliation amounts given in ₹ crore with decimal precision.',
      missing_or_ambiguous_items: null,
    },
  },
];
