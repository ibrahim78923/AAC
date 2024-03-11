import usePath from '@/hooks/usePath';
import {
  usePutTicketsMutation,
  useLazyGetAgentDropdownQuery,
} from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const useAssignedTickets = (props: any) => {
  const router = useRouter();
  const { makePath } = usePath();
  const { setIsAssignedModalOpen, setSelectedTicketList, selectedTicketList } =
    props;
  const [putTicketTrigger, putTicketStatus] = usePutTicketsMutation();

  const assignedTicketsMethod = useForm<any>({
    defaultValues: {
      user: null,
    },
    resolver: yupResolver(
      Yup?.object()?.shape({
        user: Yup?.mixed()?.nullable()?.required('Required'),
      }),
    ),
  });

  const { handleSubmit, reset } = assignedTicketsMethod;

  const submitAssignedTicketsForm = async (data: any) => {
    const assignTicketFormData = new FormData();
    assignTicketFormData?.append('isChildTicket', false + '');
    assignTicketFormData?.append('id', selectedTicketList?.[0]);
    assignTicketFormData?.append('agent', data?.user?._id);
    const putTicketParameter = {
      body: data,
    };

    try {
      await putTicketTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Ticket assigned Successfully');
      setSelectedTicketList([]);
      reset();
      closeTicketsAssignedModal?.();
    } catch (error) {
      errorSnackbar();
    }
  };

  const closeTicketsAssignedModal = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['ticketAction'],
      }),
    );
    reset();
    setIsAssignedModalOpen?.(false);
  };

  const apiQueryAgent = useLazyGetAgentDropdownQuery();

  return {
    assignedTicketsMethod,
    handleSubmit,
    submitAssignedTicketsForm,
    closeTicketsAssignedModal,
    apiQueryAgent,
    putTicketStatus,
  };
};
