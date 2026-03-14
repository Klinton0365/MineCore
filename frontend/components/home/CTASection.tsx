import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-accent-blue to-blue-700">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white">Ready to Get a Quote?</h2>
        <p className="text-blue-100 mt-4 text-lg">
          Add products to your enquiry cart and our team will respond within 24 hours with pricing and availability.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/products" className="bg-white text-accent-blue px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Browse Products
          </Link>
          <Link href="/enquiry" className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
            View Enquiry Cart
          </Link>
        </div>
      </div>
    </section>
  );
}
