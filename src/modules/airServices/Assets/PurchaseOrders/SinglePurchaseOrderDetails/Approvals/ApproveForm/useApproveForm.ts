import { validationSchema, defaultValues } from './ApproveForm.data';
import { usePatchAirServicesAssetsPurchaseOrderApprovalRequestApprovalMutation } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/approvals';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { approvalStatus } from '../Approvals.data';
import { useState } from 'react';
import { useFormLib } from '@/hooks/useFormLib';

export const useApproveForm = (approvalId: any) => {
  const [approveDialog, setApproveDialog] = useState(false);

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
    params?.append('approvalStatus', approvalStatus?.[0]);
    params?.append('reasons', data?.reason);
    try {
      await patchRequestApprovalTrigger(params)?.unwrap();
      successSnackbar('Approved Successfully!');
      setApproveDialog(false);
      reset(defaultValues);
    } catch (error: any) {
      errorSnackbar();
    }
  };

  return {
    approveDialog,
    setApproveDialog,
    methods,
    handleSubmit,
    onSubmit,
    patchRequestApprovalStatus,
  };
};
