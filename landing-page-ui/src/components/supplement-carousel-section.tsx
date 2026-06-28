import { Carousel } from 'flowbite-react';
import Image from 'next/image';

const SupplementCarouselSection = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row flex-wrap lg:flex-nowrap items-center justify-center gap-y-10 md:gap-y-20 gap-x-20 md:gap-x-40 p-10 md:p-20">
      <div className="flex w-full h-96">
        <Carousel pauseOnHover>
          <Image
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
            width="100"
            height="100"
          />
          <Image
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="..."
            width="100"
            height="100"
          />
          <Image
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="..."
            width="100"
            height="100"
          />
          <Image
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
            alt="..."
            width="100"
            height="100"
          />
          <Image
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
            alt="..."
            width="100"
            height="100"
          />
        </Carousel>
      </div>

      <div className="w-full text-center">
        <h3 className="text-4xl text-default-purple">
          Nationally Recognized Heart & Vascular Care
        </h3>
        <p className="text-center text-lgpt-5 md:pt-10">
          When it comes to your heart, you deserve the highest quality care. You and your family can
          take comfort in the fact that our heart and vascular care is among the best in the nation.
          Many of our facilities rank in the top 10 percent in the nation for treatment of heart
          attacks and our chest pain centers have the highest level of accreditation possible.
        </p>
      </div>
    </div>
  );
};

export { SupplementCarouselSection };
