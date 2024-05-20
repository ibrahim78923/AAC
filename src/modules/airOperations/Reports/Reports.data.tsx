import { SalesWorkflowIcon, ServiceWorkflowIcon } from '@/assets/icons';
import { AIR_OPERATIONS } from '@/constants';

export const reportsTypes = [
  {
    id: 1,
    avatar: <SalesWorkflowIcon />,
    type: 'Sales Reports',
    purpose: 'Overview Sales Reports',
    link: AIR_OPERATIONS?.SALES_REPORTS,
  },
  {
    id: 2,
    avatar: <ServiceWorkflowIcon />,
    type: 'Service Reports',
    purpose: 'Overview Service Reports',
    link: AIR_OPERATIONS?.SERVICES_REPORTS,
  },
  {
    id: 3,
    avatar: <ServiceWorkflowIcon />,
    type: 'Marketing Reports',
    purpose: 'Overview Marketing Reports',
    link: AIR_OPERATIONS?.SERVICES_REPORTS,
  },
];
