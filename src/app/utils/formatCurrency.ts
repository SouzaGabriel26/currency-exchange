export function formatCurrency(value: number, currencyCode: string) {
  if (value == null) return 'N/A';

  const formattedValue = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(value);

  return formattedValue;
}
