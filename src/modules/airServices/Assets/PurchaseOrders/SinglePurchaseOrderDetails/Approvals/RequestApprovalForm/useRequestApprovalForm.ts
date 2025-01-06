import { validationSchema, defaultValues } from './RequestApprovalForm.data';
import {
  useLazyGetAirServicesAssetsPurchaseOrderApprovalAgentsQuery,
  usePostAirServicesAssetsPurchaseOrderApprovalRequestApprovalMutation,
} from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/approvals';
import { useSearchParams } from 'next/navigation';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import useAuth from '@/hooks/useAuth';
import { useFormLib } from '@/hooks/useFormLib';

export const useRequestApprovalForm = (props: any) => {
  const { openDialog, setOpenDialog } = props;

  const apiQueryAgents =
    useLazyGetAirServicesAssetsPurchaseOrderApprovalAgentsQuery();

  const searchParams = useSearchParams();
  const purchaseOrderId: any = searchParams?.get('purchaseOrderId');

  const auth: any = useAuth();

  const { _id: productId } = auth?.product;

  const [postRequestApprovalTrigger, postRequestApprovalStatus] =
    usePostAirServicesAssetsPurchaseOrderApprovalRequestApprovalMutation();

  const useFormValues = {
    validationSchema,
    defaultValues,
  };

  const { handleSubmit, reset, methods } = useFormLib(useFormValues);

  const onSubmit = async (data: any) => {
    const params = new URLSearchParams();
    params?.append('id', data?.approvers?._id);
    params?.append('purchaseId', purchaseOrderId);
    try {
      await postRequestApprovalTrigger(params)?.unwrap();
      successSnackbar('Approval Requested Successfully!');
      setOpenDialog(false);
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
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
    productId,
  };
};
