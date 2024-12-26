import { EmailTicketFormFieldsI } from './EmailTicket.interface';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
} from '@/redux/slices/airServices/tickets/slice';
import { useSendServicesSingleTicketEmailMutation } from '@/services/airServices/tickets/single-ticket-details/new-email';
import {
  sendTicketEmailFormDefaultValues,
  sendTicketEmailFormValidationSchema,
} from './EmailTicket.data';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { servicesTicketsIsPortalOpenSelector } from '@/redux/slices/airServices/tickets/selectors';
import { useFormLib } from '@/hooks/useFormLib';

export const useEmailTicket = () => {
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(servicesTicketsIsPortalOpenSelector);

  const [
    sendServicesSingleTicketEmailTrigger,
    sendServicesSingleTicketEmailStatus,
  ] = useSendServicesSingleTicketEmailMutation();

  const formLibProps = {
    defaultValues: sendTicketEmailFormDefaultValues,
    validationSchema: sendTicketEmailFormValidationSchema,
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const onClose = () => {
    reset();
    dispatch(emptySelectedTicketLists());
    dispatch(setIsPortalClose());
  };

  const onSubmit = async (data: EmailTicketFormFieldsI) => {
    const emailFormData = new FormData();
    emailFormData?.append('recipients', data?.recipients);
    emailFormData?.append('subject', data?.subject);
    emailFormData?.append('html', data?.html);

    try {
      await sendServicesSingleTicketEmailTrigger(emailFormData)?.unwrap();
      successSnackbar('Email sent successfully!');
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const apiCallInProgress = sendServicesSingleTicketEmailStatus?.isLoading;

  return {
    methods,
    handleSubmit,
    onSubmit,
    onClose,
    apiCallInProgress,
    isPortalOpen,
  };
};
