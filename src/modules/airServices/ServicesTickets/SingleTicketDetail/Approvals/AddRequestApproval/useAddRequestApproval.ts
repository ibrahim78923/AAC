import {
  useLazyGetUsersDropdownQuery,
  usePostApprovalTicketsMutation,
} from '@/services/airServices/tickets/single-ticket-details/approvals';
import {
  defaultValues,
  addRequestApprovalValidationSchema,
  addRequestApprovalFormFieldsDynamic,
} from './AddRequestApproval.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';

export const useAddRequestApproval = (props: any) => {
  const { setIsDrawerOpen } = props;
  const router = useRouter();
  const { ticketId } = router?.query;
  const [postApprovalTicketsTrigger, postApprovalTicketsStatus] =
    usePostApprovalTicketsMutation();

  const methods = useForm<any>({
    resolver: yupResolver(addRequestApprovalValidationSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    // console.log(data);

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
    addRequestApprovalValidationSchema,
    defaultValues,
    enqueueSnackbar,
    handleSubmit,
    onClose,
    onSubmit,
    addRequestApprovalFormFields,
    postApprovalTicketsStatus,
  };
};
