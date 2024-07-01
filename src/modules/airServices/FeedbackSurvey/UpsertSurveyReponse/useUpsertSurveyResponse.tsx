import { useLazyGetSingleSurveyForResponseQuery } from '@/services/airServices/feedback-survey/responses';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  upsertSurveyResponseDefaultValues,
  upsertSurveyResponseValidationSchema,
} from './UpsertSurveyResponse.data';

export const useUpsertSurveyResponse = () => {
  const router = useRouter();
  const allQuestion: any = useRef(); //TODO: for modifying the data on from end and have access till component unmount for sending back to BE
  const [questionsData, setQuestionData] = useState<any>([]);
  const { surveyId, action } = router?.query;

  const [
    lazyGetSingleSurveyForResponseTrigger,
    lazyGetSingleSurveyForResponseStatus,
  ] = useLazyGetSingleSurveyForResponseQuery?.();

  const methods = useForm({
    defaultValues: upsertSurveyResponseDefaultValues?.(questionsData),
    resolver: yupResolver(
      upsertSurveyResponseValidationSchema?.(questionsData),
    ),
  });

  const getSingleFeedbackSurvey = async () => {
    const apiDataParameter = {
      queryParams: {
        id: surveyId,
      },
    };

    try {
      const response =
        await lazyGetSingleSurveyForResponseTrigger(apiDataParameter)?.unwrap();

      allQuestion.current = JSON?.parse(JSON?.stringify(response?.data));

      const allQuestions = allQuestion?.current?.sections?.reduce(
        (acc: any, section: any) => [...acc, ...section?.questions],
        [],
      );

      const questionMap: any = new Map(
        allQuestions?.map((question: any) => [question?._id, question]),
      );

      setQuestionData?.(questionMap);
    } catch (error: any) {}
  };

  const { handleSubmit, reset } = methods;

  const submitSurveyResponse = (formData: any) => {
    const updateObjectKeys = Object?.keys(formData);

    updateObjectKeys?.forEach((questionId) => {
      if (questionsData?.has(questionId)) {
        const question: any = questionsData?.get(questionId);
        const newValue: any = formData?.[questionId];
        question!.answers = newValue;
      }
    });
  };

  useEffect(() => {
    getSingleFeedbackSurvey?.();
  }, [surveyId]);

  useEffect(() => {
    reset(() => upsertSurveyResponseDefaultValues?.(questionsData));
  }, [questionsData, reset]);

  return {
    handleSubmit,
    submitSurveyResponse,
    methods,
    action,
    lazyGetSingleSurveyForResponseStatus,
  };
};
