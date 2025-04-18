import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airServices/tickets/slice';
import { useRouter } from 'next/router';
import { useGetTicketList } from '../TicketsServicesHooks/useGetTicketList';
import { PAGINATION } from '@/config';
import { useUpdateBulkServicesTicketsMutation } from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { AIR_SERVICES } from '@/constants/routes';
import {
  servicesTicketsIsPortalOpenSelector,
  servicesTicketsSelectedTicketListsSelector,
  servicesTicketsTotalRecordsSelector,
} from '@/redux/slices/airServices/tickets/selectors';

export const useUpdateTicketStatus = () => {
  const router = useRouter();
  const { ticketId } = router?.query;

  const { getTicketsListData, page } = useGetTicketList();

  const dispatch = useAppDispatch();
  const selectedTicketLists = useAppSelector(
    servicesTicketsSelectedTicketListsSelector,
  );

  const isPortalOpen = useAppSelector(servicesTicketsIsPortalOpenSelector);

  const totalRecords = useAppSelector(servicesTicketsTotalRecordsSelector);

  const isMoveBack = !!ticketId;

  const refetchApi = async () => {
    if (isMoveBack) {
      router?.push({
        pathname: AIR_SERVICES?.TICKETS,
      });
      return;
    }

    const newPage =
      selectedTicketLists?.length === totalRecords
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage?.(newPage));
    await getTicketsListData?.(newPage);
  };

  const [patchBulkUpdateTicketsTrigger, patchBulkUpdateTicketsStatus] =
    useUpdateBulkServicesTicketsMutation();

  const updateTicketStatus = async () => {
    const queryParams = new URLSearchParams();
    selectedTicketLists?.forEach(
      (ticketId: any) => queryParams?.append('ids', ticketId?._id),
    );

    const apiDataParameter = {
      queryParams,
      body: {
        status: isPortalOpen?.status,
      },
    };

    try {
      const response =
        await patchBulkUpdateTicketsTrigger(apiDataParameter)?.unwrap();
      const hasErrors = response?.data?.errors?.length;
      if (hasErrors) {
        errorSnackbar(response?.data?.errors);
      } else {
        successSnackbar(
          `Ticket marked as ${isPortalOpen?.status?.toLowerCase()} successfully`,
        );
        await refetchApi?.();
      }
      closeModal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeModal = () => {
    dispatch(emptySelectedTicketLists());
    dispatch(setIsPortalClose());
  };

  const apiCallInProgress = patchBulkUpdateTicketsStatus?.isLoading;

  return {
    apiCallInProgress,
    closeModal,
    updateTicketStatus,
    isPortalOpen,
  };
};
