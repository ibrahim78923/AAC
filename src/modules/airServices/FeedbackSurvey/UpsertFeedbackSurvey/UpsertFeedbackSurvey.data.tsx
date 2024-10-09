import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import {
  RadioButtonChecked,
  CheckBox,
  LinearScale,
  ShortText,
} from '@mui/icons-material';
import { NextRouter } from 'next/router';
import {
  FeedbackSurveyI,
  FeedbackSurveySectionI,
} from '@/types/modules/AirServices/FeedbackSurvey';
import { localeDateTime } from '@/utils/dateTime';
import { CHARACTERS_LIMIT } from '@/constants/validation';
export const feedbackTypes = {
  createSurvey: 'createSurvey',
  saveQuestion: 'saveQuestion',
  linearScale: 'linearScale',
  text: 'text',
  shortAnswers: 'shortAnswers',
  feedback: 'feedback',
  survey: 'survey',
  preview: 'preview',
  viaEmail: 'viaEmail',
  published: 'published',
  draft: 'draft',
  customerSatisfaction: 'customer-satisfaction',
  viaMagicLink: 'viaMagicLink',
};
export const questionTypeOptions = [
  {
    id: 1,
    label: 'Multiple Choice',
    value: 'multipleChoice',
    icon: <RadioButtonChecked />,
  },
  {
    id: 2,
    label: 'Check Boxes',
    value: 'checkboxes',
    icon: <CheckBox />,
  },
  {
    id: 3,
    label: 'Short Answers',
    value: 'shortAnswers',
    icon: <ShortText />,
  },
  {
    id: 4,
    label: 'Linear Scale',
    value: 'linearScale',
    icon: <LinearScale />,
  },
  { value: 'text' },
];
export const feedbackSurveyValues = (data: FeedbackSurveyI | null) => {
  return {
    surveyTitle: data?.surveyTitle ?? '',
    description: data?.description ?? '',
    surveyDuration: data?.surveyDuration
      ? localeDateTime(data?.surveyDuration)
      : null,
    display: data?.displayName ? true : false,
    displayName: data?.displayName ?? '',
    customerSupportLinkType: data?.customerSupportLinkType ?? 'viaEmail',
    sendSurveyPeople:
      data?.customerSupportLinkType === feedbackTypes?.viaEmail &&
      data?.sendSurveyPeople
        ? data?.sendSurveyPeople
        : [],
    shareSurveyPeople:
      data?.customerSupportLinkType === feedbackTypes?.viaMagicLink &&
      data?.sendSurveyPeople
        ? data?.sendSurveyPeople
        : [],
    magicLink: data?.magicLink ?? '',
    satisfactionSurveyLinkType:
      data?.satisfactionSurveyLinkType ?? 'toAllAgents',
    UUID: data?.UUID ? data?.UUID : uuidv4(),
    sections: data?.sections?.map((section) => ({
      id: section?._id ?? '',
      heading: section?.heading ?? '',
      description: section?.description ?? '',
      questions: !!section?.questions?.length
        ? section?.questions?.map((question) => ({
            id: question?._id ?? '',
            questionTitle: question?.questionTitle ?? '',
            questionType: questionTypeOptions?.find(
              (type) => type?.value === question?.questionType,
            ) ?? {
              label: 'Multiple Choice',
              value: 'multipleChoice',
            },
            text: question?.options?.map((text) => ({
              text: text?.text ?? '',
            })) ?? [{ text: '1' }],
            options: question?.options?.map((option) => ({
              text: option?.text ?? '',
              index: option?.index ?? 0,
            })) ?? [{ text: '1', index: 0 }],
            description: question?.description ?? '',
            isRequired: question?.isRequired ?? false,
          }))
        : [
            {
              questionTitle: '',
              questionType: {
                label: 'Multiple Choice',
                value: 'multipleChoice',
              },
              text: [{ text: '1' }],
              options: [{ text: '1', index: 0 }],
              description: '',
              isRequired: false,
            },
          ],
    })) ?? [
      {
        heading: '',
        description: '',
        questions: [
          {
            questionTitle: '',
            questionType: {
              label: 'Multiple Choice',
              value: 'multipleChoice',
            },
            text: [{ text: '1' }],
            options: [{ text: '1', index: 0 }],
            description: '',
            isRequired: false,
          },
        ],
      },
    ],
  };
};
export const feedbackSurveyValidationSchema: any = (
  createSurvey: string,
  router: NextRouter,
) =>
  Yup?.object()?.shape({
    surveyTitle: Yup?.string()
      ?.max(
        CHARACTERS_LIMIT?.SERVICES_FEEDBACK_SURVEY_TITLE_MAX_CHARACTERS,
        `Maximum characters limit is ${CHARACTERS_LIMIT?.SERVICES_FEEDBACK_SURVEY_TITLE_MAX_CHARACTERS}`,
      )
      ?.required('Required'),
    description: Yup?.string()
      ?.max(
        CHARACTERS_LIMIT?.SERVICES_FEEDBACK_DESCRIPTION_MAX_CHARACTERS,
        `Maximum characters limit is ${CHARACTERS_LIMIT?.SERVICES_FEEDBACK_DESCRIPTION_MAX_CHARACTERS}`,
      )
      ?.required('Required'),
    displayName: Yup?.string()?.max(
      CHARACTERS_LIMIT?.SERVICES_FEEDBACK_DISPLAY_NAME_MAX_CHARACTERS,
      `Maximum characters limit is ${CHARACTERS_LIMIT?.SERVICES_FEEDBACK_DISPLAY_NAME_MAX_CHARACTERS}`,
    ),
    surveyDuration: Yup?.date()?.nullable()?.required('Required'),
    customerSupportLinkType: Yup?.string(),
    sendSurveyPeople: Yup?.array()?.when('customerSupportLinkType', {
      is: (type: string) =>
        type === feedbackTypes?.viaEmail &&
        router?.query?.type !== feedbackTypes?.customerSatisfaction,
      then: (schema) => schema?.min(1, 'Required'),
      otherwise: (schema) => schema?.notRequired(),
    }),
    sections: Yup?.array()?.of(
      Yup?.object()?.shape({
        heading:
          createSurvey === feedbackTypes?.feedback
            ? Yup?.string()?.required('Required')
            : Yup?.string(),
        description:
          createSurvey === feedbackTypes?.feedback
            ? Yup?.string()?.required('Required')
            : Yup?.string(),
        questions: Yup?.array()?.of(
          Yup?.object()?.shape({
            questionTitle:
              createSurvey === feedbackTypes?.feedback
                ? Yup?.string()?.required('Required')
                : Yup?.string(),
            questionType:
              createSurvey === feedbackTypes?.feedback
                ? Yup?.mixed()?.required('Required')
                : Yup?.mixed(),
          }),
        ),
      }),
    ),
  });
