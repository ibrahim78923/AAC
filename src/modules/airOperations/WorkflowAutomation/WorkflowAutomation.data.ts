import { AIR_OPERATIONS } from '@/constants';

export const workflowAutomationTypes = [
  {
    id: 1,
    avatar: '',
    type: 'Sales Workflow',
    purpose: 'Boost efficiency in sales. Quickly setup automated processes',
    link: AIR_OPERATIONS?.SALES_WORKFLOW,
  },
  {
    id: 2,
    avatar: '',
    type: 'Service Workflow',
    purpose:
      'Automated workflows for services by setting up event, conditions and actions',
    link: AIR_OPERATIONS?.SERVICES_WORKFLOW,
  },
  {
    id: 3,
    avatar: '',
    type: 'Marketing Workflow',
    purpose:
      'Maximize efficiency with marketing. Swiftly establish automate processes to save valuable time',
    link: AIR_OPERATIONS?.MARKETING_WORKFLOW,
  },
];
