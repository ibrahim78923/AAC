import {
  useLazyGetUsersDropdownQuery,
  usePostApprovalTicketsMutation,
} from '@/services/airServices/tickets/single-ticket-details/approvals';

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

export const useAddRequestApproval = (props: any) => {
  const { setIsDrawerOpen } = props;
  const router = useRouter();
  const { user }: any = useAuth();
  const { ticketId } = router?.query;
  const [postApprovalTicketsTrigger, postApprovalTicketsStatus] =
    usePostApprovalTicketsMutation();

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
    } catch (error) {
      errorSnackbar();
      onClose?.();
    }
  };

  const onClose = () => {
    reset();
    setIsDrawerOpen(false);
  };

  const apiQueryApprover = useLazyGetUsersDropdownQuery();
  const addRequestApprovalFormFields =
    addRequestApprovalFormFieldsDynamic(apiQueryApprover);

  return {
    methods,
    handleSubmit,
    onClose,
    onSubmit,
    addRequestApprovalFormFields,
    postApprovalTicketsStatus,
  };
};
