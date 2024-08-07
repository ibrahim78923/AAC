import { useGetSingleFeedbackQuery } from '@/services/airServices/feedback-survey';
import { useState } from 'react';
import { questionTypeValues } from './QuestionList.data';
import { QuestionListI } from './QuestionList.interface';
import { FeedbackSurveyQuestionI } from '@/types/modules/AirServices/FeedbackSurvey';

export const useQuestionList = (props: QuestionListI) => {
  const { setQuestionsList, surveyId, methods, sectionIndex, setOpenImport } =
    props;
  const { setValue, watch } = methods;
  const [questionsData, setQuestionsData] = useState<FeedbackSurveyQuestionI[]>(
    [],
  );
  const getParams = {
    id: surveyId,
  };
  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetSingleFeedbackQuery(getParams, {
      refetchOnMountOrArgChange: true,
      skip: !!!surveyId,
    });
  const surveyData = data?.data?.sections;
  const handleMoveBack = () => {
    setQuestionsList(false);
  };
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

  const SurveyData = questionsData?.map((item) => ({
    questionTitle: item?.questionTitle,
    questionType: questionTypeValues?.find(
      (type) => type?.value === item?.questionType,
    ),
    text: item?.options,
    options: item?.options,
    description: item?.description,
    isRequired: item?.isRequired,
  }));
  const oldQuestions = watch(`sections.${sectionIndex}.questions`);
  const insertQuestions = [...oldQuestions, ...SurveyData];
  const handleInsert = () => {
    setValue(`sections.${sectionIndex}.questions`, insertQuestions);
    setOpenImport(false);
  };
  const isQuestionSelected = (question: FeedbackSurveyQuestionI) => {
    return questionsData?.some((q) => q?._id === question?._id);
  };
  return {
    surveyData,
    handleMoveBack,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    handleCheckboxClick,
    handleInsert,
    questionsData,
    isQuestionSelected,
  };
};
