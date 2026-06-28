import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

import { BlogSection } from '@/components/blog-section';
import { PrimaryCtaSection } from '@/components/primary-cta-section';
import { SecondaryCtaSection } from '@/components/secondary-cta-section';
import { SupplementCarouselSection } from '@/components/supplement-carousel-section';
import { VideoSection } from '@/components/video-section';

export default async function Page() {
  return (
    <div className="grid justify-center gap-10 md:gap-14">
      <Header />

      <div className="w-[100vw]">
        <PrimaryCtaSection />
      </div>

      <div className="px-10 md:px-20">
        <BlogSection />
      </div>

      <div className="w-[100vw]">
        <SupplementCarouselSection />
      </div>

      <div className="px-10 md:px-20">
        <VideoSection />
      </div>

      <div className="w-[100vw]">
        <SecondaryCtaSection />
      </div>

      <Footer />
    </div>
  );
}
