import { Error as ErrorComponent } from '@/components/error';
import { Results } from '@/components/results/results';
import { getQueryString } from './helpers';

type TPageProps = {
  searchParams: Promise<{ product?: string | string[]; supplement?: string | string[] }>;
};

export default async function Page({ searchParams }: TPageProps) {
  const params = await searchParams;
  const queryString = getQueryString(params);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUGGESTER_SERVICE_API_URL}/quiz-results${queryString}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch quiz result data: ${response.status}`);
    }

    const responseData = await response.json();

    return <Results data={responseData} />;
  } catch (error) {
    if (error instanceof Error) {
      return <ErrorComponent message={error.message} />;
    } else {
      return <ErrorComponent message="An unknown error occurred" />;
    }
  }
}
