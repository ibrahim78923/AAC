import { CustomerSatisfactionIcon, CustomerSupportIcon } from '@/assets/icons';
import { CustomerSupport } from './CustomerSupport';
import { CustomerSatisfaction } from './CustumerSatisfaction';

export const feedbackCards = [
  {
    id: 1,
    title: 'Customer Support',
    description:
      'Start from scratch and build your own bespoke survey to gain insights into your customers experience.',
    avatar: CustomerSupportIcon,
  },
  {
    id: 2,
    title: 'Customer Satisfaction ',
    description:
      'Use a CES (Customer Effort Score) survey  to discover how easy it is for your customers to find help when they need it.',
    avatar: CustomerSatisfactionIcon,
  },
];
export const feedbackComponent: any = {
  [1]: <CustomerSupport />,
  [2]: <CustomerSatisfaction />,
};
