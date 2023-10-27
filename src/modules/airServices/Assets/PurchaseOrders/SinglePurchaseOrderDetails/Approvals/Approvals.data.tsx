import { placeImage } from '@/assets/images';
import { Fragment } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  PrimaryCancelIcon,
  PrimaryReceivedIcon,
  PrimaryRequestIcon,
} from '@/assets/icons';

export const approvalsStatusObj = (status: any) => {
  const Received = 'Received';
  const RequestSent = 'RequestSent';
  const Approved = 'Approved';
  const Rejected = 'Rejected';

  let statusObj: any;

  switch (status) {
    case Received:
      statusObj = {
        color: 'primary',
        message: (
          <Fragment>
            <PrimaryReceivedIcon /> Received for approval on{' '}
          </Fragment>
        ),
      };
      break;

    case RequestSent:
      statusObj = {
        color: 'primary',
        message: (
          <Fragment>
            <PrimaryRequestIcon /> Request sent on{' '}
          </Fragment>
        ),
      };
      break;

    case Approved:
      statusObj = {
        color: 'success',
        message: (
          <Fragment>
            <CheckCircleIcon sx={{ fontSize: '18px' }} /> Approved on{' '}
          </Fragment>
        ),
      };
      break;

    case Rejected:
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

export const approvalsDataArray = [
  {
    src: placeImage,
    title: 'John Doe',
    status: 'Received',
    time: 'Wed May 10 2023 00:00:00 GMT+0500 (Pakistan Standard Time)',
    message:
      'Hi Guys We have been facing issue when we try to reach email server 3 Hi Guys.',
  },
  {
    src: placeImage,
    title: 'John Doe',
    status: 'RequestSent',
    time: 'Wed May 10 2023 00:00:00 GMT+0500 (Pakistan Standard Time)',
    message:
      'Hi Guys We have been facing issue when we try to reach email server 3 Hi Guys.',
  },
  {
    src: placeImage,
    title: 'John Doe',
    status: 'Approved',
    time: 'Wed May 10 2023 00:00:00 GMT+0500 (Pakistan Standard Time)',
    message:
      'Hi Guys We have been facing issue when we try to reach email server 3 Hi Guys.',
  },
  {
    src: placeImage,
    title: 'John Doe',
    status: 'Rejected',
    time: 'Wed May 10 2023 00:00:00 GMT+0500 (Pakistan Standard Time)',
    message:
      'Hi Guys We have been facing issue when we try to reach email server 3 Hi Guys.',
  },
  {
    src: placeImage,
    title: 'John Doe',
    status: 'Cancelled',
    time: 'Wed May 10 2023 00:00:00 GMT+0500 (Pakistan Standard Time)',
    message:
      'Hi Guys We have been facing issue when we try to reach email server 3 Hi Guys.',
  },
];
