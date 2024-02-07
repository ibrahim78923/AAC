import { ReceivedFileIcon, SharedIcon } from '@/assets/icons';
import { TICKET_APPROVALS } from '@/constants/strings';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';

export const APPROVAL_CARD_INFO: any = {
  [TICKET_APPROVALS?.REQUESTED]: {
    icon: <SharedIcon />,
    text: 'Request sent',
    color: 'info.main',
  },
  [TICKET_APPROVALS?.RECEIVED]: {
    icon: <ReceivedFileIcon />,
    text: 'Received for approval ',
    color: 'primary.main',
  },
  [TICKET_APPROVALS?.APPROVE]: {
    icon: <CheckCircleIcon fontSize="small" sx={{ color: 'success.main' }} />,
    text: 'Approved ',
    color: 'success.main',
  },
  [TICKET_APPROVALS?.REJECT]: {
    icon: <CancelIcon fontSize="small" sx={{ color: 'error.main' }} />,
    text: 'Rejected ',
    color: 'error.main',
  },
  [TICKET_APPROVALS?.CANCEL]: {
    icon: <UnsubscribeIcon fontSize="small" sx={{ color: 'grey.900' }} />,
    text: 'Cancel ',
    color: 'grey.900',
  },
};

export const ticketsApprovalDropdownFunction = (
  getUpdateStatus?: any,
  data?: any,
) => [
  {
    title: 'Send Reminder',
    handleClick: (closeMenu: any) => {
      getUpdateStatus?.({ ...data, state: 'Send Reminder' });
      closeMenu?.();
    },
  },
  {
    title: 'Cancel Approval',
    handleClick: (closeMenu: any) => {
      getUpdateStatus?.({ ...data, state: TICKET_APPROVALS?.CANCEL });
      closeMenu?.();
    },
  },
];
