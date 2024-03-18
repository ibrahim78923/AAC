import { usePatchRequestApprovalMutation } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/approvals';
import { approvalStatus } from '../Approvals.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useCancelRequest = () => {
  const [patchRequestApprovalTrigger, patchRequestApprovalStatus] =
    usePatchRequestApprovalMutation();
  const onCancel = async (approvalId: any) => {
    const params = new URLSearchParams();
    params?.append('id', approvalId);
    params?.append('approvalStatus', approvalStatus?.[2]);
    try {
      await patchRequestApprovalTrigger(params)?.unwrap();
      successSnackbar('Cancelled Successfully!');
    } catch (error: any) {
      errorSnackbar();
    }
  };
  return {
    onCancel,
    patchRequestApprovalStatus,
  };
};
