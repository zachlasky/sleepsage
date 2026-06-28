'use client';

import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';

import { Product } from '@/components/products/product';
import { Supplement } from '@/components/supplements/supplement';

import type { TResult } from '@/types';

type TResultsProps = {
  data: TResult;
};

const Results = ({ data }: TResultsProps) => {
  const router = useRouter();

  return (
    <div className="grid gap-20 px-2 lg:px-[36px] py-4 lg:py-10">
      {data.Supplements.length > 0 && (
        <div className="grid gap-6">
          <div className="grid gap-4 pb-8">
            <h2 className="text-center text-2xl font-semibold">
              Here are your recommended sleep supplements.
            </h2>
            <p className="text-center px-2">Try one out!</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {data.Supplements.map((s) => {
              return <Supplement key={s.Id} data={s} />;
            })}
          </div>

          <Button
            className="font-semibold w-72 justify-self-center"
            onClick={() => router.push('/supplements')}
            color="gray">
            BROWSE MORE SLEEP SUPPLEMENTS
          </Button>
        </div>
      )}

      <div className="grid gap-6">
        <div className="grid gap-4 pb-8">
          <h2 className="text-center text-2xl font-semibold">
            Here are your recommended sleep products.
          </h2>
          <p className="text-center px-2">Try one out!</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {data.Products.map((p) => {
            return <Product key={p.Id} data={p} />;
          })}
        </div>

        <Button
          className="font-semibold w-72 justify-self-center"
          onClick={() => router.push('/products')}
          color="gray">
          BROWSE MORE SLEEP PRODUCTS
        </Button>

        {data.Supplements.length === 0 && (
          <Button
            className="font-semibold w-72 justify-self-center"
            onClick={() => router.push('/supplements')}
            color="gray">
            BROWSE SLEEP SUPPLEMENTS
          </Button>
        )}
      </div>
    </div>
  );
};

export { Results };
