import { AIR_SERVICES } from '@/constants/routes';
import { TimeEntryFieldsIcon, TicketFieldsIcon } from '@/assets/icons';
import { PROJECT_NAME } from '@/config';

export const fieldManager = [
  {
    id: 1,
    avatar: TicketFieldsIcon,
    type: 'Ticket Fields',
    purpose: `Ticket form fields allows you to configure different fields in the Ticket Management module.`,
    link: AIR_SERVICES?.TICKET_FIELDS,
  },
  {
    id: 2,
    avatar: TicketFieldsIcon,
    type: 'Task Fields',
    purpose: `Task form fields allows you to configure different fields in the Task Management section.`,
    link: AIR_SERVICES?.TASK_FIELDS,
  },
  {
    id: 3,
    avatar: TimeEntryFieldsIcon,
    type: 'Time Entry Fields',
    purpose: `Time Entries let ${PROJECT_NAME} Agents track the time spent on different Tickets, Problems, Changes, and Releases.`,
    link: AIR_SERVICES?.TIME_ENTRY_FIELDS,
  },
];
