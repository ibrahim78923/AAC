import { placeImage } from '@/assets/images';
import { Fragment } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  PrimaryCancelIcon,
  PrimaryReceivedIcon,
  PrimaryRequestIcon,
} from '@/assets/icons';

export const approvalsStatusColor = (status: any) => {
  const Received = 'Received';
  const RequestSent = 'RequestSent';
  const Approved = 'Approved';
  const Rejected = 'Rejected';

  let color;

  switch (status) {
    case Received:
      color = 'primary';
      break;

    case RequestSent:
      color = 'primary';
      break;

    case Approved:
      color = 'success';
      break;

    case Rejected:
      color = 'error';
      break;

    default:
      color = 'secondary';
      break;
  }
  return color;
};

export const approvalsStatusMessage = (status: any) => {
  const Received = 'Received';
  const RequestSent = 'RequestSent';
  const Approved = 'Approved';
  const Rejected = 'Rejected';

  let message: any;

  switch (status) {
    case Received:
      message = (
        <Fragment>
          <PrimaryReceivedIcon /> Received for approval on{' '}
        </Fragment>
      );
      break;

    case RequestSent:
      message = (
        <Fragment>
          <PrimaryRequestIcon /> Request sent on{' '}
        </Fragment>
      );
      break;

    case Approved:
      message = (
        <Fragment>
          <CheckCircleIcon /> Approved on{' '}
        </Fragment>
      );
      break;

    case Rejected:
      message = (
        <Fragment>
          <CancelIcon />
          Rejected on{' '}
        </Fragment>
      );
      break;

    default:
      message = (
        <Fragment>
          <PrimaryCancelIcon />
          Cancelled on{' '}
        </Fragment>
      );
      break;
  }
  return message;
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
