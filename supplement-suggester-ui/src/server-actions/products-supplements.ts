import { getProductsQueryString, getSupplementsQueryString } from '@/utils/query';

import type {
  TGetProductsQueryString,
  TGetSupplementsQueryString,
  TProduct,
  TSupplement
} from '@/types';

type TGetSupplementsResponse = {
  error: string;
  data?: TSupplement[];
};

const getSupplements = async (
  params: TGetSupplementsQueryString
): Promise<TGetSupplementsResponse> => {
  const queryString = getSupplementsQueryString(params);
  const url = `${process.env.NEXT_PUBLIC_SUGGESTER_SERVICE_API_URL}/supplements${queryString}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return { error: `HTTP error! status: ${response.status}` };
    }

    return { error: '', data: await response.json() };
  } catch (error) {
    return { error: `Error fetching supplement results: ${error}` };
  }
};

type TGetProductsResponse = {
  error: string;
  data?: TProduct[];
};

const getProducts = async (params: TGetProductsQueryString): Promise<TGetProductsResponse> => {
  const queryString = getProductsQueryString(params);
  const url = `${process.env.NEXT_PUBLIC_SUGGESTER_SERVICE_API_URL}/products${queryString}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return { error: `HTTP error! status: ${response.status}` };
    }

    return { error: '', data: await response.json() };
  } catch (error) {
    return { error: `Error fetching product results: ${error}` };
  }
};

export { getProducts, getSupplements };
