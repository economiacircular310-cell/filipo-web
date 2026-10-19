/**
 * Central business data. Everything here feeds the visible site, the JSON-LD
 * structured data and llms.txt — keep it accurate and consistent with your
 * profiles elsewhere (LinkedIn, Google Business Profile, Clutch…), because
 * search engines and AI models cross-check these facts.
 */
export const site = {
  name: 'Filipo Studio',
  url: 'https://filipostudio.com',
  email: 'hola@filipostudio.com',
  /** Optional, E.164 format, e.g. '+34600000000'. Leave empty to hide it. */
  phone: '',
  foundingYear: '',
  /** Profiles that describe the same company (used as schema.org `sameAs`). */
  sameAs: [
    // 'https://www.linkedin.com/company/filipo-studio',
    // 'https://github.com/filipo-studio',
  ] as string[],
  /** Countries / regions you serve (schema.org `areaServed`). */
  areaServed: ['ES', 'EU', 'LATAM', 'US'],
  /**
   * Legal details shown in the legal notice and privacy policy (required in
   * Spain by LSSI-CE and GDPR). Fill these in before launch.
   */
  legal: {
    ownerName: 'Filipo Studio',
    taxId: '[NIF/CIF]',
    address: '[Domicilio fiscal]',
    registry: '',
  },
  /** Web3Forms public access key — set PUBLIC_WEB3FORMS_KEY in .env */
  web3formsKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '',
} as const;

export const ogImage = '/og-default.png';
