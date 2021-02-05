const getPercentage = (actual: number, max: number) => actual / max;
const formatPercentage = (number: number) => Math.round(number * 100);

export const generateRadialData = (value: number, meta: number): number =>
  formatPercentage(getPercentage(value, meta));
