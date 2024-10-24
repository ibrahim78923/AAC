import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { DeleteTask } from '../DeleteTask';
import { UpsertTasks } from '../UpsertTasks';
import { SingleTaskDetail } from '../SingleTaskDetail';
import { TICKET_TASKS_ACTIONS_CONSTANT } from '../Tasks.data';
import { errorSnackbar } from '@/lib/snackbar';

const {
  CREATE_TICKET_TASKS,
  EDIT_TICKET_TASKS,
  DELETE_TICKET_TASKS,
  TICKET_TASKS_DETAIL,
} = TICKET_TASKS_ACTIONS_CONSTANT;

export const ticketTasksActionComponent = {
  [CREATE_TICKET_TASKS]: <UpsertTasks />,
  [EDIT_TICKET_TASKS]: <UpsertTasks />,
  [DELETE_TICKET_TASKS]: <DeleteTask />,
  [TICKET_TASKS_DETAIL]: <SingleTaskDetail />,
};

export const actionsDropdownForTicketTasksListsDynamic = (
  setTicketTasksAction: any,
  selectedTasksList: any,
) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [AIR_SERVICES_TICKETS_TICKETS_DETAILS?.EDIT_TASK],
    handleClick: (closeMenu: any) => {
      if (selectedTasksList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setTicketTasksAction(EDIT_TICKET_TASKS);
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: [AIR_SERVICES_TICKETS_TICKETS_DETAILS?.DELETE_TASK],
    handleClick: (closeMenu: any) => {
      setTicketTasksAction(DELETE_TICKET_TASKS);
      closeMenu();
    },
  },
];
