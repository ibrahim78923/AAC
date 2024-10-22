import { useAppDispatch, useAppSelector } from '@/redux/store';
import { actionsDropdownForTicketTasksListsDynamic } from './Header.data';
import { setIsPortalOpen } from '@/redux/slices/airServices/tickets-tasks/slice';
import { TICKET_TASKS_ACTIONS_CONSTANT } from '../Tasks.data';
import { useLazyGetServicesTicketsTaskListAsExportQuery } from '@/services/airServices/tickets/single-ticket-details/tasks';
import { downloadFile } from '@/utils/file';
import { EXPORT_FILE_TYPE, EXPORT_TYPE } from '@/constants/strings';
import { useRouter } from 'next/router';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const { CREATE_TICKET_TASKS } = TICKET_TASKS_ACTIONS_CONSTANT;

export const useHeader = () => {
  const router = useRouter();
  const ticketId = router?.query?.ticketId;
  const [lazyGetServicesTicketsTaskListAsExportTrigger] =
    useLazyGetServicesTicketsTaskListAsExportQuery();

  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTicketTasks?.isPortalOpen,
  );

  const selectedTicketTasksLists = useAppSelector(
    (state) => state?.servicesTicketTasks?.selectedTicketTasksLists,
  );

  const setTicketTasksAction = (actionType: string) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: actionType,
      }),
    );
  };

  const actionsDropdownForTicketTasksLists =
    actionsDropdownForTicketTasksListsDynamic?.(
      setTicketTasksAction,
      selectedTicketTasksLists,
    );

  const openCreateNewTicketTasksPortal = () =>
    setTicketTasksAction(CREATE_TICKET_TASKS);

  const getTicketsTasksListExported = async (type: any) => {
    const queryParams = {
      exportType: type,
      meta: false,
      ticketId,
    };

    const getTicketsParameter = {
      queryParams,
    };

    try {
      const response =
        await lazyGetServicesTicketsTaskListAsExportTrigger(
          getTicketsParameter,
        )?.unwrap();
      downloadFile(response, 'TicketTasksLists', EXPORT_FILE_TYPE?.[type]);
      successSnackbar(`Tickets exported successfully`);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const exportAsCsv = () => getTicketsTasksListExported?.(EXPORT_TYPE?.CSV);
  const exportAsXls = () => getTicketsTasksListExported?.(EXPORT_TYPE?.XLS);

  return {
    selectedTicketTasksLists,
    actionsDropdownForTicketTasksLists,
    isPortalOpen,
    openCreateNewTicketTasksPortal,
    exportAsCsv,
    exportAsXls,
  };
};
