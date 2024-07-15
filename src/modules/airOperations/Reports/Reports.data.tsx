import {
  MarketingReportIcon,
  SalesReportIcon,
  ServiceReportIcon,
} from '@/assets/icons';
import { AIR_OPERATIONS } from '@/constants';
import { Permissions } from '@/constants/permissions';

export const reportsTypes = [
  {
    id: 1,
    avatar: <SalesReportIcon />,
    type: 'Sales Reports',
    purpose: 'Overview Sales Reports',
    link: AIR_OPERATIONS?.SALES_REPORTS,
    permission: Permissions?.AIR_OPERATION_REPORTS_SALES,
  },
  {
    id: 2,
    avatar: <ServiceReportIcon />,
    type: 'Service Reports',
    purpose: 'Overview Service Reports',
    link: AIR_OPERATIONS?.SERVICES_REPORTS,
    permission: Permissions?.AIR_OPERATION_REPORTS_SERVICES,
  },
  {
    id: 3,
    avatar: <MarketingReportIcon />,
    type: 'Marketing Reports',
    purpose: 'Overview Marketing Reports',
    link: AIR_OPERATIONS?.MARKETING_REPORTS,
    permission: Permissions?.AIR_OPERATION_REPORTS_MARKETING,
  },
];
