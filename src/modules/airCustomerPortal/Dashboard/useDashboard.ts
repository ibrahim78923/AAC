import { useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import { dashboardWidgetsDynamic } from './Dashboard.data';
import { newTicketsDropdownDynamic } from '../Tickets/ReportIssue/ReportIssue.data';
import { getCustomerPortalStyling } from '@/utils';
import { useTheme } from '@emotion/react';

export const useDashboard = () => {
  const router = useRouter();
  const auth = useAuth();
  const { user }: any = auth;

  const [openReportAnIssueModal, setOpenReportAnIssueModal] =
    useState<boolean>(false);

  const newTicketsDropdown = newTicketsDropdownDynamic?.(
    setOpenReportAnIssueModal,
    router,
  );
  const colorChanger = getCustomerPortalStyling();
  const theme = useTheme();
  const dashboardWidgets = dashboardWidgetsDynamic?.();

  return {
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    router,
    user,
    newTicketsDropdown,
    dashboardWidgets,
    colorChanger,
    theme,
  };
};
