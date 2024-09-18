import { useAppDispatch, useAppSelector } from '@/redux/store';
import { actionsDropdownForTicketTasksListsDynamic } from './Header.data';
import { setIsPortalOpen } from '@/redux/slices/airServices/tickets-tasks/slice';
import { TICKET_TASKS_ACTIONS_CONSTANT } from '../Tasks.data';

const { CREATE_TICKET_TASKS } = TICKET_TASKS_ACTIONS_CONSTANT;

export const useHeader = () => {
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

  return {
    selectedTicketTasksLists,
    actionsDropdownForTicketTasksLists,
    isPortalOpen,
    openCreateNewTicketTasksPortal,
  };
};
