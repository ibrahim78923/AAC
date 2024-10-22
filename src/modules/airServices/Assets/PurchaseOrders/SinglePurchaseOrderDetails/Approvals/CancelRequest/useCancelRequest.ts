import { usePatchAirServicesAssetsPurchaseOrderApprovalRequestApprovalMutation } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/approvals';
import { approvalStatus } from '../Approvals.data';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useCancelRequest = () => {
  const [patchRequestApprovalTrigger, patchRequestApprovalStatus] =
    usePatchAirServicesAssetsPurchaseOrderApprovalRequestApprovalMutation();

  const onCancel = async (approvalId: any) => {
    const params = new URLSearchParams();
    params?.append('id', approvalId);
    params?.append('approvalStatus', approvalStatus?.[2]);
    try {
      await patchRequestApprovalTrigger(params)?.unwrap();
      successSnackbar('Cancelled Successfully!');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    onCancel,
    patchRequestApprovalStatus,
  };
};
