import { setIsPortalOpen } from '@/redux/slices/airServices/tickets/slice';
import { useAppDispatch } from '@/redux/store';
import { useGetTicketList } from '../TicketsServicesHooks/useGetTicketList';
import { useRouter } from 'next/router';
import { TICKETS_ACTION_CONSTANTS } from '../TicketsLists/TicketsListHeader/TicketListHeader.data';
import { EXPORT_TYPE } from '@/constants/strings';

export const useHeader = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { getTicketsListDataExport } = useGetTicketList();

  const setTicketAction = (
    ticketActionQuery: string,
    data: { [key: string]: any } = {},
  ) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: ticketActionQuery,
        status: data?.status,
      }),
    );
  };

  const exportTicketsAsCsv = () => getTicketsListDataExport?.(EXPORT_TYPE?.CSV);
  const exportTicketsAsXls = () => getTicketsListDataExport?.(EXPORT_TYPE?.XLS);

  const openCreateTicketPortal = () =>
    setTicketAction?.(TICKETS_ACTION_CONSTANTS?.CREATE_NEW_TICKET);

  return {
    router,
    openCreateTicketPortal,
    exportTicketsAsCsv,
    exportTicketsAsXls,
  };
};
