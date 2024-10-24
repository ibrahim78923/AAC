import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, UseFormReturn } from 'react-hook-form';
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

export const useEmailTicket = () => {
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTickets?.isPortalOpen,
  );

  const [
    sendServicesSingleTicketEmailTrigger,
    sendServicesSingleTicketEmailStatus,
  ] = useSendServicesSingleTicketEmailMutation();

  const methods: UseFormReturn<EmailTicketFormFieldsI> = useForm<
    EmailTicketFormFieldsI | any
  >({
    resolver: yupResolver(sendTicketEmailFormValidationSchema),
    defaultValues: sendTicketEmailFormDefaultValues,
  });

  const { handleSubmit, reset } = methods;

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
