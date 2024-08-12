import {
  usePutTicketsMutation,
  useLazyGetAgentDropdownQuery,
} from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { TicketActionComponentPropsI } from '../TicketsLists/TicketsLists.interface';

export const useAssignedTickets = (props: TicketActionComponentPropsI) => {
  const {
    setIsPortalOpen,
    setSelectedTicketList,
    selectedTicketList,
    singleTicketDetail,
    setFilterTicketLists,
    getTicketsListData,
    setPage,
  } = props;

  const [putTicketTrigger, putTicketStatus] = usePutTicketsMutation();

  const assignedTicketsMethod = useForm<any>({
    defaultValues: {
      user: null,
    },
    resolver: yupResolver(
      Yup?.object()?.shape({
        user: Yup?.mixed()?.nullable()?.required('Agent is Required'),
      }),
    ),
  });

  const { handleSubmit, reset } = assignedTicketsMethod;
  const submitAssignedTicketsForm = async (formData: any) => {
    const assignTicketFormData = new FormData();
    assignTicketFormData?.append(
      'isChildTicket',
      singleTicketDetail?.isChildTicket,
    );
    assignTicketFormData?.append('requester', singleTicketDetail?.requester);
    assignTicketFormData?.append('ticketType', singleTicketDetail?.ticketType);
    assignTicketFormData?.append('moduleType', singleTicketDetail?.moduleType);
    assignTicketFormData?.append('status', singleTicketDetail?.status);
    assignTicketFormData?.append('id', selectedTicketList?.[0]);
    assignTicketFormData?.append('agent', formData?.user?._id);

    const putTicketParameter = {
      body: assignTicketFormData,
    };

    try {
      await putTicketTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Ticket assigned Successfully');
      reset();
      getTicketsListData(1, {});
      setFilterTicketLists?.({});
      setPage?.(1);
      closeTicketsAssignedModal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeTicketsAssignedModal = () => {
    reset();
    setSelectedTicketList([]);
    setIsPortalOpen?.({});
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
