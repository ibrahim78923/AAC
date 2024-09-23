import { usePutTicketsMutation } from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airServices/tickets/slice';
import { useGetTicketList } from '../TicketsServicesHooks/useGetTicketList';
import { ARRAY_INDEX } from '@/constants/strings';
import { PAGINATION } from '@/config';

export const useAssignedTickets = () => {
  const dispatch = useAppDispatch();
  const { getTicketsListData, page } = useGetTicketList();

  const totalRecords = useAppSelector(
    (state) => state?.servicesTickets?.totalRecords,
  );

  const selectedTicketLists = useAppSelector(
    (state) => state?.servicesTickets?.selectedTicketLists,
  );

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTickets?.isPortalOpen,
  );

  const singleTicketDetail = selectedTicketLists?.[ARRAY_INDEX?.ZERO];

  const [putTicketTrigger, putTicketStatus] = usePutTicketsMutation();

  const methods: UseFormReturn<any> = useForm<any>({
    defaultValues: {
      agent: null,
    },
    resolver: yupResolver(
      Yup?.object()?.shape({
        agent: Yup?.mixed()?.nullable()?.required('Agent is Required'),
      }),
    ),
  });

  const refetchApi = async () => {
    const newPage =
      selectedTicketLists?.length === totalRecords
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage?.(newPage));
    await getTicketsListData?.(newPage);
  };

  const { handleSubmit, reset } = methods;

  const submitAssignedTicketsForm = async (formData: {
    agent: AutocompleteAsyncOptionsI;
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
    assignTicketFormData?.append('agent', formData?.agent?._id);
    const putTicketParameter = {
      body: assignTicketFormData,
    };
    try {
      await putTicketTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Ticket assigned successfully');
      closePortal?.();
      await refetchApi();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const closePortal = () => {
    reset();
    dispatch(emptySelectedTicketLists());
    dispatch(setIsPortalClose());
  };

  return {
    methods,
    handleSubmit,
    submitAssignedTicketsForm,
    closePortal,
    putTicketStatus,
    isPortalOpen,
  };
};
