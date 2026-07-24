import { agents, brand, hero } from '../design-system/tokens';

function AgentPipeline() {
  return (
    <div className="relative">
      <div className="absolute -left-4 -top-4 h-28 w-28 rounded-full bg-primary-faint" aria-hidden />
      <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-primary-soft" aria-hidden />
      <div className="relative space-y-3">
        {agents.map((agent, index) => (
          <div
            key={agent.name}
            className="animate-rise flex gap-4 rounded-lg border border-border bg-surface p-4 shadow-sm transition-shadow hover:shadow-md"
            style={{ animationDelay: `${0.35 + index * 0.15}s`, marginLeft: `${index * 1}rem` }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft font-display text-lg font-bold text-primary">
              {index + 1}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-bold text-foreground">{agent.name}</span>
                <span className="text-xs font-medium uppercase tracking-wide text-primary">
                  {agent.action}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-muted">{agent.output}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-primary-band"
      />
      <div className="container relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.1fr_1fr]">
          <div className="min-w-0 space-y-6">
            <p className="animate-rise text-sm font-bold uppercase tracking-widest text-primary">
              {brand.name} · {brand.tagline}
            </p>
            <h1
              className="animate-rise font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl"
              style={{ animationDelay: '0.1s' }}
            >
              {hero.headlineLead}
              <em className="text-primary">{hero.headlineAccent}</em>
              {hero.headlineTail}
            </h1>
            <p className="animate-rise max-w-xl text-xl text-muted" style={{ animationDelay: '0.2s' }}>
              {hero.body}
            </p>
            <div
              className="animate-rise flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: '0.3s' }}
            >
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-primary px-8 py-3 text-lg font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md"
              >
                {hero.cta}
              </a>
              <span className="text-sm text-muted">{hero.ctaNote}</span>
            </div>
          </div>
          <div className="hidden min-w-0 md:block">
            <AgentPipeline />
          </div>
        </div>
      </div>
    </section>
  );
}
