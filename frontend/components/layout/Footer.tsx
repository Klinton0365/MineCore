import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[var(--color-primary-light)] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-white mb-4">
              ALKEBULAN <span className="text-[var(--color-accent-blue)]">MINING</span>
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Underground & Surface Mining Services. Providing world-class mining equipment and solutions across India, UAE, and the United Kingdom.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/products', label: 'Products' },
                { href: '/enquiry', label: 'Enquiry' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>Tech Park, Whitefield</li>
              <li>Bangalore, India</li>
              <li className="pt-2">
                <a href="mailto:info@alkebulanmining.com" className="hover:text-[var(--color-accent-blue)] transition-colors">
                  info@alkebulanmining.com
                </a>
              </li>
              <li>
                <a href="tel:+918012345678" className="hover:text-[var(--color-accent-blue)] transition-colors">
                  +91 80 1234 5678
                </a>
              </li>
            </ul>
          </div>

          {/* Global Presence */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Global Presence</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--color-success)] rounded-full"></span>
                Bangalore, India (HQ)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--color-warning)] rounded-full"></span>
                Dubai, UAE
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--color-accent-blue)] rounded-full"></span>
                London, United Kingdom
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} Alkebulan Underground & Surface Mining Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
