import { HR } from 'flowbite-react';
import Image from 'next/image';

import { Card } from './card';

const BlogSection = () => {
  return (
    <div className="grid justify-items-center text-center">
      <h3 className="text-4xl">
        The experts you want, finding the answers you need
      </h3>

      <HR.Trimmed />

      <p className="text-center text-lg">
        At Novant Health, we provide the resources, guidance and expertise you need to improve your
        heart health. Our care team will work with you to develop custom plans for strengthening
        your heart and reducing your risk. If you believe you are at risk for heart disease, take
        the first step and ask your primary care provider for a referral to a heart specialist.
      </p>

      <div className="flex flex-wrap justify-center gap-10 pt-10">
        <Card isSmall>
          <div className="justify-items-center grid gap-5">
            <Image height="100" width="100" src="/sleep.svg" alt="Sleep" />
            <p className="text-light-purple">Find a Primary Care Provider</p>
          </div>
        </Card>
        <Card isSmall>
          <div className="justify-items-center grid gap-5">
            <Image height="100" width="100" src="/nature.svg" alt="Nature" />
            <p className="text-light-purple">Three easy steps to Heart Health</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export { BlogSection };
