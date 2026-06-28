import { Error as ErrorComponent } from '@/components/error';
import { Supplements } from '@/components/supplements/supplements';
import { getSupplementsQueryString } from '@/utils/query';

type TPageProps = {
  searchParams: Promise<{
    interaction?: string | string[];
    risk?: string | string[];
    symptom?: string | string[];
  }>;
};

export default async function Page({ searchParams }: TPageProps) {
  const params = await searchParams;
  const queryString = getSupplementsQueryString(params);

  try {
    const initObject = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const [supplementsResponse, filterDataResponse] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_SUGGESTER_SERVICE_API_URL}/supplements${queryString}`,
        initObject
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_SUGGESTER_SERVICE_API_URL}/interactions-risks-symptoms`,
        initObject
      )
    ]);

    if (!supplementsResponse.ok || !filterDataResponse.ok) {
      throw new Error(`Failed to fetch supplements data: ${supplementsResponse.status}`);
    }

    const supplementData = await supplementsResponse.json();
    const filterData = await filterDataResponse.json();

    return <Supplements supplementData={supplementData} filterData={filterData} />;
  } catch (error) {
    if (error instanceof Error) {
      return <ErrorComponent message={error.message} />;
    } else {
      return <ErrorComponent message="An unknown error occurred" />;
    }
  }
}
