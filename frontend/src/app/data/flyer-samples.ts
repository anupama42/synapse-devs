export interface FlyerSample {
  client: string;
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
}

/** Real client photo → finished flyer. Hidden on the site while this list is empty. */
export const flyerSamples: FlyerSample[] = [];
