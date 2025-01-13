import {
  MarketingReportIcon,
  SalesReportIcon,
  ServiceReportIcon,
} from '@/assets/icons';
import { Permissions } from '@/constants/permissions';
import { AIR_OPERATIONS } from '@/constants/routes';
import { GENERIC_REPORT_MODULES, PRODUCTS_LISTS } from '@/constants/strings';

export const reportsTypesDynamic = (productsLists: any) => {
  return [
    {
      id: 1,
      avatar: SalesReportIcon,
      type: 'Sales Reports',
      purpose: 'Overview Sales Reports',
      link: AIR_OPERATIONS?.REPORTS_LIST,
      permission: Permissions?.AIR_OPERATION_REPORTS_SALES,
      findAccount: productsLists?.[PRODUCTS_LISTS?.AIR_SALES],
      baseModule: GENERIC_REPORT_MODULES?.SALES,
    },
    {
      id: 2,
      avatar: ServiceReportIcon,
      type: 'Service Reports',
      purpose: 'Overview Service Reports',
      link: AIR_OPERATIONS?.REPORTS_LIST,
      permission: Permissions?.AIR_OPERATION_REPORTS_SERVICES,
      findAccount: productsLists?.[PRODUCTS_LISTS?.AIR_SERVICES],
      baseModule: GENERIC_REPORT_MODULES?.SERVICES,
    },
    {
      id: 3,
      avatar: MarketingReportIcon,
      type: 'Marketing Reports',
      purpose: 'Overview Marketing Reports',
      link: AIR_OPERATIONS?.REPORTS_LIST,
      permission: Permissions?.AIR_OPERATION_REPORTS_MARKETING,
      findAccount: productsLists?.[PRODUCTS_LISTS?.AIR_MARKETER],
      baseModule: GENERIC_REPORT_MODULES?.MARKETING,
    },
  ];
};
