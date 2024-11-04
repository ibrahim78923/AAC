import { useUpdateBulkServicesTicketsMutation } from '@/services/airServices/tickets';
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
import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

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

  const [patchBulkUpdateTicketsTrigger, patchBulkUpdateTicketsStatus] =
    useUpdateBulkServicesTicketsMutation();

  const methods: UseFormReturn<any> = useForm<any>({
    defaultValues: {
      agent: null,
    },
    resolver: yupResolver(
      Yup?.object()?.shape({
        agent: Yup?.mixed()?.nullable()?.required('Agent is required'),
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
    const queryParams = new URLSearchParams();
    selectedTicketLists?.forEach(
      (ticketId: any) => queryParams?.append('ids', ticketId?._id),
    );

    const body = {
      agent: formData?.agent?._id,
    };

    const apiDataParameter = {
      queryParams,
      body,
    };

    try {
      await patchBulkUpdateTicketsTrigger(apiDataParameter)?.unwrap();
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

  const apiCallInProgress = patchBulkUpdateTicketsStatus?.isLoading;

  return {
    methods,
    handleSubmit,
    submitAssignedTicketsForm,
    closePortal,
    patchBulkUpdateTicketsStatus,
    isPortalOpen,
    apiCallInProgress,
  };
};
