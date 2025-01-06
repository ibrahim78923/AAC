import { validationSchema, defaultValues } from './RejectForm.data';
import { usePatchAirServicesAssetsPurchaseOrderApprovalRequestApprovalMutation } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/approvals';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { approvalStatus } from '../Approvals.data';
import { useState } from 'react';
import { useFormLib } from '@/hooks/useFormLib';

export const useRejectForm = (approvalId: any) => {
  const [rejectDialog, setRejectDialog] = useState(false);

  const useFormValues = {
    validationSchema,
    defaultValues,
  };

  const { handleSubmit, reset, methods } = useFormLib(useFormValues);
  const [patchRequestApprovalTrigger, patchRequestApprovalStatus] =
    usePatchAirServicesAssetsPurchaseOrderApprovalRequestApprovalMutation();

  const onSubmit = async (data: any) => {
    const params = new URLSearchParams();
    params?.append('id', approvalId);
    params?.append('approvalStatus', approvalStatus?.[1]);
    params?.append('reasons', data?.reason);
    try {
      await patchRequestApprovalTrigger(params)?.unwrap();
      successSnackbar('Rejected Successfully!');
      setRejectDialog(false);
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    setRejectDialog,
    rejectDialog,
    methods,
    handleSubmit,
    onSubmit,
    patchRequestApprovalStatus,
  };
};
