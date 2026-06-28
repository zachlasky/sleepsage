import { Button } from 'flowbite-react';
import { useState, useRef } from 'react';
import { IoIosRadioButtonOff, IoIosRadioButtonOn } from 'react-icons/io';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

import type { TQuestionData } from './types';

type TQuestionProps = {
  questionData: TQuestionData;
  updateCurrentAnswer: (answer: string, isMultiAnswer: boolean) => void;
};

const Question = ({ questionData, updateCurrentAnswer }: TQuestionProps) => {
  const [atBottom, setAtBottom] = useState(false);
  const scrollRef = useRef<HTMLFormElement>(null);

  // Detect when user scrolls to the bottom
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setAtBottom(scrollTop + clientHeight >= scrollHeight - 5);
    }
  };

  const optionClassName = 'text-xl';
  const isScrollable = questionData.Answers.length > 5;

  return (
    <div className="relative w-full">
      <form
        className={`grid gap-3 w-full pt-6 overflow-y-auto ${
          isScrollable ? 'h-[300px] lg:h-[480px]' : 'h-full'
        }`}
        onScroll={handleScroll}
        ref={scrollRef}>
        {questionData.Answers.map((answer) => {
          return (
            <Button
              className="flex justify-start m-1 px-4 md:px-12 cursor-pointer h-12 md:h-20"
              color="gray"
              key={answer.Id}
              onClick={() => updateCurrentAnswer(answer.Title, questionData.QuestionIsMultiAnswer)}>
              <span className="flex items-center gap-4 cursor-pointer">
                {!questionData.QuestionIsMultiAnswer ? (
                  questionData?.SelectedAnswers?.includes(answer.Title) ? (
                    <IoIosRadioButtonOn className={optionClassName} />
                  ) : (
                    <IoIosRadioButtonOff className={optionClassName} />
                  )
                ) : questionData?.SelectedAnswers?.includes(answer.Title) ? (
                  <MdCheckBox className={optionClassName} />
                ) : (
                  <MdCheckBoxOutlineBlank className={optionClassName} />
                )}

                <p
                  className={
                    questionData?.SelectedAnswers?.includes(answer.Title)
                      ? 'font-semibold'
                      : 'font-normal'
                  }>
                  {answer.Title}
                </p>
              </span>
            </Button>
          );
        })}
      </form>

      {/* Bouncing Scroll Indicator */}
      {isScrollable && !atBottom && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce md:text-2xl">
          ↓
        </div>
      )}
    </div>
  );
};

export { Question };
