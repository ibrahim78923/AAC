import { useForm } from 'react-hook-form';
import {
  feedbackSurveyType,
  feedbackSurveyValidationSchema,
  feedbackSurveyValues,
} from './UpsertFeedbackSurvey.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import {
  usePatchFeedbackSurveyMutation,
  usePostFeedbackSurveyMutation,
} from '@/services/airServices/feedback-survey';
import { useRouter } from 'next/router';
import { errorSnackbar } from '@/utils/api';

export const useUpsertFeedbackSurvey = () => {
  const [createSurvey, setCreateSurvey] = useState(false);
  const [submitIndex, setSubmitIndex] = useState<any>(0);
  const router: any = useRouter();
  const [createFeedbackSurveyTrigger, { isLoading: createLoading }] =
    usePostFeedbackSurveyMutation();
  const [patchFeedbackSurveyTrigger, { isLoading: updateLoading }] =
    usePatchFeedbackSurveyMutation();
  const handleCreateSurvey = async (surveyData: any) => {
    const modifiedSurvey = {
      surveyTitle: surveyData?.surveyTitle,
      description: surveyData?.description,
      displayName: surveyData?.displayName,
      satisfactionSurveyLinkType: surveyData?.satisfactionSurveyLinkType,
      subject: surveyData?.subject,
      customerSupportLinkType: surveyData?.customerSupportLinkType,
      magicLink: surveyData?.magicLink,
      sendSurveyPeople: surveyData?.sendSurveyPeople,
      surveyType: feedbackSurveyType?.[router?.query?.type],
    };
    const response: any = await createFeedbackSurveyTrigger(modifiedSurvey);
    if (response?.data?.data?._id) {
      router?.push({
        ...router?.basePath,
        query: { ...router?.query, id: response?.data?.data?._id },
      });
      setCreateSurvey(true);
    } else {
      errorSnackbar(response?.error?.data?.message);
    }
  };
  const handleUpdateSurvey = async (data: any) => {
    const modifiedSurvey = {
      body: {
        surveyTitle: data?.surveyTitle,
        description: data?.description,
        displayName: data?.displayName,
        satisfactionSurveyLinkType: data?.satisfactionSurveyLinkType,
        subject: data?.subject,
        customerSupportLinkType: data?.customerSupportLinkType,
        magicLink: data?.magicLink,
        sendSurveyPeople: data?.sendSurveyPeople,
        surveyType: feedbackSurveyType?.[router?.query?.type],
      },
      params: { id: router?.query?.id },
    };
    const response: any = await patchFeedbackSurveyTrigger(modifiedSurvey);
    if (response?.data?.message) {
      setCreateSurvey(true);
    } else {
      errorSnackbar(response?.error?.data?.message);
    }
  };
  const methods = useForm({
    defaultValues: feedbackSurveyValues,
    resolver: yupResolver(feedbackSurveyValidationSchema),
  });
  const { handleSubmit } = methods;
  const onSubmit = async (data: any) => {
    if (!createSurvey && !router?.query?.id) {
      await handleCreateSurvey(data);
    } else if (router?.query?.id) {
      await handleUpdateSurvey(data);
    }
    const selectedSection = data?.section?.[submitIndex];
    const sectionData = selectedSection?.questions?.map((question: any) => {
      return {
        questionTitle: question?.questionTitle,
        questionType: question?.questionType?.value,
        options: question?.options,
        description: question?.description,
        isRequired: question?.isRequired,
      };
    });
    return { sectionData };
  };
  return {
    methods,
    handleSubmit,
    onSubmit,
    createSurvey,
    setCreateSurvey,
    setSubmitIndex,
    createLoading,
    updateLoading,
  };
};
