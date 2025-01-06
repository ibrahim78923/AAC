import { FeedbackSurveyQuestionI } from '@/types/modules/AirServices/FeedbackSurvey';
import { useState } from 'react';
import { ImportQuestionsI } from './ImportQuestions.interface';
import { questionTypeValues } from './ImportQuestions.data';

export const useImportQuestions = (props: ImportQuestionsI) => {
  const {
    methods: { watch, setValue },
    sectionIndex,
    setOpenImport,
  } = props;
  const [surveyId, setSurveyId] = useState('');
  const [questionsList, setQuestionsList] = useState(false);
  const [questionsData, setQuestionsData] = useState<FeedbackSurveyQuestionI[]>(
    [],
  );
  const selectedQuestions = questionsData?.map((item) => ({
    questionTitle: item?.questionTitle,
    questionType: questionTypeValues?.find(
      (type) => type?.value === item?.questionType,
    ),
    text: item?.options,
    options: item?.options,
    description: item?.description,
    isRequired: item?.isRequired,
  }));
  const prevQuestions = watch(`sections.${sectionIndex}.questions`);
  const insertQuestions = [...prevQuestions, ...(selectedQuestions || [])];
  const handleInsert = () => {
    setValue(`sections.${sectionIndex}.questions`, insertQuestions);
    setOpenImport(false);
  };
  return {
    surveyId,
    setSurveyId,
    questionsList,
    setQuestionsList,
    questionsData,
    setQuestionsData,
    handleInsert,
  };
};
