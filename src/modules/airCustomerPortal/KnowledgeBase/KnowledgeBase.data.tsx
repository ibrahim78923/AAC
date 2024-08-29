import { SingleDropdownButtonCloseMenuI } from '@/components/SingleDropdownButton/SingleDropdownButton.interface';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

export const newTicketsDropdownDynamic = (
  setOpenReportAnIssueModal: Dispatch<SetStateAction<boolean>>,
  router: NextRouter,
) => [
  {
    id: 1,
    title: 'Report an issue',
    permissionKey: [
      AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS?.REPORT_AN_ISSUES,
    ],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setOpenReportAnIssueModal?.(true);
      closeMenu?.();
    },
  },
  {
    id: 2,
    title: 'Request a service',
    permissionKey: [
      AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS?.SENT_SERVICES_REQUEST,
    ],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      router?.push({
        pathname: AIR_CUSTOMER_PORTAL?.CATALOG_SERVICES,
      });
      closeMenu?.();
    },
  },
];
