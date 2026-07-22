import { brand } from '../design-system/tokens';

export function Footer() {
  return (
    <footer className="bg-foreground py-10 text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 text-center md:mb-0 md:text-left">
            <h2 className="text-2xl font-bold">{brand.name}</h2>
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
