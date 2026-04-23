export interface PartMeta {
  slug: string;
  number: string;
  numberRoman: string;
  title: string;
  subtitle: string;
  forWhom: string;
}

export const PARTS: PartMeta[] = [
  {
    slug: 'product-types',
    number: 'One',
    numberRoman: 'I',
    title: 'What you can sell',
    subtitle:
      'Every product type in WooCommerce, how they actually work, and what surprises you.',
    forWhom: 'For anyone setting up products or debugging inventory.',
  },
  {
    slug: 'store-operations',
    number: 'Two',
    numberRoman: 'II',
    title: 'Running your store',
    subtitle:
      'Payments, shipping, tax, emails — the operational layer beneath the storefront.',
    forWhom: 'For merchants configuring a real store.',
  },
  {
    slug: 'troubleshooting',
    number: 'Three',
    numberRoman: 'III',
    title: 'When things go wrong',
    subtitle:
      'Diagnostic protocols for the failures you will encounter — sooner or later.',
    forWhom: 'For everyone, eventually.',
  },
  {
    slug: 'agencies',
    number: 'Four',
    numberRoman: 'IV',
    title: 'For agencies & builders',
    subtitle:
      'Pre-launch, staging, client handoff, and evaluating extensions before you commit.',
    forWhom: 'For agencies shipping client stores.',
  },
  {
    slug: 'extending',
    number: 'Five',
    numberRoman: 'V',
    title: 'Extending with code',
    subtitle:
      'Custom plugins, hooks, and working with AI tools — for when you outgrow extensions.',
    forWhom: 'For developers (and curious merchants).',
  },
];

export function getPart(slug: string): PartMeta | undefined {
  return PARTS.find((p) => p.slug === slug);
}
