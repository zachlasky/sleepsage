import { Button } from 'flowbite-react';
import Image from 'next/image';
import { useState } from 'react';

import { Register } from '@/components/register/register';

const Auth = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (isSubmitted) {
    return (
      <>
        <div className="grid gap-8 content-evenly justify-items-center bg-gradient-to-r from-default-gray to-black">
          <p className="text-2xl text-default-purple">Check your email for a login link!</p>

          <div className="grid justify-center">
            <Image src="/email.svg" alt="Email" width={500} height={500} />
          </div>
        </div>
        <div className="flex justify-center bg-gradient-to-r from-default-gray to-black">
          <Button
            onClick={() => {}}
            color="purple"
            className="w-1/2 text font-semibold bg-darkest-purple text-lightest-purple"
            type="submit">
            Done
          </Button>
        </div>
      </>
    );
  }

  return (
    <div className="grid justify-center">
      <span className="text-lightest-purple">
        Create a <span className="font-bold">FREE </span> Account
      </span>
      <div className="border-2 border-default-blue rounded-lg p-4 mt-4">
        <Register />
      </div>

      <div className="relative flex items-center py-8 lg:py-16">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="mx-4 flex-shrink text-gray-400">OR</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <span className="text-lightest-purple font-bold">Log In</span>
      <div className="border-2 border-default-blue rounded-lg p-4 mt-4">
        <Register /> {/* todo: replace with login component */}
      </div>
    </div>
  );
};

export { Auth };
