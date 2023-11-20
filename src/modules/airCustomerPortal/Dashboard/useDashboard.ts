import { useState } from 'react';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useRouter } from 'next/router';
import {
  dashboardWidgetsFunction,
  dashboardWidgetsTitles,
} from './Dashboard.data';

export const useDashboard = () => {
  const { TICKETS, KNOWLEDGE_BASE } = AIR_CUSTOMER_PORTAL;
  const { push } = useRouter();

  const handleViewMore = (widget: string) => {
    switch (widget) {
      case dashboardWidgetsTitles?.popularArticles: {
        return push(KNOWLEDGE_BASE);
      }
      case dashboardWidgetsTitles?.pendingApproval: {
        return;
      }
      case dashboardWidgetsTitles?.recentTickets: {
        return push(TICKETS);
      }
      default:
        return push(KNOWLEDGE_BASE);
    }
  };

  const dashboardWidgets = dashboardWidgetsFunction(handleViewMore);
  const [openReportAnIssueModal, setOpenReportAnIssueModal] =
    useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleButtonClick = (event: any) => {
    setAnchorEl(event?.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
    setOpenReportAnIssueModal(true);
  };

  return {
    dashboardWidgets,
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    open,
    setOpen,
    anchorEl,
    setAnchorEl,
    handleButtonClick,
    handleClose,
  };
};
