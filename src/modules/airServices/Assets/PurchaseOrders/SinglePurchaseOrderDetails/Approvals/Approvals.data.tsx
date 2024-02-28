import { Fragment } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  PrimaryCancelIcon,
  PrimaryReceivedIcon,
  PrimaryRequestIcon,
} from '@/assets/icons';
export const approvalStatus = ['APPROVED', 'REJECTED', 'CANCELED'];
export const approvalsStatusObj = (
  status: any,
  approverId: any,
  userId: any,
) => {
  const RECEIVED = 'RECEIVED';
  const REQUEST_SENT = 'REQUEST_SENT';
  const APPROVED = 'APPROVED';
  const REJECTED = 'REJECTED';
  if (!approvalStatus?.includes(status) && !!userId && !!approverId) {
    status = userId === approverId ? RECEIVED : REQUEST_SENT;
  }
  let statusObj: any;

  switch (status) {
    case RECEIVED:
      statusObj = {
        color: 'primary',
        message: (
          <Fragment>
            <PrimaryReceivedIcon /> Received for approval on{' '}
          </Fragment>
        ),
      };
      break;

    case REQUEST_SENT:
      statusObj = {
        color: 'primary',
        message: (
          <Fragment>
            <PrimaryRequestIcon /> Request sent on{' '}
          </Fragment>
        ),
      };
      break;

    case APPROVED:
      statusObj = {
        color: 'success',
        message: (
          <Fragment>
            <CheckCircleIcon sx={{ fontSize: '18px' }} /> Approved on{' '}
          </Fragment>
        ),
      };
      break;

    case REJECTED:
      statusObj = {
        color: 'error',
        message: (
          <Fragment>
            <CancelIcon sx={{ fontSize: '18px' }} />
            Rejected on{' '}
          </Fragment>
        ),
      };
      break;

    default:
      statusObj = {
        color: 'secondary',
        message: (
          <Fragment>
            <PrimaryCancelIcon />
            Cancelled on{' '}
          </Fragment>
        ),
      };
      break;
  }
  return statusObj;
};
export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
};
