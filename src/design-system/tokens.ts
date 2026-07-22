// Content and copy knobs, co-located with the visual tokens in tokens.css.
// Edit here to change what the page says; edit tokens.css to change how it looks.

export const brand = {
  name: 'PowerSell',
  tagline: 'AI Sales Enablement',
  footerLine: 'AI sales enablement',
} as const;

export const hero = {
  headlineLead: 'Close deals with ',
  headlineAccent: 'AI that researches',
  headlineTail: '',
  body: 'Prospect research, product matching, and personalized outreach in one pipeline.',
  cta: 'Join the Waitlist',
  ctaSecondary: 'See how it works',
} as const;

export interface Step {
  title: string;
  description: string;
}

export const howItWorks: { heading: string; body: string; steps: Step[] } = {
  heading: 'How PowerSell Works',
  body: 'Three focused steps take a cold prospect to a ready-to-send message.',
  steps: [
    {
      title: 'Research & Analysis',
      description:
        'AI researches the prospect company and surfaces the pain points that matter.',
    },
    {
      title: 'Product Matching',
      description:
        'Your catalog is mapped to those needs so every pitch stays relevant.',
    },
    {
      title: 'Personalized Outreach',
      description:
        'Draft outreach that speaks to the prospect in their own language.',
    },
  ],
};

export const waitlistCopy = {
  heading: 'Join the Waitlist',
  body: 'Be first when PowerSell opens. Leave your email and we will reach out.',
  placeholder: 'you@company.com',
  button: 'Join Waitlist',
  label: 'Work email',
  success: "You're on the list. We'll be in touch soon.",
  invalidEmail: 'Please enter a valid email address.',
  duplicateEmail: "You're already on the waitlist.",
} as const;

export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: { heading: string; items: FaqItem[] } = {
  heading: 'Frequently Asked Questions',
  items: [
    {
      question: 'What is PowerSell?',
      answer:
        'PowerSell is an AI sales enablement platform that researches your prospects, matches your products to their needs, and generates personalized outreach content.',
    },
    {
      question: 'Who is it for?',
      answer:
        'Sales teams and founders who want to spend less time on manual research and more time talking to qualified prospects.',
    },
    {
      question: 'How do the AI agents work?',
      answer:
        'Four agents work in sequence: the Company Profiler researches your prospect, the Pain Point Analyzer identifies their challenges, the Product Matcher maps your offering to those needs, and the Outreach Generator drafts personalized messaging.',
    },
    {
      question: 'When will I get access?',
      answer:
        'We are onboarding from the waitlist in small batches. Join now and we will email you when your spot opens up.',
    },
    {
      question: 'What happens to my data?',
      answer:
        'Your email is only used to contact you about PowerSell access. Prospect research uses publicly available information.',
    },
  ],
};
