'use client';

import { Button } from 'flowbite-react';
import { useEffect } from 'react';

type TErrorProps = {
  message: string;
};

const Error = ({ message }: TErrorProps) => {
  useEffect(() => {
    console.error(message); // Log the error to an error reporting service
  }, [message]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-black">
      <h2>Something went wrong!</h2>
      <Button color="purple" type="button" onClick={() => window.location.reload()}>
        Try again
      </Button>
    </div>
  );
};

export { Error };
