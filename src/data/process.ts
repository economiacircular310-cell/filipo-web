import type { Locale } from '../i18n/routes';

export interface ProcessStep {
  title: string;
  text: string;
  detail: string;
  output: string;
}

export const processSteps: Record<Locale, ProcessStep[]> = {
  es: [
    {
      title: 'Descubrimiento',
      text: 'Una primera reunión gratuita para entender tu negocio, tus usuarios y tus objetivos.',
      detail:
        'Analizamos la situación actual, revisamos lo que ya tienes (web, herramientas, datos) y detectamos las oportunidades con más impacto. Sales de esta fase con un diagnóstico claro, aunque decidas no seguir con nosotros.',
      output: 'Diagnóstico y objetivos medibles',
    },
    {
      title: 'Propuesta',
      text: 'Alcance, fases, plazos y presupuesto cerrado, por escrito y sin sorpresas.',
      detail:
        'Convertimos los objetivos en un plan por fases con entregables concretos. Cada fase tiene un precio cerrado y criterios de aceptación, de modo que sabes en todo momento qué vas a recibir.',
      output: 'Propuesta con alcance y presupuesto',
    },
    {
      title: 'Ejecución',
      text: 'Ciclos cortos con demos y entornos de prueba para que valides cada avance.',
      detail:
        'Trabajamos en sprints de una a dos semanas. Al final de cada ciclo te enseñamos el avance real en un entorno de pruebas, recogemos tu feedback y ajustamos prioridades. La calidad (pruebas, accesibilidad, SEO técnico, rendimiento) forma parte de cada entrega.',
      output: 'Entregas funcionales cada 1–2 semanas',
    },
    {
      title: 'Lanzamiento y mejora',
      text: 'Publicamos, medimos y seguimos mejorando con datos reales.',
      detail:
        'Lanzamos con monitorización, analítica y Search Console configurados. Después revisamos métricas contigo y proponemos mejoras continuas: nuevas funcionalidades, contenidos u optimizaciones.',
      output: 'Producto en producción y plan de evolución',
    },
  ],
  en: [
    {
      title: 'Discovery',
      text: 'A free first call to understand your business, your users and your goals.',
      detail:
        "We analyse your current situation, review what you already have (website, tools, data) and find the highest-impact opportunities. You leave this phase with a clear diagnosis, even if you decide not to continue with us.",
      output: 'Diagnosis and measurable goals',
    },
    {
      title: 'Proposal',
      text: 'Scope, phases, timeline and a fixed budget, in writing and with no surprises.',
      detail:
        'We turn goals into a phased plan with concrete deliverables. Each phase has a fixed price and acceptance criteria, so you always know what you will receive.',
      output: 'Proposal with scope and budget',
    },
    {
      title: 'Execution',
      text: 'Short cycles with demos and staging environments so you validate every step.',
      detail:
        'We work in one-to-two-week sprints. At the end of each cycle we show you real progress in a staging environment, collect your feedback and adjust priorities. Quality — testing, accessibility, technical SEO, performance — is part of every delivery.',
      output: 'Working deliveries every 1–2 weeks',
    },
    {
      title: 'Launch & improve',
      text: 'We go live, measure and keep improving with real data.',
      detail:
        'We launch with monitoring, analytics and Search Console set up. Afterwards we review metrics with you and propose continuous improvements: new features, content or optimizations.',
      output: 'Live product and evolution plan',
    },
  ],
};
