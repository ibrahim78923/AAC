import { TICKET_TYPE } from '@/constants/strings';

export const singleTicketDetailTabsData = (data: any) => {
  if (data?.data?.[0]?.ticketType === TICKET_TYPE?.INC)
    return [
      `Details `,
      `Tasks `,
      `Related Tickets`,
      `Associates Assets`,
      `Meetings `,
      `Activities `,
      `Conversation `,
    ];
  return [
    `Details `,
    `Tasks `,
    `Related Tickets`,
    `Associates Assets`,
    `Approvals `,
    `Meetings `,
    `Activities `,
    `Conversation `,
  ];
};
