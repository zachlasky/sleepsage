import { Button } from 'flowbite-react';
import Image from 'next/image';

import { Card } from './card';

const SecondaryCtaSection = () => {
  return (
    <div className="flex flex-wrap justify-center gap-y-10 md:gap-y-20 gap-x-20 md:gap-x-40 p-10 md:p-20">
      <Card>
        <h2 className="text-4xl font-bold tracking-tight text-light-purple">
          Understand your risk. Take a quiz.
        </h2>

        <p className="font-normal">
          These are only a few obvious symptoms for heart disease, many people don&apos;t realize
          they&apos;re at risk until they experience shortness of breath or chest discomfort. Now,
          you have an opportunity to evaluate your risk level and take action early for a
          heart-healthy future.
        </p>

        <Button color="purple" className="font-semibold bg-default-purple text-white">
          Start the Quiz
        </Button>
      </Card>

      <Image src="/quiz.svg" alt="Quiz" width="200" height="200" />
    </div>
  );
};

export { SecondaryCtaSection };
