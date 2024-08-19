import { useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import {
  dashboardWidgetsDynamic,
  newTicketsDropdownDynamic,
} from './Dashboard.data';

export const useDashboard = () => {
  const router = useRouter();
  const { user }: any = useAuth();
  const [openReportAnIssueModal, setOpenReportAnIssueModal] =
    useState<boolean>(false);

  const newTicketsDropdown = newTicketsDropdownDynamic?.(
    setOpenReportAnIssueModal,
    router,
  );
  const dashboardWidgets = dashboardWidgetsDynamic?.();

  return {
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    router,
    user,
    newTicketsDropdown,
    dashboardWidgets,
  };
};
