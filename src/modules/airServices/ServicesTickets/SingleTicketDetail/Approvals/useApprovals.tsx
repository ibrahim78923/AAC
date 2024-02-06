import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useState } from 'react';

export const useApprovals = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState({});
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [status, setStatus] = useState('');

  const setApproval = (approval: any) => {
    setSelectedApproval(approval);
    setIsConfirmModalOpen(true);
  };

  const updateRequestApprovalStatus = (approval: any) => {
    try {
      successSnackbar(approval?.state);
    } catch (error) {
      errorSnackbar();
    }
  };
  return {
    isDrawerOpen,
    setIsDrawerOpen,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    selectedApproval,
    setSelectedApproval,
    setApproval,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    status,
    setStatus,
    updateRequestApprovalStatus,
  };
};
