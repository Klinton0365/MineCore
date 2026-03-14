import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative bg-primary-light">
      {/* Gradient top divider */}
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <span className="text-sm font-semibold tracking-[0.15em] text-white">MINECORE <span className="text-text-secondary font-normal">Global</span></span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              Global supplier of premium underground & surface mining equipment with real-time inventory across three continents.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.2em] mb-5">Navigate</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/products', label: 'Products' },
                { href: '/enquiry', label: 'Enquiry' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-2 text-sm text-text-muted hover:text-white transition-colors duration-300">
                    <span className="w-0 group-hover:w-3 h-[1px] bg-accent-blue transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.2em] mb-5">Contact</h4>
            <ul className="space-y-3 text-sm text-text-muted">
              <li>
                <a href="mailto:info@minecoreglobal.com" className="hover:text-white transition-colors duration-300">
                  info@minecoreglobal.com
                </a>
              </li>
              <li>
                <a href="tel:+918012345678" className="hover:text-white transition-colors duration-300">
                  +91 80 1234 5678
                </a>
              </li>
              <li className="pt-1 text-text-muted/70 leading-relaxed">
                Tech Park, Whitefield<br/>Bangalore, India
              </li>
            </ul>
          </div>

          {/* Presence */}
          <div>
            <h4 className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.2em] mb-5">Global Presence</h4>
            <ul className="space-y-3">
              {[
                { location: 'Bangalore, India', status: 'HQ', color: 'bg-success' },
                { location: 'Dubai, UAE', status: 'Hub', color: 'bg-accent-gold' },
                { location: 'London, UK', status: 'Office', color: 'bg-accent-blue' },
              ].map(item => (
                <li key={item.location} className="flex items-center gap-3 text-sm text-text-muted">
                  <span className={`w-1.5 h-1.5 rounded-full ${item.color} flex-shrink-0`} />
                  <span>{item.location}</span>
                  <span className="text-[10px] text-text-muted/50 uppercase tracking-wider">{item.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="section-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted/50">
            &copy; {new Date().getFullYear()} MineCore Global. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/admin/login" className="text-xs text-text-muted/30 hover:text-text-muted/60 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
