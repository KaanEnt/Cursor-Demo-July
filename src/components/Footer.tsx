import { brand } from '../design-system/tokens';

export function Footer() {
  return (
    <footer className="bg-inverse py-10 text-inverse-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold tracking-tight">{brand.name}</p>
            <p className="text-sm opacity-70">{brand.footerLine}</p>
          </div>
          <p className="text-sm opacity-70">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
