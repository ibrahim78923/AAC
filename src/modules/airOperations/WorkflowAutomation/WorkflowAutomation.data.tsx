import { SalesWorkflowIcon, ServiceWorkflowIcon } from '@/assets/icons';
import { Permissions } from '@/constants/permissions';
import { AIR_OPERATIONS } from '@/constants/routes';
import { PRODUCTS_LISTS } from '@/constants/strings';

export const workflowAutomationTypesDynamic = (data: any) => [
  {
    id: 1,
    avatar: <SalesWorkflowIcon />,
    type: 'Sales Workflow',
    purpose: 'Boost efficiency in sales. Quickly setup automated processes',
    link: AIR_OPERATIONS?.SALES_WORKFLOW,
    permission: Permissions?.AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW,
    hasAccount: !!data?.data?.find(
      (account: any) => account?.name === PRODUCTS_LISTS?.AIR_SALES,
    )?.accounts?.length,
  },
  {
    id: 2,
    avatar: <ServiceWorkflowIcon />,
    type: 'Service Workflow',
    purpose:
      'Automated workflows for services by setting up event, conditions and actions',
    link: AIR_OPERATIONS?.SERVICES_WORKFLOW,
    permission: Permissions?.AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW,
    hasAccount: !!data?.data?.find(
      (account: any) => account?.name === PRODUCTS_LISTS?.AIR_SERVICES,
    )?.accounts?.length,
  },
];
