'use client';

import { Button, Spinner } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Error } from '@/components/error';
import { postQuizResultsSubmission } from '@/server-actions/quiz-submission';
import { Question } from './question';

import type { TQuizData, TQuestionData } from './types';

type TQuizProps = {
  quizData: TQuizData[];
};

const Quiz = ({ quizData }: TQuizProps) => {
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [questionData, setQuestionData] = useState<TQuestionData[]>(quizData);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmitClick = async () => {
    setIsLoading(true);

    const quizSubmissionData = questionData.map((question) => ({
      QuestionId: question.QuestionId,
      Answers: question.SelectedAnswers || []
    }));

    const { error, data } = await postQuizResultsSubmission(quizSubmissionData);
    if (error) {
      setErrorMessage('Error submitting quiz results:');
      return;
    }

    const params = new URLSearchParams();
    data?.Supplements?.forEach((id: string) => params.append('supplement', id));
    data?.Products?.forEach((id: string) => params.append('product', id));

    router.push(`/quiz/results?${params.toString()}`); // Redirect to results page
  };

  const handleSingleInputChange = (answer: string) => {
    const updatedQuizData = questionData.map((question) => {
      if (question.QuestionId === currentQuestion) {
        return {
          ...question,
          SelectedAnswers: [answer]
        };
      }
      return question;
    });

    setQuestionData(updatedQuizData);
  };

  const handleMultiInputChange = (answer: string) => {
    const updatedQuizData = questionData.map((question) => {
      if (question.QuestionId === currentQuestion) {
        const selectedAnswers = question.SelectedAnswers || [];
        const isAnswerSelected = selectedAnswers.includes(answer);

        return {
          ...question,
          SelectedAnswers: isAnswerSelected
            ? selectedAnswers.filter((a) => a !== answer)
            : [...selectedAnswers, answer]
        };
      }
      return question;
    });

    setQuestionData(updatedQuizData);
  };

  const handleInputChange = (answer: string, isMultiAnswer: boolean) => {
    if (!isMultiAnswer) {
      handleSingleInputChange(answer);
    } else {
      handleMultiInputChange(answer);
    }
  };

  const selectedAnswers = questionData[currentQuestion - 1]?.SelectedAnswers;

  if (errorMessage.length > 0) {
    return <Error message={errorMessage} />;
  }

  return (
    <div className="py-4 lg:py-10 px-4 lg:px-56">
      <div className="flex justify-center text-center w-full py-4 lg:py-8">
        <span className="text-xl font-semibold">FIND YOUR PERFECT SUPPLEMENT</span>
      </div>

      <div className="grid justify-items-center p-2 gap-4 rounded-lg">
        <p className="text-lg md:text-xl ">{`Question ${
          quizData[currentQuestion - 1].QuestionId
        } of ${quizData.length}`}</p>
        <p className="text-xl md:text-3xl text-center font-bold">
          {quizData[currentQuestion - 1].QuestionTitle}
        </p>
      </div>

      {questionData.map((question) => {
        if (question.QuestionId !== currentQuestion) {
          return null;
        }

        return (
          <Question
            key={question.QuestionId}
            questionData={question}
            updateCurrentAnswer={handleInputChange}
          />
        );
      })}

      <div className="flex justify-end gap-4 py-4 lg:py-8">
        {currentQuestion !== 1 && (
          <Button
            onClick={() => setCurrentQuestion((prevQuestion) => prevQuestion - 1)}
            color="gray"
            className="w-1/2 text font-semibold disabled:cursor-not-allowed">
            PREVIOUS
          </Button>
        )}

        {currentQuestion !== quizData.length ? (
          <Button
            disabled={!selectedAnswers?.length}
            onClick={() => setCurrentQuestion((prevQuestion) => prevQuestion + 1)}
            color="gray"
            className="w-1/2 text font-semibold disabled:cursor-not-allowed">
            NEXT
          </Button>
        ) : (
          <Button
            disabled={!selectedAnswers?.length}
            onClick={handleSubmitClick}
            color="gray"
            className="w-1/2 text font-semibold disabled:cursor-not-allowed">
            {isLoading ? (
              <>
                <Spinner aria-label="Alternate spinner button example" size="sm" />
                <span className="pl-3">GETTING RESULTS...</span>
              </>
            ) : (
              'Submit'
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export { Quiz };
