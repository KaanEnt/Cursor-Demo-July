import { faq } from '../design-system/tokens';

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 bg-primary-band py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 className="mb-10 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {faq.heading}
        </h2>
        <div className="divide-y divide-border border-y border-border">
          {faq.items.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden
                  className="text-primary transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pt-3 max-w-[60ch] leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
