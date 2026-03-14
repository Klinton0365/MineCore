import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Alkebulan Mining',
  description: 'Learn about Alkebulan Underground & Surface Mining Services - our vision, mission, and global operations.',
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">About <span className="text-[var(--color-accent-blue)]">Alkebulan Mining</span></h1>
          <p className="text-[var(--color-text-muted)] mt-4 max-w-2xl text-lg">
            Alkebulan Underground & Surface Mining Services is a global provider of premium mining equipment, tools, and safety solutions.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-[var(--color-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[var(--color-primary-light)] border border-white/10 rounded-xl p-8">
              <div className="w-12 h-12 bg-[var(--color-accent-blue)]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[var(--color-accent-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                To be the world's most trusted and accessible supplier of mining equipment, enabling operations of all sizes to access premium tools and technology through innovative digital solutions.
              </p>
            </div>
            <div className="bg-[var(--color-primary-light)] border border-white/10 rounded-xl p-8">
              <div className="w-12 h-12 bg-[var(--color-accent-gold)]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[var(--color-accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                To deliver real-time inventory visibility, automated procurement workflows, and seamless customer experiences across our global branches — eliminating barriers between mining operations and the equipment they need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="py-16 bg-[var(--color-primary-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-12">Our Global Branches</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Bangalore, India', code: 'IN-BLR', role: 'Main Warehouse & HQ', desc: 'Our primary distribution center and headquarters, serving the Indian subcontinent with comprehensive stock of underground and surface mining equipment.' },
              { name: 'Dubai, UAE', code: 'AE-DXB', role: 'Middle East Hub', desc: 'Strategic hub serving the Gulf Cooperation Council region, providing rapid access to mining equipment for operations across the Middle East and North Africa.' },
              { name: 'London, UK', code: 'GB-LDN', role: 'European Center', desc: 'Our European operations center, supporting mining projects across the United Kingdom and continental Europe with enquiry-based procurement services.' },
            ].map(branch => (
              <div key={branch.code} className="bg-[var(--color-secondary)] border border-white/10 rounded-xl p-6">
                <span className="text-xs px-2 py-1 rounded bg-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)] border border-[var(--color-accent-blue)]/30 font-mono">
                  {branch.code}
                </span>
                <h3 className="text-lg font-semibold text-white mt-3">{branch.name}</h3>
                <p className="text-sm text-[var(--color-accent-gold)] mt-1">{branch.role}</p>
                <p className="text-sm text-[var(--color-text-muted)] mt-3 leading-relaxed">{branch.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications / Infrastructure */}
      <section className="py-16 bg-[var(--color-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-12">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Real-Time Stock', desc: 'Live inventory tracking across all branches with API integration.' },
              { title: 'Global Delivery', desc: 'Shipping and logistics support from Bangalore, Dubai, and London.' },
              { title: 'Expert Support', desc: '24/7 technical assistance and product consultation from mining specialists.' },
              { title: 'Quality Assured', desc: 'ISO certified equipment from world-class manufacturers like Caterpillar and Sandvik.' },
            ].map(item => (
              <div key={item.title} className="text-center p-6">
                <div className="w-12 h-12 bg-[var(--color-accent-gold)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[var(--color-accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
