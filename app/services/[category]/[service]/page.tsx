import { getServiceBySlug, getAllServices, getServicePageContent } from '@/lib/data/services';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/services';

interface Props {
  params: Promise<{
    category: string;
    service: string;
  }>;
}

export default async function ServicePage({ params }: Props) {
  const { category, service: serviceSlug } = await params;
  const service = getServiceBySlug(category, serviceSlug);

  if (!service) {
    notFound();
  }

  // Check if we have detailed page content for this service
  const pageContent = getServicePageContent(serviceSlug);

  // If we have detailed content, render the full template
  if (pageContent) {
    return <ServicePageTemplate service={service} content={pageContent} />;
  }

  // Otherwise, render placeholder page
  return (
    <main className="min-h-screen bg-[#F0F1FA] flex flex-col">
      {/* Simple placeholder header */}
      <div className="w-full px-6 py-6 lg:px-20 lg:py-8">
        <Link 
          href="/services" 
          className="inline-flex items-center gap-2 text-sm font-AeonikMedium text-[#666] hover:text-[#2B2E3A] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Services
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-20">
        <div className="text-center max-w-2xl">
          <span className="inline-block px-4 py-2 rounded-full bg-[#E4E6EF] text-xs font-AeonikMedium uppercase tracking-wider text-[#666] mb-6">
            {service.categoryLabel}
          </span>
          <h1 className="font-Aeonik text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] mb-6">
            {service.name}
          </h1>
          <p className="font-Aeonik text-[clamp(1rem,2vw,1.25rem)] text-[#666] mb-8">
            {service.description}
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-[#2B2E3A] text-white font-AeonikMedium text-sm">
            <span className="w-2 h-2 rounded-full bg-[rgb(242,48,132)] animate-pulse" />
            Page coming soon
          </div>
        </div>
      </div>

      {/* Footer placeholder */}
      <div className="w-full px-6 py-8 lg:px-20 text-center">
        <p className="text-sm text-[#999] font-Aeonik">
          Interested in {service.name.toLowerCase()}?{' '}
          <Link href="/#contact" className="text-[#2B2E3A] underline hover:text-[rgb(242,48,132)] transition-colors">
            Get in touch
          </Link>
        </p>
      </div>
    </main>
  );
}

// Generate all valid paths at build time
export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    category: service.category,
    service: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, service: serviceSlug } = await params;
  const service = getServiceBySlug(category, serviceSlug);

  if (!service) {
    return {
      title: 'Service Not Found | Appify',
    };
  }

  return {
    title: `${service.name} | Appify`,
    description: service.description,
    openGraph: {
      title: `${service.name} | Appify`,
      description: service.description,
    },
  };
}
