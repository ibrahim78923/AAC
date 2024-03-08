import { useForm } from 'react-hook-form';
import {
  moveTicketsDefaultValue,
  moveTicketsFormFieldsDynamic,
} from './MoveTickets.data';
import { useRouter } from 'next/router';
import usePath from '@/hooks/usePath';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  useLazyGetAgentDropdownQuery,
  useLazyGetDepartmentDropdownQuery,
  usePutTicketsMutation,
} from '@/services/airServices/tickets';

export const useMoveTickets = (props: any) => {
  const router = useRouter();
  const { makePath } = usePath();
  const [putTicketTrigger, putTicketStatus] = usePutTicketsMutation();
  const {
    setIsMoveTicketsModalOpen,
    setSelectedTicketList,
    selectedTicketList,
  } = props;

  const moveTicketsFormMethod = useForm({
    defaultValues: moveTicketsDefaultValue,
  });

  const { handleSubmit, reset } = moveTicketsFormMethod;

  const submitMoveTicketsForm = async (data: any) => {
    const moveTicketFormData = new FormData();

    moveTicketFormData?.append('isChildTicket', false + '');
    moveTicketFormData?.append('id', selectedTicketList?.[0]);
    moveTicketFormData?.append('department', data?.department?._id);
    moveTicketFormData?.append('agent', data?.agent?._id);

    const putTicketParameter = {
      body: data,
    };

    try {
      await putTicketTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Ticket moved Successfully');
      setSelectedTicketList([]);
      closeMoveTicketsModal?.();
      reset();
    } catch (error) {
      errorSnackbar();
    }
  };

  const closeMoveTicketsModal = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['ticketAction'],
      }),
    );
    reset();
    setIsMoveTicketsModalOpen?.(false);
  };
  const apiQueryAgent = useLazyGetAgentDropdownQuery();
  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();
  const moveTicketsFormFields = moveTicketsFormFieldsDynamic(
    apiQueryDepartment,
    apiQueryAgent,
  );
  return {
    moveTicketsFormMethod,
    closeMoveTicketsModal,
    handleSubmit,
    submitMoveTicketsForm,
    moveTicketsFormFields,
    putTicketStatus,
  };
};
