import { TICKET_APPROVALS } from '@/constants/strings';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { ConfirmModalPropsI } from '../AllApprovals/AllApprovals.interface';
import { updateSingleServicesTicketsApprovalCustomerPortal } from '@/services/airCustomerPortal/catalog';

export const useRequestApprovalForm = (props: ConfirmModalPropsI) => {
  const {
    setIsConfirmModalOpen,
    selectedApproval,
    setSelectedApproval,
    refetch,
  } = props;

  const [patchApprovalTicketsTrigger, patchApprovalTicketsStatus] =
    updateSingleServicesTicketsApprovalCustomerPortal();

  const methods = useForm({
    defaultValues: {
      reason: '',
    },
    resolver: yupResolver(
      Yup?.object()?.shape({
        reason: Yup?.string()?.trim()?.required('Required'),
      }),
    ),
  });

  const { handleSubmit, reset } = methods;
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
