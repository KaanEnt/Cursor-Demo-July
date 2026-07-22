import { brand, hero } from '../design-system/tokens';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <img
          src="/images/hero.png"
          alt=""
          className="animate-drift h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/90 to-canvas/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-canvas/50" />
      </div>

      <div className="container relative mx-auto flex min-h-[100dvh] max-w-6xl items-center px-4 pb-16 pt-24">
        <div className="max-w-xl space-y-6">
          <p className="animate-rise font-display text-5xl font-bold tracking-tighter text-foreground sm:text-6xl lg:text-7xl">
            {brand.name}
          </p>
          <h1
            className="animate-rise font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.1]"
            style={{ animationDelay: '0.08s' }}
          >
            {hero.headlineLead}
            <em className="not-italic font-bold text-primary">{hero.headlineAccent}</em>
            {hero.headlineTail}
          </h1>
          <p
            className="animate-rise max-w-[36ch] text-lg leading-relaxed text-muted sm:text-xl"
            style={{ animationDelay: '0.16s' }}
          >
            {hero.body}
          </p>
          <div
            className="animate-rise flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: '0.24s' }}
          >
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground shadow-[0_10px_30px_-12px_color-mix(in_srgb,var(--color-primary)_55%,transparent)] transition-all hover:-translate-y-0.5 hover:bg-primary-hover active:translate-y-px active:scale-[0.98]"
            >
              {hero.cta}
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-border bg-surface/70 px-6 py-3 text-base font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary hover:text-primary active:scale-[0.98]"
            >
              {hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
