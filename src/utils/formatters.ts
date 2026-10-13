export function formatCurrencyAmount(
  amount: number | null | undefined,
  unit?: string | null,
  currency: string | null = 'INR'
): string {
  if (amount === null || amount === undefined) {
    return 'null';
  }

  const sign = amount < 0 ? '-' : '';
  const absAmount = Math.abs(amount);
  
  // Format with Indian numbering system if appropriate or 2 decimals
  const formattedNum = absAmount.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(absAmount) ? 0 : 2,
  });

  const currencySymbol = currency === 'INR' ? '₹' : (currency || '');
  return `${sign}${currencySymbol} ${formattedNum} ${unit || ''}`.trim();
}

export function formatRate(rate: number | string | null | undefined): string {
  if (rate === null || rate === undefined) return 'null';
  if (typeof rate === 'string') {
    return rate.endsWith('%') ? rate : `${rate}%`;
  }
  const sign = rate > 0 ? '+' : '';
  return `${sign}${rate.toFixed(2)}%`;
}

export function getCategoryBadge(category: string) {
  switch (category) {
    case 'permanent_difference':
      return {
        label: 'Permanent Difference',
        bg: 'bg-purple-900/30 text-purple-300 border-purple-700/50',
        dot: 'bg-purple-400',
        desc: 'Permanent additions/disallowances (e.g., CSR, penalties)',
      };
    case 'timing_difference':
      return {
        label: 'Timing Difference',
        bg: 'bg-blue-900/30 text-blue-300 border-blue-700/50',
        dot: 'bg-blue-400',
        desc: 'Temporary differences impacting deferred tax',
      };
    case 'incentive':
      return {
        label: 'Tax Incentive / Deduction',
        bg: 'bg-emerald-900/30 text-emerald-300 border-emerald-700/50',
        dot: 'bg-emerald-400',
        desc: 'Tax deductions & tax holidays (e.g., Sec 10AA SEZ, 80-IA)',
      };
    case 'prior_year_adjustment':
      return {
        label: 'Prior Year Adjustment',
        bg: 'bg-amber-900/30 text-amber-300 border-amber-700/50',
        dot: 'bg-amber-400',
        desc: 'Adjustments in respect of earlier financial years',
      };
    case 'other':
    default:
      return {
        label: 'Other Differential',
        bg: 'bg-slate-800 text-slate-300 border-slate-700',
        dot: 'bg-slate-400',
        desc: 'Foreign tax rates, branch surcharges, capital gains differential',
      };
  }
}
