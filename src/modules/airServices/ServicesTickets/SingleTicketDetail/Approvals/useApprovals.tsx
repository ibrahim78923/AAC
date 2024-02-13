import { PAGINATION } from '@/config';
// import { useLazyGetApprovalsTicketsQuery } from '@/services/airServices/tickets/single-ticket-details/approvals';
import { errorSnackbar, successSnackbar } from '@/utils/api';
// import { useRouter } from 'next/router';
import { useState } from 'react';

export const useApprovals = () => {
  // const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState({});
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [status, setStatus] = useState('ALL');

  // const [lazyGetTicketsTrigger, lazyGetTicketsStatus] =
  //   useLazyGetApprovalsTicketsQuery();

  // const { ticketId } = router?.query;
  // const getApprovalsTicketsParameter = {
  //   queryParams: {
  //     id: ticketId,
  //     approvalStatus: status,
  //   },
  // };

  // const getValueApprovalsTicketsListData = async () => {
  //   try {
  //     await lazyGetTicketsTrigger(getApprovalsTicketsParameter)?.unwrap();
  //   } catch (error: any) {}
  // };
  const setApproval = (approval: any) => {
    setSelectedApproval(approval);
    setIsConfirmModalOpen(true);
  };

  // useEffect(() => {
  //   getValueApprovalsTicketsListData();
  // }, []);

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
