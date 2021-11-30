export const isEqualDates = (date1: Date, date2: Date) => {
  if (!date1 || !date2) {
    return false;
  }
  if (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDay() === date2.getDay()
  ) {
    return true;
  }
  return false;
};

export const compareDates = (a: Date, b: Date) => {
  if (!a || !b) {
    return null;
  }
  return a.getTime() - b.getTime();
};
