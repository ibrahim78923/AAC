import { FEEDBACK_STATUS } from '@/constants/strings';

export const surveyTypes: any = {
  customerSupport: 'Customer Support',
  customerSatisfaction: 'Customer Satisfaction',
};
export const feedbackStatusColor = (status: string) => {
  switch (status) {
    case FEEDBACK_STATUS?.PUBLISHED:
      return 'secondary';
    case FEEDBACK_STATUS?.DRAFT:
      return 'default';
    case FEEDBACK_STATUS?.INACTIVE:
      return 'warning';
    case FEEDBACK_STATUS?.EXPIRED:
      return 'error';
  }
};
export const feedbackStatusTextColor = (status: string) => {
  switch (status) {
    case FEEDBACK_STATUS?.PUBLISHED:
    case FEEDBACK_STATUS?.EXPIRED:
      return 'common.white';
    default:
      return 'common.black';
  }
};
