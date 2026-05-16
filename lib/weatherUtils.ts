export function getWeatherGradient(weatherId: number, isDay: boolean): string {
  if (weatherId >= 200 && weatherId < 300) return 'from-gray-700 via-slate-800 to-gray-950';
  if (weatherId >= 300 && weatherId < 400) return 'from-blue-400 via-sky-500 to-blue-700';
  if (weatherId >= 500 && weatherId < 600) return 'from-blue-500 via-indigo-600 to-blue-900';
  if (weatherId >= 600 && weatherId < 700) return 'from-sky-200 via-blue-200 to-indigo-300';
  if (weatherId >= 700 && weatherId < 800) return 'from-stone-300 via-stone-400 to-amber-200';
  if (weatherId === 800)
    return isDay
      ? 'from-amber-300 via-orange-400 to-sky-500'
      : 'from-indigo-900 via-blue-950 to-slate-950';
  if (weatherId === 801 || weatherId === 802)
    return isDay
      ? 'from-sky-300 via-blue-400 to-slate-500'
      : 'from-slate-700 via-blue-900 to-slate-950';
  return 'from-slate-400 via-slate-500 to-slate-700';
}

export function formatDate(date: Date): string {
  const day = date.toLocaleDateString('en-US', { weekday: 'long' });
  const dayOfMonth = date.getDate();
  const suffix = getDaySuffix(dayOfMonth);
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${day}, ${dayOfMonth}${suffix} ${month} ${year}`;
}

function getDaySuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

export function formatTime(timeStr: string): string {
  const [hours, minutes] = timeStr.split(':');
  let h = parseInt(hours);
  const suffix = h >= 12 ? 'PM' : 'AM';
  if (h > 12) h -= 12;
  else if (h === 0) h = 12;
  return `${h}:${minutes} ${suffix}`;
}
