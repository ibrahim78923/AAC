import * as Yup from 'yup';
export const feedbackTypes = {
  createSurvey: 'createSurvey',
  saveQuestion: 'saveQuestion',
  linearScale: 'linearScale',
  text: 'text',
  shortAnswers: 'shortAnswers',
};
export const questionTypeOptions = [
  {
    label: 'Multiple Choice',
    value: 'multipleChoice',
  },
  {
    label: 'Check Boxes',
    value: 'checkboxes',
  },
  {
    label: 'Short Answers',
    value: 'shortAnswers',
  },
  {
    label: 'Linear Scale',
    value: 'linearScale',
  },
  {
    value: 'text',
  },
];
export const feedbackSurveyValues = (data: any) => {
  return {
    surveyTitle: data?.surveyTitle ?? '',
    description: data?.description ?? '',
    subject: data?.subject ?? '',
    display: !!data?.displayName ?? false,
    displayName: data?.displayName ?? '',
    customerSupportLinkType: data?.customerSupportLinkType ?? 'viaEmail',
    sendSurveyPeople: data?.sendSurveyPeople ?? [],
    magicLink: data?.magicLink ?? '',
    satisfactionSurveyLinkType:
      data?.satisfactionSurveyLinkType ?? 'toAllAgents',
    sections: data?.sections?.map((section: any) => ({
      id: section?._id ?? '',
      heading: section?.heading ?? '',
      description: section?.description ?? '',
      questions: !!section?.questions?.length
        ? section?.questions?.map((question: any) => ({
            id: question?._id ?? '',
            questionTitle: question?.questionTitle ?? '',
            questionType: questionTypeOptions?.find(
              (type: any) => type?.value === question?.questionType,
            ) ?? {
              label: 'Multiple Choice',
              value: 'multipleChoice',
            },
            text: question?.options?.map((text: any) => ({
              text: text?.text ?? '',
            })) ?? [{ text: '1' }],
            options: question?.options?.map((option: any) => ({
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
export const feedbackSurveyValidationSchema: any = (createSurvey: boolean) =>
  Yup?.object()?.shape({
    surveyTitle: Yup?.string()?.required('Required'),
    description: Yup?.string()?.required('Required'),
    surveyDuration: Yup?.string(),
    customerSupportLinkType: Yup?.string(),
    sendSurveyPeople: Yup?.array(),
    sections: Yup?.array()?.of(
      Yup?.object()?.shape({
        heading: createSurvey
          ? Yup?.string()?.required('Required')
          : Yup?.string(),
        description: Yup?.string(),
        questions: Yup?.array()?.of(
          Yup?.object()?.shape({
            questionTitle: createSurvey
              ? Yup?.string()?.required('Required')
              : Yup?.string(),
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

export const apiSectionData = (data: any) => {
  const section = data?.data?.sections;
  return section?.map((item: any) => ({
    heading: item?.heading,
    description: item?.description,
    id: item?._id,
    questions: item?.questions?.map((ques: any) => ({
      id: ques?._id,
      questionTitle: ques?.questionTitle,
      questionType: questionTypeOptions?.find(
        (type: any) => type?.value === ques?.questionType,
      ),
      text: ques?.options?.map((option: any) => ({
        text: option?.text,
      })),
      options: ques?.options?.map((option: any) => ({
        text: option?.text,
        index: option?.index,
      })),
      description: ques?.description,
      isRequired: !!ques?.isRequired,
    })),
  }));
};
