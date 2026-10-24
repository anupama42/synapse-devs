import { site } from '../config/site';
import { Lang, translate, translatePhrase } from '../i18n/copy';
import { flyerTurnaround, listJoin, quoteTiming, responseLine, revisionLabel, starterKitPriceLabel, supportLine } from '../i18n/format';

export interface FaqItem {
  question: string;
  answer: string;
}

export function homeFaqs(lang: Lang = 'en'): FaqItem[] {
  return [
    { question: translate(lang, 'faq.home.1.q'), answer: translate(lang, 'faq.home.1.a') },
    { question: translate(lang, 'faq.home.2.q'), answer: translate(lang, 'faq.home.2.a', { quote: quoteTiming(lang) }) },
    {
      question: translate(lang, 'faq.home.3.q'),
      answer: translate(lang, 'faq.home.3.a', { price: starterKitPriceLabel(lang) }),
    },
    { question: translate(lang, 'faq.home.4.q'), answer: supportLine(lang) },
  ];
}

export function localFaqs(lang: Lang = 'en'): FaqItem[] {
  const captions = site.includeCaptions ? translate(lang, 'faq.local.5.a.yes') : translate(lang, 'faq.local.5.a.no');
  const pay = site.paymentTerms
    ? translate(lang, 'faq.local.7.a.set', { terms: translatePhrase(lang, site.paymentTerms) })
    : translate(lang, 'faq.local.7.a.unset');
  return [
    { question: translate(lang, 'faq.local.1.q'), answer: translate(lang, 'faq.local.1.a') },
    { question: translate(lang, 'faq.local.2.q'), answer: translate(lang, 'faq.local.2.a') },
    { question: translate(lang, 'faq.local.3.q'), answer: translate(lang, 'faq.local.3.a', { revisions: revisionLabel(lang) }) },
    {
      question: translate(lang, 'faq.local.4.q'),
      answer:
        site.flyerTurnaroundDays == null
          ? translate(lang, 'faq.local.4.a.unset')
          : translate(lang, 'faq.local.4.a', { turnaround: flyerTurnaround(lang) }),
    },
    { question: translate(lang, 'faq.local.5.q'), answer: captions },
    { question: translate(lang, 'faq.local.6.q'), answer: translate(lang, 'faq.local.6.a') },
    { question: translate(lang, 'faq.local.7.q'), answer: pay },
    { question: translate(lang, 'faq.local.8.q'), answer: translate(lang, 'faq.local.8.a') },
    { question: translate(lang, 'faq.local.9.q'), answer: translate(lang, 'faq.local.9.a') },
  ];
}

export function webFaqs(lang: Lang = 'en'): FaqItem[] {
  const list = listJoin(
    lang,
    site.clientChecklist.map((item) => translatePhrase(lang, item)),
  );
  return [
    { question: translate(lang, 'faq.web.1.q'), answer: translate(lang, 'faq.web.1.a', { quote: quoteTiming(lang) }) },
    { question: translate(lang, 'faq.web.2.q'), answer: translate(lang, 'faq.web.2.a', { quote: quoteTiming(lang) }) },
    { question: translate(lang, 'faq.web.3.q'), answer: translate(lang, 'faq.web.3.a') },
    { question: translate(lang, 'faq.web.4.q'), answer: translate(lang, 'faq.web.4.a', { list }) },
    {
      question: translate(lang, 'faq.web.5.q'),
      answer: translate(lang, 'faq.web.5.a', { support: supportLine(lang), response: responseLine(lang) }),
    },
  ];
}
