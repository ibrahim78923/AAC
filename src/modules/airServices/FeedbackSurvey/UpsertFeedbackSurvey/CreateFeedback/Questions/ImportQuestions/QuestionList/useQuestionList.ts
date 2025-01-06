import { useGetSingleFeedbackQuery } from '@/services/airServices/feedback-survey';
import { QuestionListI } from './QuestionList.interface';
import { FeedbackSurveyQuestionI } from '@/types/modules/AirServices/FeedbackSurvey';

export const useQuestionList = (props: QuestionListI) => {
  const { surveyId, setQuestionsData, questionsData } = props;
  const getParams = {
    id: surveyId,
  };
  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetSingleFeedbackQuery(getParams, {
      refetchOnMountOrArgChange: true,
      skip: !!!surveyId,
    });
  const surveySectionsData = data?.data?.sections;
  const handleCheckboxClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    question: FeedbackSurveyQuestionI,
  ) => {
    const isChecked = e?.target?.checked;
    setQuestionsData((prev) => {
      if (isChecked) {
        return [...prev, question];
      } else {
        return prev?.filter((item) => item?._id !== question?._id);
      }
    });
  };
  const isQuestionSelected = (question: FeedbackSurveyQuestionI) => {
    return questionsData?.some((q) => q?._id === question?._id);
  };
  return {
    surveySectionsData,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    handleCheckboxClick,
    isQuestionSelected,
  };
};
