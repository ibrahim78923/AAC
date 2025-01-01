import { FeedbackSurveyQuestionI } from '@/types/modules/AirServices/FeedbackSurvey';

export interface QuestionListI {
  surveyId: string;
  questionsData?: FeedbackSurveyQuestionI[];
  setQuestionsData: React.Dispatch<
    React.SetStateAction<FeedbackSurveyQuestionI[]>
  >;
}
