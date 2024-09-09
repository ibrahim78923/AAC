import {
  usePutTicketsMutation,
  useLazyGetAgentDropdownQuery,
} from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
} from '@/redux/slices/airServices/tickets/slice';
import { useGetTicketList } from '../TicketsServicesHooks/useGetTicketList';
import { ARRAY_INDEX } from '@/constants/strings';

export const useAssignedTickets = () => {
  const dispatch = useAppDispatch();
  const { getTicketsListData } = useGetTicketList();
  const selectedTicketLists = useAppSelector(
    (state) => state?.servicesTickets?.selectedTicketLists,
  );
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTickets?.isPortalOpen,
  );
  const singleTicketDetail = selectedTicketLists?.[ARRAY_INDEX?.ZERO];

  const [putTicketTrigger, putTicketStatus] = usePutTicketsMutation();

  const assignedTicketsMethod: UseFormReturn<any> = useForm<any>({
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

  const submitAssignedTicketsForm = async (formData: {
    user: AutocompleteAsyncOptionsI;
  }) => {
    const assignTicketFormData = new FormData();
    assignTicketFormData?.append(
      'isChildTicket',
      singleTicketDetail?.isChildTicket,
    );
    assignTicketFormData?.append('requester', singleTicketDetail?.requester);
    assignTicketFormData?.append('ticketType', singleTicketDetail?.ticketType);
    assignTicketFormData?.append('moduleType', singleTicketDetail?.moduleType);
    assignTicketFormData?.append('status', singleTicketDetail?.status);
    assignTicketFormData?.append('id', singleTicketDetail?._id);
    assignTicketFormData?.append('agent', formData?.user?._id);
    const putTicketParameter = {
      body: assignTicketFormData,
    };
    try {
      await putTicketTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Ticket assigned Successfully');
      closeTicketsAssignedModal?.();
      await getTicketsListData();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const closeTicketsAssignedModal = () => {
    reset();
    dispatch(emptySelectedTicketLists());
    dispatch(setIsPortalClose());
  };

  const apiQueryAgent = useLazyGetAgentDropdownQuery();
  return {
    assignedTicketsMethod,
    handleSubmit,
    submitAssignedTicketsForm,
    closeTicketsAssignedModal,
    apiQueryAgent,
    putTicketStatus,
    isPortalOpen,
  };
};
