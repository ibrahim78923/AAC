import { setIsPortalOpen } from '@/redux/slices/airServices/tickets/slice';
import { useAppDispatch } from '@/redux/store';
import { useRouter } from 'next/router';
import { TICKETS_ACTION_CONSTANTS } from '../TicketsLists/TicketsListHeader/TicketListHeader.data';
import { EXPORT_FILE_TYPE, EXPORT_TYPE } from '@/constants/strings';
import { useLazyGetServicesTicketsListAsExportQuery } from '@/services/airServices/tickets';
import { downloadFile } from '@/utils/file';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useHeader = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [lazyGetExportTicketsTrigger, lazyGetExportTicketsStatus] =
    useLazyGetServicesTicketsListAsExportQuery();

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

  const getTicketsListDataExport = async (type: any) => {
    const queryParams = {
      exportType: type,
    };

    const getTicketsParameter = {
      queryParams,
    };

    try {
      const response =
        await lazyGetExportTicketsTrigger(getTicketsParameter)?.unwrap();
      downloadFile(response, 'TicketLists', EXPORT_FILE_TYPE?.[type]);
      successSnackbar(`Tickets Exported successfully`);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
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
    lazyGetExportTicketsStatus,
  };
};
