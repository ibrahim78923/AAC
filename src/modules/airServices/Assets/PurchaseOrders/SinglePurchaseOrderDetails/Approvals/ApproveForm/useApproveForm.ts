import { validationSchema, defaultValues } from './ApproveForm.data';
import { usePatchAirServicesAssetsPurchaseOrderApprovalRequestApprovalMutation } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/approvals';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';
import { capitalizeFirstWord } from '@/utils/api';

export const useApproveForm = (props: any) => {
  const { isPortalOpen, setIsPortalOpen } = props;

  const useFormValues = {
    validationSchema,
    defaultValues,
  };

  const { handleSubmit, reset, methods } = useFormLib(useFormValues);

  const [patchRequestApprovalTrigger, patchRequestApprovalStatus] =
    usePatchAirServicesAssetsPurchaseOrderApprovalRequestApprovalMutation();

  const closePortal = () => {
    setIsPortalOpen({
      isOpen: false,
      action: '',
      id: '',
    });
    reset();
  };

  const onSubmit = async (data: any) => {
    const params = new URLSearchParams();
    params?.append('id', isPortalOpen?.id);
    params?.append('approvalStatus', isPortalOpen?.action);
    params?.append('reasons', data?.reason);
    try {
      await patchRequestApprovalTrigger(params)?.unwrap();
      successSnackbar(
        `${capitalizeFirstWord(isPortalOpen?.action)} successfully!`,
      );
      closePortal();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const apiCallInProgress = patchRequestApprovalStatus?.isLoading;
  return {
    methods,
    handleSubmit,
    onSubmit,
    patchRequestApprovalStatus,
    closePortal,
    apiCallInProgress,
  };
};
