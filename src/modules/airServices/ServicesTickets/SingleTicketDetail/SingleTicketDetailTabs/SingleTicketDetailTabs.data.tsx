export const singleTicketDetailTabsData = (
  totalRelatedTickets: any,
  totalAssets: any,
) => [
  `Details `,
  `Tasks `,
  `Related Tickets ${
    !!totalRelatedTickets ? `${' '} (${totalRelatedTickets})` : ''
  }`,
  `Associates Assets ${!!totalAssets ? `${' '} (${totalAssets})` : '(0)'}`,
  `Approvals `,
  `Meetings `,
  `Activities `,
  `Conversation `,
];
