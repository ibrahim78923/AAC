import {
  FeedbackCompletionIcon,
  FeedbackDownIcon,
  FeedbackDropoutIcon,
  FeedbackUpIcon,
  FeedbackViewIcon,
} from '@/assets/icons';
import { SURVEY_WIDGET_IDS } from '../AllResponses/AllResponses.data';

export const surveyWidgetsData: any = (data?: any, theme?: any) => {
  return [
    {
      id: 1,
      status: 'Viewed',
      rate: data?.[SURVEY_WIDGET_IDS?.VIEWED],
      hasStatusIcon: true,
      statusIcon: FeedbackUpIcon,
      rateIcon: FeedbackViewIcon,
      progress: '50',
      progressColor: theme?.palette?.primary?.dark,
    },
    {
      id: 2,
      status: 'Dropout',
      rate: data?.[SURVEY_WIDGET_IDS?.DROPOUT],
      hasStatusIcon: true,
      statusIcon: FeedbackDownIcon,
      rateIcon: FeedbackDropoutIcon,
      progress: '60',
      progressColor: theme?.palette?.warning?.main,
    },
    {
      id: 4,
      status: 'Completion rate',
      rate: data?.[SURVEY_WIDGET_IDS?.COMPLETION_RATE],
      hasSpinner: false,
      hasStatusIcon: true,
      statusIcon: FeedbackUpIcon,
      rateIcon: FeedbackCompletionIcon,
    },
  ];
};
