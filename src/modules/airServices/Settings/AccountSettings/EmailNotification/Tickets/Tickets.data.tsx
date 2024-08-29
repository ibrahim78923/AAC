import { IItemData } from '../EmailNotification.interface';

export const ticketDataArray: IItemData[] = [
  {
    _id: 1,
    heading: 'Requester Notification',
    details: [
      {
        _id: 'ticketRequesterChangeCreated',
        title: 'Change Created',
      },
      {
        _id: 'ticketRequesterNewTicketCreated',
        title: 'New Ticket Created',
      },
      {
        _id: 'ticketRequesterAgentAddComment',
        title: 'Agent Adds Comment to Ticket',
      },
      {
        _id: 'ticketRequesterAgentSolvesTicket',
        title: 'Agent Solves the Ticket',
      },
      {
        _id: 'ticketRequesterAgentCloseTicket',
        title: 'Agent Closes the Ticket',
      },
      {
        _id: 'ticketRequesterApprovedRejectedTicket',
        title: 'Ticket Approved or Rejected',
      },
      {
        _id: 'ticketRequesterItemStageChange',
        title: 'Requested Item Stage Change',
      },
      {
        _id: 'ticketRequesterSystemUserInvitationEmail',
        title: 'SYSTEM(User Invitation Email)',
      },
    ],
  },
  {
    _id: 2,
    heading: 'Agent Notification',
    details: [
      {
        _id: 'ticketAgentChangeCreated',
        title: 'Change Created',
      },
      {
        _id: 'ticketAgentNewTicketCreated',
        title: 'New Ticket Created',
      },
      {
        _id: 'ticketAgentAssignedToGroup',
        title: 'Ticket Assigned to Group',
      },
      {
        _id: 'ticketAgentAssignedToAgent',
        title: 'Ticket assigned to Agent',
      },
      {
        _id: 'ticketAgentRequesterReplies',
        title: 'Requester Replies to Tickets',
      },
      {
        _id: 'ticketAgentUnAttendedInGroup',
        title: 'Ticket Unattended in Group',
      },
      {
        _id: 'ticketAgentFirstResponseSLA',
        title: 'First Response SLA notification',
      },
      {
        _id: 'ticketAgentResolutionTimeSLA',
        title: 'Resolution time SLA notification',
      },
      {
        _id: 'ticketAgentTicketApproval',
        title: 'Ticket Approval',
      },
      {
        _id: 'ticketAgentAddedAsWatcher',
        title: 'Added as Watcher',
      },
      {
        _id: 'ticketAgentRemovedAsWatcher',
        title: 'Removed as Watcher',
      },
      {
        _id: 'ticketAgentApprovedRejected',
        title: 'Ticket Approved or Rejected',
      },
      {
        _id: 'ticketAgentNoteAdded',
        title: 'Note added to Ticket',
      },
      {
        _id: 'ticketAgentSystemUserInvitationEmail',
        title: 'SYSTEM(User Invitation Email)',
      },
    ],
  },
  {
    _id: 3,
    heading: 'Reply Templates',
    details: [
      {
        _id: 'ticketReplyTemplateSystemUserInvitationEmail',
        title: 'SYSTEM(User Invitation Email)',
      },
    ],
  },
  {
    _id: 4,
    heading: 'CC Notification',
    details: [
      {
        _id: 'ticketCCNotificationNewTicketCreated',
        title: 'New ticket created',
      },
      {
        _id: 'ticketCCNotificationNoteAdded',
        title: 'Note added to Ticket',
      },
    ],
  },
];
