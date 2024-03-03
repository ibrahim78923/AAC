import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema, defaultValues } from './RequestApprovalForm.data';
import { useLazyGetAgentsQuery } from '@/services/dropdowns';
import { usePostRequestApprovalMutation } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/approvals';
import { useSearchParams } from 'next/navigation';
import { errorSnackbar, successSnackbar } from '@/utils/api';
export const useRequestApprovalForm = (props: any) => {
  const { openDialog, setOpenDialog } = props;
  const apiQueryAgents = useLazyGetAgentsQuery();
  const searchParams = useSearchParams();
  const purchaseOrderId: any = searchParams.get('purchaseOrderId');
  const [postRequestApprovalTrigger, postRequestApprovalStatus] =
    usePostRequestApprovalMutation();
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    const params = new URLSearchParams();
    params?.append('id', data?.approvers?._id);
    params?.append('purchaseId', purchaseOrderId);
    try {
      await postRequestApprovalTrigger(params)?.unwrap();
      successSnackbar('Approval Requested Successfully!');
      setOpenDialog(false);
      reset(defaultValues);
    } catch (error: any) {
      errorSnackbar();
    }
  };
  return {
    openDialog,
    setOpenDialog,
    methods,
    handleSubmit,
    onSubmit,
    postRequestApprovalStatus,
    apiQueryAgents,
  };
};
