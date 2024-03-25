import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { usePostReplyToConversationEmailMutation } from '@/services/airCustomerPortal/Tickets';

export const useSingleTicketForm = (props: any) => {
  const { singleTicketData } = props;

  const methods: any = useForm({
    defaultValues: { yourReply: '', attachFile: null },
    resolver: yupResolver(
      Yup?.object()?.shape({
        yourReply: Yup?.string()?.trim()?.required('Reply is required'),
        attachFile: Yup?.mixed()?.nullable(),
      }),
    ),
  });

  const [
    postReplyToConversationEmailTrigger,
    postReplyToConversationEmailStatus,
  ] = usePostReplyToConversationEmailMutation();
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    const emailFormData = new FormData();
    emailFormData?.append('recipients', singleTicketData?.agentDetails?.email);
    emailFormData?.append('html', data?.yourReply);
    emailFormData?.append('subject', singleTicketData?.subject);
    emailFormData?.append('type', 'REPLY');
    emailFormData?.append('recordId', singleTicketData?._id);
    data?.attachFile !== null &&
      emailFormData?.append('attachments', data?.attachFile);

    const apiDataParameter = {
      body: emailFormData,
    };

    try {
      await postReplyToConversationEmailTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Your reply has been sent!');
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const theme = useTheme();
  return {
    methods,
    handleSubmit,
    onSubmit,
    theme,
    postReplyToConversationEmailStatus,
  };
};
