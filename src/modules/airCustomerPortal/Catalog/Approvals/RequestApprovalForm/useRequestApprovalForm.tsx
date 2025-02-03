import { TICKET_APPROVALS } from '@/constants/strings';
import * as Yup from 'yup';
import { ConfirmModalPropsI } from '../AllApprovals/AllApprovals.interface';
import { useUpdateTicketsApprovalCustomerPortalMutation } from '@/services/airCustomerPortal/catalog';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';

export const useRequestApprovalForm = (props: ConfirmModalPropsI) => {
  const {
    setIsConfirmModalOpen,
    selectedApproval,
    setSelectedApproval,
    refetch,
  } = props;

  const [patchApprovalTicketsTrigger, patchApprovalTicketsStatus] =
    useUpdateTicketsApprovalCustomerPortalMutation();

  const useFormValues = {
    defaultValues: {
      reason: '',
    },
    validationSchema: Yup?.object()?.shape({
      reason: Yup?.string()?.trim()?.required('Remark is required'),
    }),
  };

  const { handleSubmit, reset, methods } = useFormLib(useFormValues);

  const submitRequestConfirm = async (data: any) => {
    const patchParameterData = {
      queryParams: {
        reason: data?.reason,
        id: selectedApproval?._id,
        ticketId: selectedApproval?.ticketId,
        approvalStatus: selectedApproval?.state,
      },
    };
    const toastMessage =
      selectedApproval?.state === TICKET_APPROVALS?.APPROVE
        ? 'Request approved successfully'
        : 'Request rejected successfully';
    try {
      await patchApprovalTicketsTrigger(patchParameterData)?.unwrap();
      successSnackbar?.(toastMessage);
      setModalClose?.();
      refetch?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const setModalClose = () => {
    reset();
    setSelectedApproval?.({});
    setIsConfirmModalOpen(false);
  };

  return {
    handleSubmit,
    reset,
    methods,
    setModalClose,
    submitRequestConfirm,
    patchApprovalTicketsStatus,
  };
};
