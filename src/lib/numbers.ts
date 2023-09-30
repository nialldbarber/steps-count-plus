/**
 * Example: // 3500 -> '3,500' if in US English locale
 * @param num
 * @returns string
 */
export const formatNumber = (num: number) => Intl.NumberFormat().format(num);
