import { useAddSingleServicesTicketsApprovalMutation } from '@/services/airServices/tickets/single-ticket-details/approvals';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import {
  addRequestApprovalFormFieldsDynamic,
  addRequestApprovalValidationSchema,
  addRequestApprovalFormDefaultValues,
} from './AddRequestApproval.data';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setIsPortalClose } from '@/redux/slices/airServices/tickets-approvals/slice';

export const useAddRequestApproval = () => {
  const router = useRouter();
  const { user }: any = useAuth();
  const { ticketId } = router?.query;
  const [postApprovalTicketsTrigger, postApprovalTicketsStatus] =
    useAddSingleServicesTicketsApprovalMutation();
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTicketApprovals?.isPortalOpen,
  );
  const methods = useForm<any>({
    resolver: yupResolver(addRequestApprovalValidationSchema),
    defaultValues: addRequestApprovalFormDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    if (data?.subject?._id === user?._id) {
      errorSnackbar('You can not send approval to yourself');
      return;
    }
    const postApprovalTicketsParameters = {
      body: {
        recieverId: data?.subject?._id,
        ticketId: ticketId,
        description: data?.description,
      },
    };

    try {
      await postApprovalTicketsTrigger(postApprovalTicketsParameters)?.unwrap();
      successSnackbar('Request for approval sent successfully');
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const onClose = () => {
    reset();
    dispatch(setIsPortalClose());
  };

  const addRequestApprovalFormFields = addRequestApprovalFormFieldsDynamic();

  return {
    methods,
    handleSubmit,
    onClose,
    onSubmit,
    addRequestApprovalFormFields,
    postApprovalTicketsStatus,
    isPortalOpen,
  };
};
