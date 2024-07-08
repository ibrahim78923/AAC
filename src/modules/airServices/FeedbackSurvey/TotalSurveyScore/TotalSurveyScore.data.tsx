import { FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE } from '@/constants/strings';

export const FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE_DESCRIPTION = {
  [FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.EXCELLENT]: {
    title: `This rating indicates an outstanding performance.`,
    description: `Respondents are extremely satisfied with the service, showing that you are excelling in keeping your people happy and effectively addressing the topics covered in the survey.`,
  },
  [FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.VERY_GOOD]: {
    title: `This rating signifies a very positive outcome. `,
    description: `The overall average of these scaled answers indicates that you are doing a commendable job in maintaining high levels of satisfaction among your people, particularly in relation to the areas highlighted in the survey.`,
  },
  [FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.GOOD]: {
    title: `This rating reflects a generally positive result. `,
    description: `It shows that you are performing well in keeping your people content, although there may be some areas for improvement based on the survey feedback.`,
  },
  [FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.SATISFIED]: {
    title: `This rating suggests a moderate level of satisfaction. `,
    description: `While you are meeting the basic expectations, there is significant room for enhancement to better address the concerns and improve overall happiness among your people as identified in the survey.`,
  },
  [FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.UN_SATISFIED]: {
    title: `This rating indicates a need for substantial improvement. `,
    description: `Respondents are generally unhappy with the current situation, highlighting that immediate attention and action are required to address the issues raised in the survey and enhance overall satisfaction.`,
  },
};
