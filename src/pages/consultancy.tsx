import { StrictMode, useState, type FormEvent } from 'react';
import { createRoot } from 'react-dom/client';
import { agents, brand, faq, howItWorks, waitlistCopy } from '../design-system/tokens';
import { submitWaitlist } from '../lib/waitlist';
import '../index.css';

const copy = {
  headline: 'Sales research, briefed like a firm',
  body: 'PowerSell profiles the account, maps pain to your catalog, and hands your team outreach ready for review.',
  cta: 'Join Waitlist',
  method: 'The method',
  close: 'Request early access',
} as const;

function ConsultancyNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/consultancy" className="font-display text-lg font-semibold tracking-tight text-white">
          {brand.name}
        </a>
        <nav className="flex items-center gap-6 text-sm text-white/80">
          <a href="#method" className="transition-colors hover:text-white">
            Method
          </a>
          <a href="#waitlist" className="transition-colors hover:text-white">
            Waitlist
          </a>
          <a
            href="#waitlist"
            className="hidden bg-white px-4 py-2 font-medium text-foreground transition-transform hover:scale-[0.98] active:scale-[0.96] sm:inline-flex"
          >
            {copy.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}

function HeroBriefPlane() {
  // Full-bleed product plane: live account brief spanning the hero edge-to-edge.
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] lg:block"
    >
      <div className="absolute inset-0 bg-gradient-to-l from-black/35 via-black/10 to-transparent" />
      <div className="absolute inset-y-16 right-0 left-8 border-l border-white/15 bg-white/[0.04] p-8 xl:p-12">
        <div className="flex items-center justify-between border-b border-white/15 pb-4 font-mono text-xs uppercase tracking-[0.18em] text-white/45">
          <span>Account brief</span>
          <span>04 / 04</span>
        </div>
        <ul className="mt-8 space-y-6 font-mono text-xs text-white/70">
          {agents.map((agent, index) => (
            <li key={agent.name} className="animate-rise" style={{ animationDelay: `${0.25 + index * 0.1}s` }}>
              <div className="flex gap-4">
                <span className="text-white/35">0{index + 1}</span>
                <div>
                  <p className="font-sans text-base font-semibold text-white">{agent.name}</p>
                  <p className="mt-1 uppercase tracking-wider text-white/40">{agent.action}</p>
                  <p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-white/65">
                    {agent.output}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ConsultancyHero() {
  return (
    <section className="relative min-h-dvh overflow-hidden bg-inverse text-inverse-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_15%,#3a6f8f55,transparent_50%),linear-gradient(155deg,#0e1a2b_0%,#17304a_42%,#0e1a2b_100%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>
      <HeroBriefPlane />

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-6xl items-center px-4 pb-16 pt-28 sm:px-6 lg:pb-20">
        <div className="max-w-xl space-y-6 lg:max-w-[28rem]">
          <p className="animate-rise font-display text-5xl font-bold tracking-tighter text-white sm:text-6xl md:text-7xl">
            {brand.name}
          </p>
          <h1
            className="animate-rise font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            style={{ animationDelay: '0.08s' }}
          >
            {copy.headline}
          </h1>
          <p
            className="animate-rise max-w-[36ch] text-base leading-relaxed text-white/75 sm:text-lg"
            style={{ animationDelay: '0.16s' }}
          >
            {copy.body}
          </p>
          <div className="animate-rise flex flex-wrap items-center gap-4" style={{ animationDelay: '0.24s' }}>
            <a
              href="#waitlist"
              className="inline-flex bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-hover active:scale-[0.98]"
            >
              {copy.cta}
            </a>
            <a
              href="#method"
              className="text-sm font-medium text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              See the method
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MethodSection() {
  return (
    <section id="method" className="border-t border-border bg-canvas px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{copy.method}</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {howItWorks.heading}
        </h2>
        <ol className="mt-14 space-y-0 divide-y divide-border border-y border-border">
          {howItWorks.steps.map((step, index) => (
            <li
              key={step.title}
              className="grid gap-4 py-8 md:grid-cols-[8rem_minmax(0,16rem)_1fr] md:items-start md:gap-10"
            >
              <span className="font-mono text-sm text-primary">0{index + 1}</span>
              <h3 className="font-display text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="max-w-[52ch] text-base leading-relaxed text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="border-t border-border bg-surface px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">{faq.heading}</h2>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {faq.items.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="cursor-pointer list-none font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.question}
                  <span className="font-mono text-muted transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function WaitlistSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    { kind: 'idle' } | { kind: 'success' } | { kind: 'error'; message: string }
  >({ kind: 'idle' });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const result = submitWaitlist(email);
    if (result.ok) {
      setStatus({ kind: 'success' });
      setEmail('');
    } else {
      setStatus({
        kind: 'error',
        message:
          result.reason === 'duplicate' ? waitlistCopy.duplicateEmail : waitlistCopy.invalidEmail,
      });
    }
  };

  return (
    <section id="waitlist" className="border-t border-border bg-canvas px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {copy.close}
          </h2>
          <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-muted">{waitlistCopy.body}</p>
        </div>
        <div>
          {status.kind === 'success' ? (
            <p className="animate-rise border border-border bg-surface px-4 py-3 font-medium text-primary">
              {waitlistCopy.success}
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-2">
              <label htmlFor="consultancy-email" className="block text-sm font-medium text-foreground">
                Work email
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="consultancy-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status.kind === 'error') setStatus({ kind: 'idle' });
                  }}
                  placeholder={waitlistCopy.placeholder}
                  className="flex-1 border border-border bg-surface px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-hover active:scale-[0.98]"
                >
                  {copy.cta}
                </button>
              </div>
              {status.kind === 'error' && (
                <p role="alert" className="text-sm text-red-700">
                  {status.message}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function ConsultancyFooter() {
  return (
    <footer className="bg-inverse px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-lg font-semibold text-white">{brand.name}</p>
        <p className="text-sm text-inverse-foreground">
          {brand.footerLine} · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

function ConsultancyPage() {
  return (
    <div className="min-h-dvh bg-canvas font-sans text-foreground antialiased">
      <ConsultancyNav />
      <main>
        <ConsultancyHero />
        <MethodSection />
        <FaqSection />
        <WaitlistSection />
      </main>
      <ConsultancyFooter />
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConsultancyPage />
  </StrictMode>,
);
