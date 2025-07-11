import { formatDate } from '@angular/common';

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

export function formatDateFromDB(strDate: string): string {
  if (!strDate)
    return '';
  return formatDate(strDate, 'dd/MM/yyyy', 'en-US');
}

export function convertTo24HourFormat(time12h: string): string {
  const [rawTime, modifier] = time12h.trim().split(' ');
  let [hours, minutes] = rawTime.split(':').map(Number);

  if (modifier === 'PM' && hours < 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  const hh = hours.toString().padStart(2, '0');
  const mm = minutes.toString().padStart(2, '0');

  return `${hh}:${mm}:00`;
}

export function convertTo12HourFormat(time24h: string): string {
  const [hourStr, minuteStr] = time24h.split(':');
  let hours = parseInt(hourStr, 10);
  const minutes = parseInt(minuteStr, 10);

  const modifier = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  if (hours === 0) hours = 12;

  const hh = hours.toString();
  const mm = minutes.toString().padStart(2, '0');

  return `${hh}:${mm} ${modifier}`;
}