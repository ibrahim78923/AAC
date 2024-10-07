import { AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS } from '@/constants/permission-keys';
import {
  getCustomerPortalPermissions,
  getCustomerPortalStyling,
} from '@/utils';
import { useState } from 'react';

export const useHeader = () => {
  const [openReportAnIssueModal, setOpenReportAnIssueModal] =
    useState<boolean>(false);
  const handleOpenModal = () => {
    setOpenReportAnIssueModal(true);
  };
  const customerPortalPermissions = getCustomerPortalPermissions();
  const reportAnIssuePermission =
    customerPortalPermissions?.customerPortalPermissions?.includes(
      AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SUBMIT_TICKET_BY_EVERYONE,
    );
  const customerPortalStyling = getCustomerPortalStyling();
  return {
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    handleOpenModal,
    reportAnIssuePermission,
    customerPortalStyling,
  };
};
