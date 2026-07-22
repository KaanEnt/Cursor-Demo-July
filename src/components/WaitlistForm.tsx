import { useState, type FormEvent } from 'react';
import { waitlistCopy } from '../design-system/tokens';
import { submitWaitlist } from '../lib/waitlist';

type Status = { kind: 'idle' } | { kind: 'success' } | { kind: 'error'; message: string };

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

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

  if (status.kind === 'success') {
    return (
      <p className="animate-rise rounded-xl border border-border bg-surface px-4 py-3 font-medium text-primary">
        {waitlistCopy.success}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-2">
      <label htmlFor="waitlist-email" className="block text-sm font-medium text-foreground">
        {waitlistCopy.label}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="waitlist-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status.kind === 'error') setStatus({ kind: 'idle' });
          }}
          placeholder={waitlistCopy.placeholder}
          className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <button
          type="submit"
          className="whitespace-nowrap rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary-hover active:scale-[0.98]"
        >
          {waitlistCopy.button}
        </button>
      </div>
      {status.kind === 'error' && (
        <p role="alert" className="text-sm text-red-600">
          {status.message}
        </p>
      )}
    </form>
  );
}
