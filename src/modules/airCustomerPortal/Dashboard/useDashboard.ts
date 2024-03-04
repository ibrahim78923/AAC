import { useState } from 'react';
import { useRouter } from 'next/router';
import { dashboardWidgetsFunction } from './Dashboard.data';

export const useDashboard = () => {
  const { push } = useRouter();

  const dashboardWidgets = dashboardWidgetsFunction();
  const [openReportAnIssueModal, setOpenReportAnIssueModal] =
    useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleButtonClick = (event: any) => {
    setAnchorEl(event?.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
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
    push,
  };
};
