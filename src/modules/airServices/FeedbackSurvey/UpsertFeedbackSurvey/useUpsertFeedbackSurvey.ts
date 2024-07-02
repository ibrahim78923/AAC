import { useForm } from 'react-hook-form';
import lodash from 'lodash';
import {
  apiSectionData,
  feedbackSurveyType,
  feedbackSurveyValidationSchema,
  feedbackSurveyValues,
  feedbackTypes,
  linearScaleOption,
} from './UpsertFeedbackSurvey.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import {
  useAddFeedbackQuestionsMutation,
  useGetSingleFeedbackQuery,
  usePatchFeedbackSurveyMutation,
  usePostFeedbackSurveyMutation,
} from '@/services/airServices/feedback-survey';
import { useRouter } from 'next/router';
import { errorSnackbar } from '@/utils/api';

export const useUpsertFeedbackSurvey = () => {
  const [createSurvey, setCreateSurvey] = useState(false);
  const [submitIndex, setSubmitIndex] = useState<any>({});
  const [submitType, setSubmitType] = useState('');
  const router: any = useRouter();
  const surveyId = router?.query?.id;
  const methods = useForm({
    defaultValues: feedbackSurveyValues(null),
    resolver: yupResolver(feedbackSurveyValidationSchema(createSurvey)),
  });
  const { handleSubmit, reset, watch } = methods;
  const getParams = {
    id: surveyId,
  };
  const {
    data,
    isLoading: getLoading,
    isFetching: getFetching,
  } = useGetSingleFeedbackQuery(getParams, {
    refetchOnMountOrArgChange: true,
    skip: !!!surveyId,
  });
  const [createFeedbackSurveyTrigger, { isLoading: createLoading }] =
    usePostFeedbackSurveyMutation();
  const [patchFeedbackSurveyTrigger, { isLoading: updateLoading }] =
    usePatchFeedbackSurveyMutation();
  const [addQuestionsTrigger, { isLoading: qusLoading }] =
    useAddFeedbackQuestionsMutation();
  const modifiedSurveyData = (surveyData: any) => ({
    surveyTitle: surveyData?.surveyTitle,
    description: surveyData?.description,
    displayName: surveyData?.display ? surveyData?.displayName : '',
    satisfactionSurveyLinkType: surveyData?.satisfactionSurveyLinkType,
    subject: surveyData?.subject,
    customerSupportLinkType: surveyData?.customerSupportLinkType,
    magicLink: surveyData?.magicLink,
    sendSurveyPeople: surveyData?.sendSurveyPeople,
    surveyType: feedbackSurveyType?.[router?.query?.type],
  });
  const handleCreateSurvey = async (surveyData: any) => {
    const response: any = await createFeedbackSurveyTrigger(
      modifiedSurveyData(surveyData),
    );
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
      body: modifiedSurveyData(data),
      params: { id: router?.query?.id },
    };
    const response: any = await patchFeedbackSurveyTrigger(modifiedSurvey);
    if (response?.data?.message) {
      setCreateSurvey(true);
    } else {
      errorSnackbar(response?.error?.data?.message);
    }
  };
  const watchSectionData = watch('sections');
  const sectionVerification = lodash?.isEqual(
    apiSectionData(data),
    watchSectionData,
  );
  let unSaveSection: any;
  watchSectionData?.forEach((newSec: any, index: number) => {
    const oldSec = apiSectionData(data)?.[index];
    if (!lodash.isEqual(newSec, oldSec)) {
      unSaveSection = { section: newSec, index };
    }
  });
  const newHeading = watch(`sections.${submitIndex?.index}.heading`);
  const newDescription = watch(`sections.${submitIndex?.index}.description`);
  const oldHeading = data?.data?.sections?.[submitIndex?.index]?.heading;
  const oldDescription =
    data?.data?.sections?.[submitIndex?.index]?.description;
  const handleSubmitQuestion = async (data: any) => {
    const selectedSection = data?.sections?.[submitIndex?.index];
    const sectionObj: any = {
      heading: selectedSection?.heading,
      description: selectedSection?.description,
    };
    if (selectedSection?.id) {
      sectionObj.id = selectedSection?.id;
    }
    const updateSurvey = {
      body: {
        sections: [sectionObj],
      },
      params: { id: surveyId },
    };
    let patchResponse: any;
    if (oldHeading !== newHeading || oldDescription !== newDescription) {
      patchResponse = await patchFeedbackSurveyTrigger(updateSurvey);
    }
    const sectionData = selectedSection?.questions?.map(
      (question: any, index: number) => {
        return {
          id: question?.id,
          questionTitle: question?.questionTitle,
          questionType: question?.questionType?.value,
          options:
            question?.questionTitle !==
            (feedbackTypes?.text || feedbackTypes?.shortAnswers)
              ? question?.questionType?.value === feedbackTypes?.linearScale
                ? linearScaleOption
                : question?.options
              : [],
          description: question?.description,
          isRequired: question?.isRequired,
          order: index + 1,
        };
      },
    );
    const questionParams = {
      body: { questions: sectionData },
      params: {
        surveyId,
        sectionId: patchResponse?.data
          ? patchResponse?.data?.data?.sections?.[submitIndex?.index]?._id
          : submitIndex?.sectionId,
      },
    };
    const response: any = await addQuestionsTrigger(questionParams);
    if (response?.data?.message) {
      setSubmitIndex({ sectionSave: true });
    } else {
      errorSnackbar(response?.error?.data?.message);
    }
  };
  useEffect(() => {
    reset(feedbackSurveyValues(data?.data));
  }, [surveyId, data]);
  const onSubmit: any = async (data: any) => {
    if (submitType === feedbackTypes?.createSurvey && !surveyId) {
      await handleCreateSurvey(data);
    } else if (submitType === feedbackTypes?.createSurvey && surveyId) {
      await handleUpdateSurvey(data);
    } else if (submitType === feedbackTypes?.saveQuestion) {
      await handleSubmitQuestion(data);
    }
    setSubmitIndex({});
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
    getLoading,
    getFetching,
    qusLoading,
    setSubmitType,
    sectionVerification,
    unSaveSection,
  };
};
