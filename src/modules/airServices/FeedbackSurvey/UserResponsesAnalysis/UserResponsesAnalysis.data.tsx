import {
  FEEDBACK_SURVEY_QUESTION_LINEAR_SCALE,
  FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE,
  FEEDBACK_SURVEY_QUESTION_TYPE,
  PERCENTAGES_VALUES,
} from '@/constants/strings';
import { SingleSelectionResponse } from './SingleSelectionResponse';
import { ShortAnswersResponse } from './ShortAnswersResponse';
import { MultipleSelectionResponse } from './MultipleSelectionResponse';

export const FEEDBACK_SURVEY_QUESTION_TYPE_COMPONENT: any = {
  [FEEDBACK_SURVEY_QUESTION_TYPE?.MULTIPLE_CHOICE]: MultipleSelectionResponse,
  [FEEDBACK_SURVEY_QUESTION_TYPE?.SHORT_ANSWERS]: ShortAnswersResponse,
  [FEEDBACK_SURVEY_QUESTION_TYPE?.LINEAR_SCALE]: SingleSelectionResponse,
  [FEEDBACK_SURVEY_QUESTION_TYPE?.CHECK_BOXES]: MultipleSelectionResponse,
};

export const progressBarColors: any = {
  [FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.EXCELLENT]: 'success.main',
  [FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.VERY_GOOD]: 'warning.main',
  [FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.GOOD]: 'error.main',
  [FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.SATISFIED]: 'info.main',
  [FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.UN_SATISFIED]: 'primary.main',
};

export const progressBarColorsLinearScale: any = {
  [FEEDBACK_SURVEY_QUESTION_LINEAR_SCALE?.STRONGLY_AGREE]: 'success.main',
  [FEEDBACK_SURVEY_QUESTION_LINEAR_SCALE?.AGREE]: 'primary.main',
  [FEEDBACK_SURVEY_QUESTION_LINEAR_SCALE?.NEUTRAL]: 'info.main',
  [FEEDBACK_SURVEY_QUESTION_LINEAR_SCALE?.DISAGREE]: 'warning.main',
  [FEEDBACK_SURVEY_QUESTION_LINEAR_SCALE?.STRONGLY_DISAGREE]: 'error.main',
};

export const dynamicProgressBarColor = (percentage: any) => {
  if (percentage < PERCENTAGES_VALUES?.TWENTY) return 'error.main';
  if (percentage < PERCENTAGES_VALUES?.FORTY) return 'warning.main';
  if (percentage < PERCENTAGES_VALUES?.SIXTY) return 'info.main';
  if (percentage < PERCENTAGES_VALUES?.EIGHTY) return 'primary.main';
  return 'success.main';
};

export const userSatisfactionSection = [
  {
    question: 'How do you rate the service?',
    type: FEEDBACK_SURVEY_QUESTION_TYPE?.MULTIPLE_CHOICE,
    answers: [
      {
        option: 'Keyboards',
        value: 10,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.EXCELLENT,
      },
      {
        option: 'Mouse',
        value: 15,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.VERY_GOOD,
      },
      {
        option: 'Webcam',
        value: 25,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.GOOD,
      },
      {
        option: 'JUg',
        value: 19,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.SATISFIED,
      },
      {
        option: 'Juice',
        value: 21,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.UN_SATISFIED,
      },
    ],
  },
  {
    question: 'How do you rate the service?',
    type: FEEDBACK_SURVEY_QUESTION_TYPE?.CHECK_BOXES,
    answers: [
      {
        option: 'Keyboards',
        value: 10,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.EXCELLENT,
      },
      {
        option: 'Mouse',
        value: 15,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.VERY_GOOD,
      },
      {
        option: 'Webcam',
        value: 25,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.GOOD,
      },
      {
        option: 'JUg',
        value: 19,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.SATISFIED,
      },
      {
        option: 'Juice',
        value: 21,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.UN_SATISFIED,
      },
    ],
  },
  {
    question: 'How do you rate the service?',
    type: FEEDBACK_SURVEY_QUESTION_TYPE?.SHORT_ANSWERS,
    answers: [
      'How do you rate the service?',
      'How do you rate the service?',
      'How do you rate the service?',
      'How do you rate the service?',
      'How do you rate the service?',
      'How do you rate the service?',
    ],
  },
];

export const equipmentSection = [
  {
    question: 'How do you rate the service?',
    type: FEEDBACK_SURVEY_QUESTION_TYPE?.MULTIPLE_CHOICE,
    answers: [
      {
        option: 'Keyboards',
        value: 10,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.EXCELLENT,
      },
      {
        option: 'Mouse',
        value: 15,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.VERY_GOOD,
      },
      {
        option: 'Webcam',
        value: 25,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.GOOD,
      },
      {
        option: 'JUg',
        value: 19,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.SATISFIED,
      },
      {
        option: 'Juice',
        value: 21,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.UN_SATISFIED,
      },
    ],
  },
  {
    question: 'How do you rate the service?',
    type: FEEDBACK_SURVEY_QUESTION_TYPE?.CHECK_BOXES,
    answers: [
      {
        option: 'Keyboards',
        value: 10,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.EXCELLENT,
      },
      {
        option: 'Mouse',
        value: 15,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.VERY_GOOD,
      },
      {
        option: 'Webcam',
        value: 25,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.GOOD,
      },
      {
        option: 'JUg',
        value: 19,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.SATISFIED,
      },
      {
        option: 'Juice',
        value: 21,
        impact: FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE?.UN_SATISFIED,
      },
    ],
  },
  {
    question: 'How do you rate the service?',
    type: FEEDBACK_SURVEY_QUESTION_TYPE?.SHORT_ANSWERS,
    answers: [
      'How do you rate the service?',
      'How do you rate the service?',
      'How do you rate the service?',
      'How do you rate the service?',
      'How do you rate the service?',
      'How do you rate the service?',
    ],
  },
];

export const questionResponsesData = {
  userSatisfaction: userSatisfactionSection,
  equipmentSection: equipmentSection,
};
