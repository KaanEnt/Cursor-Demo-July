import { brand } from '../design-system/tokens';

// Path-prefixed so section links stay on the current MPA page (e.g. /dark).
function pageBase(): string {
  const path = window.location.pathname.replace(/\/$/, '');
  return path || '';
}

const sections = [
  { label: 'How it Works', hash: 'how-it-works' },
  { label: 'Waitlist', hash: 'waitlist' },
  { label: 'FAQ', hash: 'faq' },
];

export function Nav() {
  const base = pageBase();
  const homeHref = base || '/';
  const links = sections.map((section) => ({
    label: section.label,
    href: `${base}/#${section.hash}`,
  }));

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-baseline gap-3">
          <a
            href={homeHref}
            className="text-2xl font-bold text-foreground transition-colors hover:text-primary"
          >
            {brand.name}
          </a>
          <span className="hidden text-sm text-primary sm:inline">{brand.tagline}</span>
        </div>
        <nav className="flex items-center gap-4 sm:gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary sm:text-base"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
