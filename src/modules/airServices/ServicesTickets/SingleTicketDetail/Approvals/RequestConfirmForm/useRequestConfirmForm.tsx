import { TICKET_APPROVALS } from '@/constants/strings';
// import { usePatchApprovalTicketsMutation } from '@/services/airServices/tickets/single-ticket-details/approvals';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const useRequestConfirmForm = (props: any) => {
  const { setIsConfirmModalOpen, selectedApproval, setSelectedApproval } =
    props;

  // const [patchApprovalTicketsTrigger, patchApprovalTicketsStatus] =
  //   usePatchApprovalTicketsMutation();

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
  const submitRequestConfirm = async () => {
    const toastMessage =
      selectedApproval?.state === TICKET_APPROVALS?.APPROVE
        ? 'Request Approved successfully'
        : 'Request Rejected successfully';
    try {
      successSnackbar?.(toastMessage);
      setModalClose?.();
    } catch (error) {
      errorSnackbar();
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
  };
};
