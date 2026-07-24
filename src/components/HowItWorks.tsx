import { howItWorks } from '../design-system/tokens';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 bg-primary-band py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
          {howItWorks.heading}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {howItWorks.steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-lg bg-surface p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft">
                <span className="font-display text-xl font-bold text-primary">{index + 1}</span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">{step.title}</h3>
              <p className="text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
