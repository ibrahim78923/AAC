import { TICKET_APPROVALS_ACTIONS_CONSTANT } from '@/constants/portal-actions';
import { AddRequestApproval } from '../AddRequestApproval';
import { SendApprovalReminder } from '../SendApprovalReminder';
import { UpdateRequestStatus } from '../UpdateRequestStatus';

const {
  ADD_TICKET_APPROVAL,
  APPROVE_TICKET_APPROVAL,
  REJECT_TICKET_APPROVAL,
  CANCEL_TICKET_APPROVAL,
  SEND_REMINDER_TICKET_APPROVAL,
} = TICKET_APPROVALS_ACTIONS_CONSTANT ?? {};

export const ticketsApprovalsActionComponent = {
  [ADD_TICKET_APPROVAL]: <AddRequestApproval />,
  [REJECT_TICKET_APPROVAL]: <UpdateRequestStatus />,
  [APPROVE_TICKET_APPROVAL]: <UpdateRequestStatus />,
  [CANCEL_TICKET_APPROVAL]: <UpdateRequestStatus />,
  [SEND_REMINDER_TICKET_APPROVAL]: <SendApprovalReminder />,
};
