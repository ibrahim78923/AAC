import * as Yup from 'yup';
export const feedbackSurveyValues = {
  surveyTitle: '',
  description: '',
  subject: '',
  displayName: '',
  customerSupportLinkType: 'viaEmail',
  sendSurveyPeople: [],
  magicLink: '',
  satisfactionSurveyLinkType: 'toAllAgents',
  section: [
    {
      title: '',
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
export const feedbackSurveyValidationSchema: any = Yup?.object()?.shape({
  surveyTitle: Yup?.string()?.required('Required'),
  description: Yup?.string()?.required('Required'),
  surveyDuration: Yup?.string(),
  customerSupportLinkType: Yup?.string(),
  sendSurveyPeople: Yup?.array(),
});
export const feedbackSurveyType: any = {
  ['customer-support']: 'customerSupport',
  ['customer-satisfaction']: 'customerSatisfaction',
};
