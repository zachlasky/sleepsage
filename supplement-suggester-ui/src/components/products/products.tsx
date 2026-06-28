'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useMemo } from 'react';

import { Pagination } from '@/components/pagination/pagination';
import { getProducts } from '@/server-actions/products-supplements';
import { Filters } from './filters';
import { Product } from './product';

import type { TProduct } from '@/types';

type TProductsProps = {
  productData: TProduct[];
  filterData: string[];
};

const PRODUCT_COUNT = 8;

const Products = ({ productData, filterData }: TProductsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const firstRenderRef = useRef(true);

  const [products, setProducts] = useState<TProduct[]>(productData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const categories = useMemo(() => searchParams.getAll('category'), [searchParams]);

  const updateCurrentPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const updateCategories = (categories: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    // Remove existing categories
    params.delete('category');
    // Add new categories
    categories.forEach((c) => {
      params.append('category', c);
    });
    // Update URL
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    const updateProducts = async () => {
      setIsLoading(true);

      const { data, error } = await getProducts({
        category: categories
      });

      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      setProducts(data || []);
      setIsLoading(false);
    };

    updateProducts();
  }, [categories]);

  const getPaginatedResults = () => {
    const start = (currentPage - 1) * PRODUCT_COUNT;
    const end = start + PRODUCT_COUNT;

    return products.slice(start, end);
  };

  return (
    <div className="grid px-2 lg:px-[36px] py-4 lg:py-10">
      <div>
        <Filters data={filterData} categories={categories} onCategoryChange={updateCategories} />

        {products.length === 0 ? (
          <div className="grid gap-8 justify-items-center px-10 py-8">
            <h2 className="text-center text-2xl pb-8">
              We couldn&apos;t find any products that match your criteria. Please try adjusting your
              filters.
            </h2>
            <Image src="/search.svg" alt="Register" width={500} height={500} />
          </div>
        ) : (
          <div className="grid gap-4">
            <h2 className="text-center text-2xl">
              BROWSE <span className="font-extrabold">{products.length}</span>{' '}
              {products.length > 1 ? 'PRODUCTS' : 'PRODUCT'}
            </h2>
            <p className="text-center pb-8">Products to help you on your sleep journey.</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        {getPaginatedResults().map((s) => {
          return <Product key={s.Id} data={s} isLoading={isLoading} />;
        })}
      </div>

      {products.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          itemCount={products.length}
          itemsPerPage={PRODUCT_COUNT}
          updateCurrentPage={updateCurrentPage}
        />
      )}
    </div>
  );
};

export { Products };
