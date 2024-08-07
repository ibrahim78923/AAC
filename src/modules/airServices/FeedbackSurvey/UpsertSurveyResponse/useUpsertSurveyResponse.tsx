import {
  useLazyGetSingleSurveyForResponseQuery,
  usePatchSingleSurveyDropoutAnswerForResponseMutation,
  usePatchSingleSurveyQuestionsAnswerForResponseMutation,
} from '@/services/airServices/feedback-survey/responses';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FEEDBACK_SURVEY_RESPONSE_QUESTION_ANSWERS,
  upsertSurveyResponseDefaultValues,
  upsertSurveyResponseValidationSchema,
} from './UpsertSurveyResponse.data';
import { ARRAY_INDEX } from '@/constants/strings';
import { errorSnackbar } from '@/utils/api';

export const useUpsertSurveyResponse = (props: {
  loggedInUser?: string;
  goBack?: () => void;
}) => {
  const { loggedInUser } = props;
  const router = useRouter();
  const allQuestion: any = useRef({});
  const [questionsData, setQuestionData] = useState<any>([]);
  const { surveyId, action } = router?.query;

  const [
    lazyGetSingleSurveyForResponseTrigger,
    lazyGetSingleSurveyForResponseStatus,
  ] = useLazyGetSingleSurveyForResponseQuery?.();

  const [
    patchSingleSurveyQuestionsAnswerForResponseTrigger,
    patchSingleSurveyQuestionsAnswerForResponseStatus,
  ] = usePatchSingleSurveyQuestionsAnswerForResponseMutation?.();

  const [
    patchSingleSurveyDropoutAnswerForResponseTrigger,
    patchSingleSurveyDropoutAnswerForResponseStatus,
  ] = usePatchSingleSurveyDropoutAnswerForResponseMutation?.();

  const methods: any = useForm({
    defaultValues: upsertSurveyResponseDefaultValues?.(
      questionsData,
      loggedInUser,
    ),
    resolver: yupResolver(
      upsertSurveyResponseValidationSchema?.(questionsData, loggedInUser),
    ),
  });

  const getSingleFeedbackSurvey = async () => {
    const apiDataParameter = {
      queryParams: {
        UUID: surveyId,
      },
    };

    try {
      const response =
        await lazyGetSingleSurveyForResponseTrigger(apiDataParameter)?.unwrap();

      allQuestion!.current = JSON?.parse(
        JSON?.stringify(response?.data[ARRAY_INDEX?.ZERO]),
      );

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

  const submitSurveyResponse = async (formData: any) => {
    const updateObjectKeys = Object?.keys(formData);
    updateObjectKeys?.forEach((questionId) => {
      if (questionsData?.has(questionId)) {
        const question: any = questionsData?.get(questionId);
        const newValue: any = formData?.[questionId];
        question!.answers = [
          {
            [FEEDBACK_SURVEY_RESPONSE_QUESTION_ANSWERS?.[
              question?.questionType
            ]]: newValue,
            userEmail: formData?.email,
          },
        ];
        question!.id = question?._id;
        delete question?._id;
        delete question?.surveyId;
        delete question?.createdBy;
        delete question?.createdAt;
        delete question?.updatedAt;
      }
    });

    const apiDataParameter = {
      body: {
        questions: allQuestion?.current?.sections?.reduce(
          (acc: any, section: any) => [...acc, ...section?.questions],
          [],
        ),
      },
      queryParams: {
        UUID: surveyId,
      },
    };

    try {
      await patchSingleSurveyQuestionsAnswerForResponseTrigger(
        apiDataParameter,
      )?.unwrap();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submitSurveyResponseDropout = async () => {
    const apiDataParameter = {
      queryParams: {
        UUID: surveyId,
      },
    };

    try {
      await patchSingleSurveyDropoutAnswerForResponseTrigger(
        apiDataParameter,
      )?.unwrap();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  useEffect(() => {
    if (!!surveyId) getSingleFeedbackSurvey?.();
  }, [surveyId]);

  useEffect(() => {
    reset(
      () => upsertSurveyResponseDefaultValues?.(questionsData, loggedInUser),
    );
  }, [questionsData, reset]);

  return {
    handleSubmit,
    submitSurveyResponse,
    methods,
    action,
    lazyGetSingleSurveyForResponseStatus,
    patchSingleSurveyDropoutAnswerForResponseStatus,
    patchSingleSurveyQuestionsAnswerForResponseStatus,
    submitSurveyResponseDropout,
  };
};
