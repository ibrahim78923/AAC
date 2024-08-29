import {
  MarketingReportIcon,
  SalesReportIcon,
  ServiceReportIcon,
} from '@/assets/icons';
import { AIR_OPERATIONS } from '@/constants';
import { Permissions } from '@/constants/permissions';
import { PRODUCTS_LISTS } from '@/constants/strings';

export const reportsTypesDynamic = (data: any) => [
  {
    id: 1,
    avatar: <SalesReportIcon />,
    type: 'Sales Reports',
    purpose: 'Overview Sales Reports',
    link: AIR_OPERATIONS?.SALES_REPORTS,
    permission: Permissions?.AIR_OPERATION_REPORTS_SALES,
    hasAccount: !!data?.data?.find(
      (account: any) => account?.name === PRODUCTS_LISTS?.AIR_SALES,
    )?.accounts?.length,
    productId: data?.data?.find(
      (account: any) => account?.name === PRODUCTS_LISTS?.AIR_SALES,
    )?._id,
  },
  {
    id: 2,
    avatar: <ServiceReportIcon />,
    type: 'Service Reports',
    purpose: 'Overview Service Reports',
    link: AIR_OPERATIONS?.SERVICES_REPORTS,
    permission: Permissions?.AIR_OPERATION_REPORTS_SERVICES,
    hasAccount: !!data?.data?.find(
      (account: any) => account?.name === PRODUCTS_LISTS?.AIR_SERVICES,
    )?.accounts?.length,
    productId: data?.data?.find(
      (account: any) => account?.name === PRODUCTS_LISTS?.AIR_SERVICES,
    )?._id,
  },
  {
    id: 3,
    avatar: <MarketingReportIcon />,
    type: 'Marketing Reports',
    purpose: 'Overview Marketing Reports',
    link: AIR_OPERATIONS?.MARKETING_REPORTS,
    permission: Permissions?.AIR_OPERATION_REPORTS_MARKETING,
    hasAccount: !!data?.data?.find(
      (account: any) => account?.name === PRODUCTS_LISTS?.AIR_MARKETER,
    )?.accounts?.length,
    productId: data?.data?.find(
      (account: any) => account?.name === PRODUCTS_LISTS?.AIR_MARKETER,
    )?._id,
  },
];
