import { waitlistCopy } from '../design-system/tokens';
import { WaitlistForm } from './WaitlistForm';

export function Waitlist() {
  return (
    <section id="waitlist" className="scroll-mt-16 px-4 py-24">
      <div className="container mx-auto max-w-xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {waitlistCopy.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-[42ch] text-lg leading-relaxed text-muted">
          {waitlistCopy.body}
        </p>
        <div className="mx-auto mt-10 max-w-md text-left">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
