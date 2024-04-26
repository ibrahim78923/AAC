import { TICKET_APPROVALS } from '@/constants/strings';

export const APPROVAL_CARD_STATUS: any = {
  [TICKET_APPROVALS?.REQUESTED]: 'info.main',
  [TICKET_APPROVALS?.RECEIVED]: 'primary.main',
  [TICKET_APPROVALS?.APPROVE]: 'success.main',
  [TICKET_APPROVALS?.REJECT]: 'error.main',
  [TICKET_APPROVALS?.CANCEL]: 'grey.900',
};
