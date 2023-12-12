import { SalesWorkflowIcon, ServiceWorkflowIcon } from '@/assets/icons';
import { AIR_OPERATIONS } from '@/constants';

export const workflowAutomationTypes = [
  {
    id: 1,
    avatar: <SalesWorkflowIcon />,
    type: 'Sales Workflow',
    purpose: 'Boost efficiency in sales. Quickly setup automated processes',
    link: AIR_OPERATIONS?.SALES_WORKFLOW,
  },
  {
    id: 2,
    avatar: <ServiceWorkflowIcon />,
    type: 'Service Workflow',
    purpose:
      'Automated workflows for services by setting up event, conditions and actions',
    link: AIR_OPERATIONS?.SERVICES_WORKFLOW,
  },
];
