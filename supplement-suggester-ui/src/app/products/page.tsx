import { Error as ErrorComponent } from '@/components/error';
import { Products } from '@/components/products/products';
import { getProductsQueryString } from '@/utils/query';

type TPageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

export default async function Page({ searchParams }: TPageProps) {
  const params = await searchParams;
  const queryString = getProductsQueryString(params);

  try {
    const initObject = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const [productsResponse, filterDataResponse] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_SUGGESTER_SERVICE_API_URL}/products${queryString}`,
        initObject
      ),
      fetch(`${process.env.NEXT_PUBLIC_SUGGESTER_SERVICE_API_URL}/product-categories`, initObject)
    ]);

    if (!productsResponse.ok || !filterDataResponse.ok) {
      throw new Error(`Failed to fetch product data: ${productsResponse.status}`);
    }

    const productData = await productsResponse.json();
    const filterData = await filterDataResponse.json();

    return <Products productData={productData} filterData={filterData} />;
  } catch (error) {
    if (error instanceof Error) {
      return <ErrorComponent message={error.message} />;
    } else {
      return <ErrorComponent message="An unknown error occurred" />;
    }
  }
}
