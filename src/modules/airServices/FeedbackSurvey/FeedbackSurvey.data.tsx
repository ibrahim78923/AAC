import { CustomerSatisfactionIcon, CustomerSupportIcon } from '@/assets/icons';
import { CustomerSupport } from './CustomerSupport';
import { CustomerSatisfaction } from './CustumerSatisfaction';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';
import { FEEDBACK_SURVEY_PATH_TYPES } from '@/constants/strings';

export const feedbackCards = [
  {
    id: 1,
    title: 'Customer Support',
    description:
      'Start from scratch and build your own bespoke survey to gain insights into your customers experience.',
    avatar: CustomerSupportIcon,
    query: FEEDBACK_SURVEY_PATH_TYPES?.CUSTOMER_SUPPORT,
  },
  {
    id: 2,
    title: 'Customer Satisfaction ',
    description:
      'Use a CES (Customer Effort Score) survey  to discover how easy it is for your customers to find help when they need it.',
    avatar: CustomerSatisfactionIcon,
    query: FEEDBACK_SURVEY_PATH_TYPES?.CUSTOMER_SATISFACTION,
  },
];
export const feedbackComponent = {
  [FEEDBACK_SURVEY_PATH_TYPES?.CUSTOMER_SUPPORT]: (
    <PermissionsGuard
      permissions={Permissions?.AIR_SERVICES_CUSTOMER_SUPPORT_FEEDBACK_SURVEY}
    >
      <CustomerSupport />
    </PermissionsGuard>
  ),
  [FEEDBACK_SURVEY_PATH_TYPES?.CUSTOMER_SATISFACTION]: (
    <PermissionsGuard
      permissions={
        Permissions?.AIR_SERVICES_CUSTOMER_SATISFACTION_FEEDBACK_SURVEY
      }
    >
      <CustomerSatisfaction />
    </PermissionsGuard>
  ),
};
