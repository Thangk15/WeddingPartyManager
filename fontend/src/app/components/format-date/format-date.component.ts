export function formatDateToDDMMYYYY(date: Date): string {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export function parseDate(dateStr: string): Date {
  const [dd, mm, yyyy] = dateStr.split('/');
  return new Date(+yyyy, +mm - 1, +dd);
}