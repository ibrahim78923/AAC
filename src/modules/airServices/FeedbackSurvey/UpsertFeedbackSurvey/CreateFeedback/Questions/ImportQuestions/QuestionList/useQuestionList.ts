import { useGetSingleFeedbackQuery } from '@/services/airServices/feedback-survey';
import { useState } from 'react';
import { questionTypeValues } from './QuestionList.data';

export const useQuestionList = (props: any) => {
  const { setQuestionsList, surveyId, methods, sectionIndex, setOpenImport } =
    props;
  const { setValue, watch } = methods;
  const [questionsData, setQuestionsData] = useState<any[]>([]);
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
  const handleCheckboxClick = (e: any, question: any) => {
    const isChecked = e?.target?.checked;
    setQuestionsData((prev: any) => {
      if (isChecked) {
        return [...prev, question];
      } else {
        return prev?.filter((item: any) => item?._id !== question?._id);
      }
    });
  };

  const SurveyData = questionsData?.map((item: any) => ({
    questionTitle: item?.questionTitle,
    questionType: questionTypeValues?.find(
      (type: any) => type?.value === item?.questionType,
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
  };
};
