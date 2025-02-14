import { ARRAY_INDEX, TICKET_TYPE } from '@/constants/strings';
import { Permissions } from '@/constants/permissions';
import {
  AIR_SERVICES_TICKETS_TICKETS_DETAILS,
  AIR_SERVICES_TICKETS_TICKET_LISTS,
} from '@/constants/permission-keys';

import { SingleTicketDetailChildComponentPropsI } from './SingleTicketDetails.interface';
import dynamic from 'next/dynamic';

const Details = dynamic(() => import('./Details'), {
  ssr: false,
});
const Tasks = dynamic(() => import('./Tasks'), {
  ssr: false,
});
const RelatedTickets = dynamic(() => import('./RelatedTickets'), {
  ssr: false,
});
const Association = dynamic(() => import('./Association'), {
  ssr: false,
});
const Approvals = dynamic(() => import('./Approvals'), {
  ssr: false,
});
const Meeting = dynamic(() => import('./Meeting'), {
  ssr: false,
});
const Activities = dynamic(() => import('./Activities'), {
  ssr: false,
});
const Conversations = dynamic(() => import('./Conversations'), {
  ssr: false,
});

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
