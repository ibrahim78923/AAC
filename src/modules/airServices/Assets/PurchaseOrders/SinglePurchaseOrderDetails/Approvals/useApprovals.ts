import { useEffect, useState } from 'react';
import { PAGINATION } from '@/config';
import { useSearchParams } from 'next/navigation';
import {
  useLazyGetAirServicesAssetsPurchaseOrderApprovalApprovalRequestsQuery,
  usePostAirServicesAssetsPurchaseOrderApprovalRemindersMutation,
} from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/approvals';
import { useTheme } from '@mui/material';
import useAuth from '@/hooks/useAuth';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useApprovals = () => {
  const theme: any = useTheme();
  const searchParams = useSearchParams();
  const purchaseOrderId: any = searchParams?.get('purchaseOrderId');

  const { user }: any = useAuth();

  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const [lazyGetApprovalRequestsTrigger, lazyGetApprovalRequestsStatus]: any =
    useLazyGetAirServicesAssetsPurchaseOrderApprovalApprovalRequestsQuery();
  const [
    postPurchaseOrderApprovalRemindersTrigger,
    postPurchaseOrderApprovalRemindersStatus,
  ] = usePostAirServicesAssetsPurchaseOrderApprovalRemindersMutation();

  const approvalsList =
    lazyGetApprovalRequestsStatus?.data?.data?.purchaseapprovals;
  const approvalsListMetaData = lazyGetApprovalRequestsStatus?.data?.data?.meta;

  const getApprovalRequestsListData = async (currentPage = page) => {
    const getApprovalRequestsParam = new URLSearchParams();

    getApprovalRequestsParam?.append('page', currentPage + '');
    getApprovalRequestsParam?.append('limit', pageLimit + '');
    getApprovalRequestsParam?.append('id', purchaseOrderId);

    const apiParams = {
      params: getApprovalRequestsParam,
      purchaseOrderId,
    };
    try {
      await lazyGetApprovalRequestsTrigger(apiParams)?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    if (purchaseOrderId) {
      getApprovalRequestsListData();
    }
  }, [page, pageLimit, purchaseOrderId]);

  const sendReminderForPurchaseOrderApproval = async () => {
    try {
      await postPurchaseOrderApprovalRemindersTrigger({})?.unwrap();
      successSnackbar('Reminder Send Successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

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
    sendReminderForPurchaseOrderApproval,
    postPurchaseOrderApprovalRemindersStatus,
  };
};
