import { Error as ErrorComponent } from '@/components/error';
import { Quiz } from '@/components/quiz/quiz';

export default async function Page() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUGGESTER_SERVICE_API_URL}/quiz`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch quiz data: ${response.status}`);
    }

    const quizData = await response.json();

    return <Quiz quizData={quizData} />;
  } catch (error) {
    if (error instanceof Error) {
      return <ErrorComponent message={error.message} />;
    } else {
      return <ErrorComponent message="An unknown error occurred" />;
    }
  }
}
