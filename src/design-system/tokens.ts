// Content and copy knobs, co-located with the visual tokens in tokens.css.
// Edit here to change what the page says; edit tokens.css to change how it looks.

export const brand = {
  name: 'PowerSell',
  tagline: 'AI Sales Enablement',
  footerLine: 'AI-powered sales enablement',
} as const;

export const hero = {
  headlineLead: 'Supercharge Your ',
  headlineAccent: 'Sales Process',
  headlineTail: ' With AI',
  body: 'PowerSell helps sales teams create personalized outreach, identify prospect pain points, and match product features to customer needs - all powered by AI.',
  cta: 'Join the Waitlist',
  ctaNote: 'Early access rolls out from the waitlist in small batches.',
} as const;

export interface Agent {
  name: string;
  action: string;
  output: string;
}

// The four agents behind the product, shown as a live pipeline in the hero.
export const agents: Agent[] = [
  {
    name: 'Company Profiler',
    action: 'Researching prospect',
    output: 'Acme Robotics — Series B, 140 people, expanding EU operations',
  },
  {
    name: 'Pain Point Analyzer',
    action: 'Reading buying signals',
    output: 'Lead handoff between SDRs and AEs is slowing deals down',
  },
  {
    name: 'Product Matcher',
    action: 'Mapping your catalog',
    output: 'Workflow Automation Suite fits the handoff bottleneck',
  },
  {
    name: 'Outreach Generator',
    action: 'Drafting outreach',
    output: 'Personalized email ready for your review',
  },
];

export interface Step {
  title: string;
  description: string;
}

export const howItWorks: { heading: string; steps: Step[] } = {
  heading: 'How PowerSell Works',
  steps: [
    {
      title: 'Research & Analysis',
      description:
        'Our AI performs comprehensive research on your prospect company and identifies key pain points.',
    },
    {
      title: 'Product Matching',
      description:
        'We match your products to the specific needs and challenges of your prospect.',
    },
    {
      title: 'Personalized Outreach',
      description:
        "Generate personalized outreach content that speaks directly to your prospect's needs.",
    },
  ],
};

export const waitlistCopy = {
  heading: 'Join the Waitlist',
  body: 'Be first in line when PowerSell opens up. Drop your email and we will reach out.',
  placeholder: 'you@company.com',
  button: 'Join Waitlist',
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
        'Sales teams and founders who want to spend less time on manual research and more time talking to well-qualified prospects.',
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
