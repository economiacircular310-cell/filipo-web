import type { Locale } from '../i18n/routes';

export interface FaqGroup {
  title: string;
  items: { q: string; a: string }[];
}

/** General FAQs (service-specific FAQs live in each service's frontmatter). */
export const faq: Record<Locale, FaqGroup[]> = {
  es: [
    {
      title: 'Sobre el estudio',
      items: [
        {
          q: '¿Qué es Filipo Studio?',
          a: 'Filipo Studio es un estudio de tecnología especializado en desarrollo de software a medida, posicionamiento SEO en Google y en buscadores de IA, y optimización del rendimiento web.',
        },
        {
          q: '¿Con qué tipo de empresas trabajáis?',
          a: 'Trabajamos con pymes, startups y empresas consolidadas que necesitan un producto digital propio, mejorar su visibilidad en buscadores o acelerar una web que ya tienen.',
        },
        {
          q: '¿Trabajáis con clientes fuera de España?',
          a: 'Sí. Trabajamos en remoto con clientes de España, Europa, Latinoamérica y Estados Unidos, en español y en inglés.',
        },
      ],
    },
    {
      title: 'Proyectos y presupuestos',
      items: [
        {
          q: '¿Cómo empieza un proyecto con vosotros?',
          a: 'Con una primera reunión gratuita en la que nos cuentas tu situación y objetivos. Después te enviamos una propuesta con alcance, fases, plazos y presupuesto.',
        },
        {
          q: '¿Cómo se calcula el presupuesto?',
          a: 'Preparamos presupuestos cerrados por fases a partir del alcance acordado. Para trabajos continuos como SEO o mantenimiento ofrecemos cuotas mensuales.',
        },
        {
          q: '¿En cuánto tiempo respondéis a una solicitud?',
          a: 'Respondemos a todas las solicitudes de contacto en un plazo máximo de un día laborable.',
        },
      ],
    },
    {
      title: 'Calidad y propiedad',
      items: [
        {
          q: '¿De quién es el código y el contenido que creáis?',
          a: 'Del cliente. El código fuente, la documentación, los contenidos y los accesos a la infraestructura te pertenecen desde el primer día.',
        },
        {
          q: '¿Cómo garantizáis la calidad del trabajo?',
          a: 'Con revisiones de código, pruebas automatizadas en las partes críticas, entornos de prueba para que valides cada entrega y métricas objetivas de rendimiento, accesibilidad y SEO.',
        },
      ],
    },
  ],
  en: [
    {
      title: 'About the studio',
      items: [
        {
          q: 'What is Filipo Studio?',
          a: 'Filipo Studio is a technology studio specialised in custom software development, SEO for Google and AI search engines, and web performance optimization.',
        },
        {
          q: 'What kind of companies do you work with?',
          a: 'We work with small and medium businesses, startups and established companies that need their own digital product, better search visibility or a faster website.',
        },
        {
          q: 'Do you work with clients outside Spain?',
          a: 'Yes. We work remotely with clients in Spain, Europe, Latin America and the United States, in English and Spanish.',
        },
      ],
    },
    {
      title: 'Projects and pricing',
      items: [
        {
          q: 'How does a project with you start?',
          a: 'With a free first call where you tell us about your situation and goals. We then send a proposal with scope, phases, timeline and budget.',
        },
        {
          q: 'How is pricing calculated?',
          a: 'We prepare fixed-price quotes per phase based on the agreed scope. For ongoing work such as SEO or maintenance we offer monthly plans.',
        },
        {
          q: 'How quickly do you reply to enquiries?',
          a: 'We reply to every contact request within one business day.',
        },
      ],
    },
    {
      title: 'Quality and ownership',
      items: [
        {
          q: 'Who owns the code and content you create?',
          a: 'You do. Source code, documentation, content and infrastructure access belong to the client from day one.',
        },
        {
          q: 'How do you ensure quality?',
          a: 'Through code review, automated tests on critical paths, staging environments where you validate every delivery, and objective performance, accessibility and SEO metrics.',
        },
      ],
    },
  ],
};
