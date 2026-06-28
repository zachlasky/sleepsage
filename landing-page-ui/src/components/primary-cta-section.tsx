import { Button } from 'flowbite-react';
import Image from 'next/image';

import { Card } from './card';

const PrimaryCtaSection = () => {
  return (
    <div className="flex flex-wrap justify-center gap-y-10 md:gap-y-20 gap-x-20 md:gap-x-40 p-10 md:p-20">
      <Card>
        <h2 className="text-4xl font-bold tracking-tight text-light-purple">
          Are you at risk for heart disease? Take a quiz.
        </h2>

        <p className="font-normal">
          Listen to your heart and see if you are at risk for heart disease. It only takes 5 minutes
          to answer a few questions and live a healthier life.
        </p>

        <Button color="purple" className="font-semibold bg-default-purple text-white">
          Start the Quiz
        </Button>
      </Card>

      <Image src="/bed.svg" alt="Bed" width="300" height="300" />
    </div>
  );
};

export { PrimaryCtaSection };
