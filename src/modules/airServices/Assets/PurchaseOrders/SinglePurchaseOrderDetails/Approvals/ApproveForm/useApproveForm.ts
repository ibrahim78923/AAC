import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema, defaultValues } from './ApproveForm.data';
import { usePatchRequestApprovalMutation } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/approvals';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { approvalStatus } from '../Approvals.data';
import { useState } from 'react';
export const useApproveForm = (approvalId: any) => {
  const [approveDialog, setApproveDialog] = useState(false);
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const [patchRequestApprovalTrigger, patchRequestApprovalStatus] =
    usePatchRequestApprovalMutation();

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
