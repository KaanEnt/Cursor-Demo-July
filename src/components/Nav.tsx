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
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a
          href={homeHref}
          className="text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          {brand.name}
        </a>
        <nav className="flex items-center gap-5 sm:gap-7">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary sm:text-base"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
