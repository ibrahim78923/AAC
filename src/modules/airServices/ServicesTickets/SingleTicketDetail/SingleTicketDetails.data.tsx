import { TICKET_STATUS } from '@/constants/strings';
import { TICKETS_ACTION_CONSTANTS } from '../TicketsLists/TicketsLists.data';
import { ARRAY_INDEX, TICKET_TYPE } from '@/constants/strings';
import { Permissions } from '@/constants/permissions';
import {
  AIR_SERVICES_TICKETS_TICKETS_DETAILS,
  AIR_SERVICES_TICKETS_TICKET_LISTS,
} from '@/constants/permission-keys';
import { Details } from './Details';
import { Tasks } from './Tasks';
import { RelatedTickets } from './RelatedTickets';
import Association from './Association';
import { Approvals } from './Approvals';
import { Meeting } from './Meeting';
import { Activities } from './Activities';
import { Conversations } from './Conversations';
import { Dispatch, SetStateAction } from 'react';
import {
  SingleTicketDetailChildComponentPropsI,
  SingleTicketDetailIsPortalOpenI,
} from './SingleTicketDetails.interface';
import { SingleDropdownButtonCloseMenuI } from '@/components/SingleDropdownButton/SingleDropdownButton.interface';

export const singleTicketDetailTabsDynamic = (
  props: SingleTicketDetailChildComponentPropsI,
) => {
  const { data } = props;
  return [
    {
      _id: 1,
      name: 'Details',
      id: 'details',
      tabPermissions: Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_TAB,
      component: Details,
      componentProps: { ...props },
    },
    {
      _id: 2,
      name: 'Tasks',
      id: 'tasks',
      tabPermissions: Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_TASK,
      component: Tasks,
      componentProps: {},
    },
    {
      _id: 3,
      name: 'Related Tickets',
      id: 'related_tickets',
      tabPermissions:
        Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_CHILD_TICKET,
      component: RelatedTickets,
      componentProps: {},
    },
    {
      _id: 4,
      name: 'Association',
      id: 'association',
      tabPermissions:
        Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_ASSETS_ASSOCIATE,
      component: Association,
      componentProps: {
        ticketType: data?.data?.[ARRAY_INDEX?.ZERO]?.ticketType,
      },
    },
    ...(data?.data?.[ARRAY_INDEX?.ZERO]?.ticketType === TICKET_TYPE?.SR
      ? [
          {
            _id: 5,
            name: 'Approvals',
            id: 'approvals',
            tabPermissions: [
              AIR_SERVICES_TICKETS_TICKET_LISTS?.VIEW_TICKETS_DETAILS,
            ],
            component: Approvals,
            componentProps: {},
          },
        ]
      : []),
    {
      _id: 6,
      name: 'Meetings',
      id: 'meetings',
      tabPermissions:
        Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_MEETINGS,
      component: Meeting,
      componentProps: {},
    },
    {
      _id: 7,
      name: 'Activities',
      id: 'activities',
      tabPermissions: [
        AIR_SERVICES_TICKETS_TICKETS_DETAILS?.VIEW_ACTIVITIES_DETAILS,
      ],
      component: Activities,
      componentProps: {},
    },
    {
      _id: 8,
      name: 'Conversation',
      id: 'conversation',
      tabPermissions:
        Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_CONVERSATION,
      component: Conversations,
      componentProps: {},
    },
  ];
};

export const singleTicketDetailDropdownOptionsDynamic = (
  setIsPortalOpen: Dispatch<SetStateAction<SingleTicketDetailIsPortalOpenI>>,
) => [
  {
    id: 1,
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.VIEW_TICKETS_DETAILS],
    title: 'Print',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setIsPortalOpen?.({
        isOpen: true,
        action: TICKETS_ACTION_CONSTANTS?.PRINT_TICKET,
      });
      closeMenu?.();
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.VIEW_TICKETS_DETAILS],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setIsPortalOpen?.({
        isOpen: true,
        action: TICKETS_ACTION_CONSTANTS?.DELETE_TICKET,
      });
      closeMenu?.();
    },
  },
  {
    id: 3,
    title: 'Close',
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.VIEW_TICKETS_DETAILS],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setIsPortalOpen?.({
        isOpen: true,
        action: TICKETS_ACTION_CONSTANTS?.UPDATE_TICKET_STATUS,
        status: TICKET_STATUS?.CLOSED,
      });
      closeMenu?.();
    },
  },
];