export const feedbackSurveyType: any = {
  ['customer-support']: 'customerSupport',
  ['customer-satisfaction']: 'customerSatisfaction',
};

export const linearScaleOption = [
  {
    index: 0,
    text: 'Strongly Agree 😇',
  },
  {
    index: 1,
    text: 'Agree 😊',
  },
  {
    index: 2,
    text: 'Neutral 😐',
  },
  {
    index: 3,
    text: 'Disagree 😑',
  },
  {
    index: 4,
    text: 'Strongly Disagree 😠',
  },
];

export const apiSectionData = (data: FeedbackSurveySectionI[]) => {
  return data?.map((item) => ({
    heading: item?.heading,
    description: item?.description,
    id: item?._id,
    questions: item?.questions?.map((ques) => ({
      id: ques?._id,
      questionTitle: ques?.questionTitle,
      questionType: questionTypeOptions?.find(
        (type: any) => type?.value === ques?.questionType,
      ),
      text: ques?.options?.map((option) => ({
        text: option?.text,
      })),
      options: ques?.options?.map((option) => ({
        text: option?.text,
        index: option?.index,
      })),
      description: ques?.description,
      isRequired: !!ques?.isRequired,
    })),
  }));
};
export const surveyWatchArray = [
  'surveyTitle',
  'description',
  'displayName',
  'satisfactionSurveyLinkType',
  'customerSupportLinkType',
  'UUID',
] as const;
