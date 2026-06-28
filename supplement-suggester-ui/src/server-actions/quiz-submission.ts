type TQuizResultsSubmissionRequest = {
  QuestionId: number;
  Answers: string[];
};

type TPostQuizResultsSubmission = {
  error: string;
  data?: {
    Supplements: string[];
    Products: string[];
    SubmissionId: string;
  };
};

const postQuizResultsSubmission = async (
  body: TQuizResultsSubmissionRequest[]
): Promise<TPostQuizResultsSubmission> => {
  const url = `${process.env.NEXT_PUBLIC_SUGGESTER_SERVICE_API_URL}/quiz`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      return { error: `HTTP error! status: ${response.status}` };
    }

    return { error: '', data: await response.json() };
  } catch (error) {
    return { error: `Error fetching supplement results: ${error}` };
  }
};

export { postQuizResultsSubmission };
