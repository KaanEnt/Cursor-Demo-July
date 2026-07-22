import { waitlistCopy } from '../design-system/tokens';
import { WaitlistForm } from './WaitlistForm';

export function Waitlist() {
  return (
    <section id="waitlist" className="scroll-mt-16 px-4 py-24">
      <div className="container mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-lg border border-border bg-surface px-6 py-12 text-center shadow-sm sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary-faint"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-primary-soft"
          />
          <div className="relative">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
              {waitlistCopy.heading}
            </h2>
            <p className="mx-auto mb-8 max-w-md text-lg text-muted">{waitlistCopy.body}</p>
            <div className="mx-auto max-w-md text-left">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
