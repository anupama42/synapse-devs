import { inr, site } from '../config/site';
import { Lang, translate, translatePhrase } from './copy';

export function quoteTiming(lang: Lang): string {
  if (site.quoteHours == null) return translate(lang, 'timing.quoteUnset');
  return translate(lang, 'timing.quoteHours', { hours: site.quoteHours });
}

export function revisionLabel(lang: Lang): string {
  if (site.revisions == null) return translate(lang, 'timing.revisionUnset');
  if (site.revisions === 1) return translate(lang, 'timing.revisionOne');
  return translate(lang, 'timing.revisionMany', { count: site.revisions });
}

export function flyerTurnaround(lang: Lang): string {
  if (site.flyerTurnaroundDays == null) return translate(lang, 'timing.turnaroundUnset');
  if (site.flyerTurnaroundDays === 1) return translate(lang, 'timing.turnaroundOne');
  return translate(lang, 'timing.turnaroundMany', { count: site.flyerTurnaroundDays });
}

export function starterKitHeadline(lang: Lang): string {
  if (site.starterKitDays == null) return translate(lang, 'timing.kitUnset');
  return translate(lang, 'timing.kitDays', { days: site.starterKitDays });
}

export function starterKitPriceLabel(lang: Lang): string {
  if (site.starterKitPrice == null) return translate(lang, 'timing.priceUnset');
  return translate(lang, 'timing.priceFrom', { price: inr(site.starterKitPrice) });
}

export function webPriceLabel(lang: Lang, serviceKey: string): string {
  const price = site.webStartingPrices[serviceKey];
  if (price == null) return quoteTiming(lang);
  return translate(lang, 'timing.priceFrom', { price: inr(price) });
}

export function supportLine(lang: Lang): string {
  if (!site.supportPeriod) return translate(lang, 'timing.supportUnset');
  return translate(lang, 'timing.supportSet', { period: translatePhrase(lang, site.supportPeriod) });
}

export function responseLine(lang: Lang): string {
  if (site.responseTime) return translatePhrase(lang, site.responseTime);
  return translate(lang, 'timing.responseUnset');
}

export function addonPriceLabel(lang: Lang, price: number | null): string {
  if (price == null) return translate(lang, 'local.separate');
  return inr(price);
}

export function listJoin(lang: Lang, items: string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  const and = translate(lang, 'list.and');
  return `${items.slice(0, -1).join(', ')} ${and} ${items[items.length - 1]}`;
}
