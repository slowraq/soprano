export function getPeriodName(timeString: string): string {
    const hour = parseInt(timeString.split(':')[0]);

    if (hour === 6) return 'Утро';
    if (hour === 12) return 'День';
    if (hour ===18) return 'Вечер';
    return 'Ночь';
}
