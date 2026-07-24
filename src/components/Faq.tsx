import { faq } from '../design-system/tokens';

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 bg-primary-band py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 className="mb-12 text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
          {faq.heading}
        </h2>
        <div className="space-y-4">
          {faq.items.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg border border-border bg-surface px-6 py-4 open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-foreground transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden
                  className="ml-4 text-primary transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pt-3 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
