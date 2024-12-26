import { useUpdateSingleServicesTicketsApprovalMutation } from '@/services/airServices/tickets/single-ticket-details/approvals';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setIsPortalClose } from '@/redux/slices/airServices/tickets-approvals/slice';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';
import {
  updateRequestStatusDefaultValues,
  updateRequestStatusValidationSchema,
} from './UpdateRequestStatus.data';

export const useUpdateRequestStatus = () => {
  const [patchApprovalTicketsTrigger, patchApprovalTicketsStatus] =
    useUpdateSingleServicesTicketsApprovalMutation();

  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTicketApprovals?.isPortalOpen,
  );

  const formLibProps = {
    validationSchema: updateRequestStatusValidationSchema,
    defaultValues: updateRequestStatusDefaultValues,
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const submitRequestConfirm = async (data: any) => {
    const patchParameterData = {
      queryParams: {
        reason: data?.reason,
        id: isPortalOpen?.data?._id,
        ticketId: isPortalOpen?.data?.ticketId,
        approvalStatus: isPortalOpen?.data?.state,
      },
    };

    try {
      await patchApprovalTicketsTrigger(patchParameterData)?.unwrap();
      successSnackbar?.(
        `Request ${isPortalOpen?.data?.state?.toLowerCase()} successfully`,
      );
      setModalClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const setModalClose = () => {
    reset();
    dispatch(setIsPortalClose());
  };

  const dialogType = isPortalOpen?.data?.state;

  return {
    handleSubmit,
    reset,
    methods,
    setModalClose,
    submitRequestConfirm,
    patchApprovalTicketsStatus,
    dialogType,
    isPortalOpen,
  };
};
