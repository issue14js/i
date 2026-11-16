import { ANKIT_PROFILE, PROJECTS } from '../data/ankitData.js';

export const ROUTE_SEO = {
  home: {
    path: '/',
    title: 'Ankit Kumar – MERN Stack Developer & Ops Specialist',
    description:
      'Hire Ankit Kumar, a MERN Stack Developer & Customer Operations Specialist in Darbhanga, India. Explore Vanguard CRM, Groq AI tools, and 3+ years of service ops.',
  },
  work: {
    path: '/work',
    title: 'Selected Works & Case Studies | Ankit Kumar',
    description:
      'Explore Vanguard CRM (React + Context API), Groq AI T&C Summarizer, Kinetic 2D GSAP Lab, and 3+ years of operations command built by Ankit Kumar.',
  },
  playground: {
    path: '/playground',
    title: '2D Physics & GSAP Motion Lab | Ankit Kumar',
    description:
      'Interactive 2D physics experiments, GSAP ScrollTrigger choreography, Groq UI cards, and operations interface studies by Ankit Kumar.',
  },
  about: {
    path: '/about',
    title: 'About, Experience & Credentials | Ankit Kumar',
    description:
      'Timeline of Ankit Kumar: Customer Care Officer at Galaxy Service (Daikin & Hitachi), 3 years at Ugana Medico, InCodec MERN Intern, and Sheryians DSA.',
  },
  contact: {
    path: '/contact',
    title: 'Contact & Hire Ankit Kumar | MERN & Operations',
    description:
      'Contact Ankit Kumar for Full-Time MERN Stack Developer, Frontend, or Customer Operations roles. Open to remote and relocation from Darbhanga, Bihar.',
  },
};

function upsertMeta(selector, attrs) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    document.head.appendChild(tag);
  }
  Object.entries(attrs).forEach(([k, v]) => tag.setAttribute(k, v));
}

function upsertLink(rel, href) {
  let link = document.head.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export function applyRouteSeo(page) {
  const meta = ROUTE_SEO[page] || ROUTE_SEO.home;
  const origin = window.location.origin;
  const canonicalUrl = `${origin}${meta.path}`;

  document.title = meta.title;
  upsertMeta('meta[name="description"]', { name: 'description', content: meta.description });
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: meta.title });
  upsertMeta('meta[property="og:description"]', {
    property: 'og:description',
    content: meta.description,
  });
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: meta.title });
  upsertMeta('meta[name="twitter:description"]', {
    name: 'twitter:description',
    content: meta.description,
  });
  upsertLink('canonical', canonicalUrl);

  // Inject dynamic route-level JSON-LD for Google & AI crawlers
  const scriptId = 'dynamic-route-jsonld';
  let jsonLdScript = document.getElementById(scriptId);
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.id = scriptId;
    jsonLdScript.type = 'application/ld+json';
    document.head.appendChild(jsonLdScript);
  }

  const routeSchema = {
    '@context': 'https://schema.org',
    '@type': page === 'about' ? 'ProfilePage' : 'WebPage',
    name: meta.title,
    description: meta.description,
    url: canonicalUrl,
    inLanguage: 'en-IN',
    mainEntity: {
      '@type': 'Person',
      name: ANKIT_PROFILE.fullName,
      email: ANKIT_PROFILE.email,
      telephone: ANKIT_PROFILE.phone,
      url: origin,
    },
    ...(page === 'work'
      ? {
          hasPart: PROJECTS.map((p) => ({
            '@type': 'CreativeWork',
            name: p.title,
            description: p.story,
            keywords: p.stack.join(', '),
          })),
        }
      : {}),
  };

  jsonLdScript.textContent = JSON.stringify(routeSchema);
}
