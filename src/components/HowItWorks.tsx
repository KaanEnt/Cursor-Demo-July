import { howItWorks } from '../design-system/tokens';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 overflow-hidden py-24">
      <div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16">
        <div className="relative min-h-[18rem] overflow-hidden rounded-xl lg:min-h-[28rem]">
          <img
            src="/images/how.png"
            alt="Desk scene with charts used in sales research"
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/25 via-transparent to-transparent"
          />
        </div>

        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {howItWorks.heading}
          </h2>
          <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-muted">
            {howItWorks.body}
          </p>

          <ol className="mt-10 divide-y divide-border border-t border-border">
            {howItWorks.steps.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 py-5 transition-colors hover:bg-primary-faint/40"
              >
                <span className="font-display text-2xl font-bold tabular-nums text-primary">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 max-w-[42ch] text-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
