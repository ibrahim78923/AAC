import { useState } from 'react';

export const useImportQuestions = () => {
  const [surveyId, setSurveyId] = useState(null);
  const [questionsList, setQuestionsList] = useState(false);
  return { surveyId, setSurveyId, questionsList, setQuestionsList };
};
