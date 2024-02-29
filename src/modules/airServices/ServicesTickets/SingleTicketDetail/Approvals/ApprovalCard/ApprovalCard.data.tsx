import { ReceivedFileIcon, SharedIcon } from '@/assets/icons';
import { TICKET_APPROVALS } from '@/constants/strings';
import { fullName, fullNameInitial, generateImage } from '@/utils/avatarUtils';
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
  [TICKET_APPROVALS?.PENDING]: {
    icon: <ReceivedFileIcon />,
    text: 'Pending ',
    color: 'primary.main',
  },
};

export const setStatus = (
  status: any,
  receiverUserId: any,
  authUserId: any,
  creatorUserId: any,
) => {
  if (status === TICKET_APPROVALS?.PENDING) {
    const setApprovalStatus =
      creatorUserId === authUserId
        ? APPROVAL_CARD_INFO?.[TICKET_APPROVALS?.REQUESTED]
        : receiverUserId === authUserId
        ? APPROVAL_CARD_INFO?.[TICKET_APPROVALS?.RECEIVED]
        : APPROVAL_CARD_INFO?.[status];
    return setApprovalStatus;
  }
  return APPROVAL_CARD_INFO?.[status];
};

export const setUserDetails = (
  data: any,
  authUserId: any,
  creatorUserId: any,
) => {
  if (creatorUserId === authUserId) {
    const name = fullName(
      data?.receiverDetails?.firstName,
      data?.receiverDetails?.lastName,
    );
    const nameInitial = fullNameInitial(
      data?.receiverDetails?.firstName,
      data?.receiverDetails?.lastName,
    );
    const avatar = generateImage(data?.imgSrc?.src);
    return { name, nameInitial, avatar };
  }
  const name = fullName(
    data?.requesterDetails?.firstName,
    data?.requesterDetails?.lastName,
  );
  const nameInitial = fullNameInitial(
    data?.requesterDetails?.firstName,
    data?.requesterDetails?.lastName,
  );
  const avatar = generateImage(data?.imgSrc?.src);
  return { name, nameInitial, avatar };
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
