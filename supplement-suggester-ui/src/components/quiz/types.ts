type TAnswer = {
  Id: number;
  Title: string;
};

type TQuizData = {
  Answers: TAnswer[];
  QuestionId: number;
  QuestionIsMultiAnswer: boolean;
  QuestionTitle: string;
};

type TQuestionData = TQuizData & {
  SelectedAnswers?: string[];
};

export type { TQuizData, TQuestionData };
