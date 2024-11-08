import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import lodash from 'lodash';
import {
  apiSectionData,
  feedbackSurveyType,
  feedbackSurveyValidationSchema,
  feedbackSurveyValues,
  feedbackTypes,
  linearScaleOption,
  surveyWatchArray,
} from './UpsertFeedbackSurvey.data';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useAddFeedbackQuestionsMutation,
  useGetSingleFeedbackQuery,
  usePatchFeedbackSurveyMutation,
  usePostFeedbackSurveyMutation,
} from '@/services/airServices/feedback-survey';
import { useRouter } from 'next/router';
import { errorSnackbar } from '@/lib/snackbar';
import {
  FeedbackSurveyI,
  FeedbackSurveyQuestionI,
} from '@/types/modules/AirServices/FeedbackSurvey';
import { isoDateString } from '@/lib/date-time';
import { DATA_TYPES } from '@/constants/strings';
import { IErrorResponse } from '@/types/shared/ErrorResponse';

export const useUpsertFeedbackSurvey = () => {
  const [createSurvey, setCreateSurvey] = useState<string>(
    feedbackTypes?.survey,
  );
  const [submitIndex, setSubmitIndex] = useState<{
    index: number;
    sectionId: string;
  }>({
    index: 0,
    sectionId: '',
  });
  const [submitType, setSubmitType] = useState('');
  const router: any = useRouter();
  const surveyId = router?.query?.id;
  const methods = useForm({
    defaultValues: feedbackSurveyValues(null),
    resolver: yupResolver(feedbackSurveyValidationSchema(createSurvey, router)),
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
  const modifiedSurveyData = (surveyData: FeedbackSurveyI) => ({
    surveyTitle: surveyData?.surveyTitle,
    description: surveyData?.description,
    displayName: surveyData?.display ? surveyData?.displayName : '',
    satisfactionSurveyLinkType: surveyData?.satisfactionSurveyLinkType,
    surveyDuration: isoDateString(surveyData?.surveyDuration),
    magicLink: `${window?.location?.origin}/survey/response?surveyId=${surveyData?.UUID}`,
    customerSupportLinkType: surveyData?.customerSupportLinkType,
    UUID: surveyData?.UUID,
    sendSurveyPeople:
      surveyData?.customerSupportLinkType === feedbackTypes?.viaEmail &&
      surveyData?.sendSurveyPeople?.length
        ? surveyData?.sendSurveyPeople?.map((item) =>
            item?.email ? item?.email : item,
          )
        : surveyData?.customerSupportLinkType === feedbackTypes?.viaMagicLink &&
            surveyData?.shareSurveyPeople?.length
          ? surveyData?.shareSurveyPeople?.map((item) =>
              item?.email ? item?.email : item,
            )
          : [],
    surveyType: feedbackSurveyType?.[router?.query?.type],
  });
  const handleCreateSurvey = async (surveyData: FeedbackSurveyI) => {
    try {
      const response: any = await createFeedbackSurveyTrigger({
        ...modifiedSurveyData(surveyData),
      })?.unwrap();
      router?.push({
        ...router?.basePath,
        query: { ...router?.query, id: response?.data?.data?._id },
      });
      setCreateSurvey(feedbackTypes?.feedback);
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };
  const surveyValues = watch(surveyWatchArray);
  const sendSurveyPeople = watch('sendSurveyPeople');
  const shareSurveyPeople = watch('shareSurveyPeople');
  const customerSupportLinkType = watch('customerSupportLinkType');
  const sendSurveyPeopleValue =
    sendSurveyPeople?.length &&
    customerSupportLinkType === feedbackTypes?.viaEmail
      ? sendSurveyPeople?.map((item: any) => (item?.email ? item?.email : item))
      : shareSurveyPeople?.length &&
          customerSupportLinkType === feedbackTypes?.viaMagicLink
        ? shareSurveyPeople?.map((item: any) =>
            item?.email ? item?.email : item,
          )
        : [];
  const surveyDuration: any = watch('surveyDuration');
  const surveyDurationValue = new Date(surveyDuration);
  const dateString = (date: any) => {
    if (isNaN(date)) {
      return;
    } else {
      return isoDateString(date);
    }
  };
  const newSurvey = [
    ...surveyValues,
    sendSurveyPeopleValue,
    !surveyDuration ? surveyDuration : dateString(surveyDurationValue),
  ];
  const oldSurvey = {
    surveyTitle: data?.data?.surveyTitle,
    description: data?.data?.description,
    displayName: data?.data?.displayName,
    satisfactionSurveyLinkType: data?.data?.satisfactionSurveyLinkType,
    customerSupportLinkType: data?.data?.customerSupportLinkType,
    UUID: data?.data?.UUID,
    sendSurveyPeople: data?.data?.sendSurveyPeople,
    surveyDuration: data?.data?.surveyDuration,
  };
  const handleUpdateSurvey = async (data: FeedbackSurveyI) => {
    const modifiedSurvey = {
      body: {
        ...modifiedSurveyData(data),
      },
      params: { id: surveyId },
    };
    if (!lodash?.isEqual(Object?.values(oldSurvey), newSurvey)) {
      try {
        await patchFeedbackSurveyTrigger(modifiedSurvey)?.unwrap();
        setCreateSurvey(feedbackTypes?.feedback);
      } catch (error) {
        const errorResponse = error as IErrorResponse;
        errorSnackbar(errorResponse?.data?.message);
      }
    } else {
      setCreateSurvey(feedbackTypes?.feedback);
    }
  };
  const watchSectionData = watch('sections');
  const trimValues = (data: any): any => {
    if (Array?.isArray(data)) {
      return data?.map(trimValues);
    } else if (typeof data === DATA_TYPES?.OBJECT && data !== null) {
      return lodash.mapValues(data, trimValues);
    } else if (typeof data === DATA_TYPES?.STRING) {
      return data?.trim();
    }
    return data;
  };

  const sectionVerification = lodash.isEqual(
    trimValues(apiSectionData(data?.data?.sections)),
    trimValues(watchSectionData),
  );
  let unSaveSection: any;
  watchSectionData?.forEach((newSec: any, index: number) => {
    const oldSec = apiSectionData(data?.data?.sections)?.[index];
    if (!lodash?.isEqual(newSec, oldSec)) {
      unSaveSection = { section: newSec, index };
    }
  });
  const newHeading = watch(`sections.${submitIndex?.index}.heading`);
  const newDescription = watch(`sections.${submitIndex?.index}.description`);
  const oldHeading = data?.data?.sections?.[submitIndex?.index]?.heading;
  const oldDescription =
    data?.data?.sections?.[submitIndex?.index]?.description;
  const handleSubmitQuestion = async (data: FeedbackSurveyI) => {
    const selectedSection = data?.sections?.[submitIndex?.index];
    const sectionObj: any = {
      index: submitIndex?.index,
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
      patchResponse = await patchFeedbackSurveyTrigger(updateSurvey)?.unwrap();
    }
    const sectionData = selectedSection?.questions?.map(
      (question: FeedbackSurveyQuestionI, index: number) => {
        const questionTypeValue =
          (
            question.questionType as {
              id: number;
              label: string;
              value: string;
              icon: JSX.Element;
            }
          )?.value ?? question?.questionType;
        return {
          id: question?.id,
          questionTitle: question?.questionTitle,
          questionType: questionTypeValue,
          options:
            questionTypeValue !==
            (feedbackTypes?.text || feedbackTypes?.shortAnswers)
              ? questionTypeValue === feedbackTypes?.linearScale
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
    try {
      await addQuestionsTrigger(questionParams)?.unwrap();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };
  useEffect(() => {
    reset(feedbackSurveyValues(data?.data));
  }, [surveyId, data]);
  const onSubmit: (data: any) => Promise<void> = async (
    data: FeedbackSurveyI,
  ) => {
    if (submitType === feedbackTypes?.createSurvey && !surveyId) {
      await handleCreateSurvey(data);
    } else if (submitType === feedbackTypes?.createSurvey && surveyId) {
      await handleUpdateSurvey(data);
    } else if (submitType === feedbackTypes?.saveQuestion) {
      await handleSubmitQuestion(data);
    }
    setSubmitIndex({
      index: 0,
      sectionId: '',
    });
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
    data,
  };
};
