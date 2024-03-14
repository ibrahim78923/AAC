import { useEffect, useState } from 'react';
import { PAGINATION } from '@/config';
import { useSearchParams } from 'next/navigation';
import { useLazyGetApprovalRequestsQuery } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/approvals';
import { errorSnackbar } from '@/utils/api';
import { getSession } from '@/utils';
import { useTheme } from '@mui/material';

export const useApprovals = () => {
  const theme: any = useTheme();
  const searchParams = useSearchParams();
  const purchaseOrderId: any = searchParams.get('purchaseOrderId');
  const { user } = getSession();
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const getApprovalRequestsParam = new URLSearchParams();
  getApprovalRequestsParam?.append('page', page + '');
  getApprovalRequestsParam?.append('limit', pageLimit + '');
  getApprovalRequestsParam?.append('id', purchaseOrderId);
  const [lazyGetApprovalRequestsTrigger, lazyGetApprovalRequestsStatus]: any =
    useLazyGetApprovalRequestsQuery();
  const approvalsList =
    lazyGetApprovalRequestsStatus?.data?.data?.purchaseapprovals;
  const approvalsListMetaData = lazyGetApprovalRequestsStatus?.data?.data?.meta;
  const getApprovalRequestsListData = async () => {
    const apiParams = {
      params: getApprovalRequestsParam,
      purchaseOrderId,
    };
    try {
      await lazyGetApprovalRequestsTrigger(apiParams)?.unwrap();
    } catch (error: any) {
      errorSnackbar();
    }
  };
  useEffect(() => {
    if (purchaseOrderId) {
      getApprovalRequestsListData();
    }
  }, [page, pageLimit, purchaseOrderId]);
  return {
    lazyGetApprovalRequestsStatus,
    approvalsList,
    theme,
    setOpenDialog,
    page,
    pageLimit,
    setPageLimit,
    setPage,
    approvalsListMetaData,
    openDialog,
    user,
  };
};
