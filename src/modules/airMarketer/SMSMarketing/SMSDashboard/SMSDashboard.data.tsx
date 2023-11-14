import React from 'react';
import {
  DeliveredSmsIcon,
  FailedSmsIcon,
  ReadSmsIcon,
  RepliedSmsIcon,
  SentSmsIcon,
} from '../../../../assets/icons';
import { Avatar } from '@mui/material';

export const smsStatusArray = [
  { icon: <SentSmsIcon />, count: '15', title: 'Sent', divider: true },
  {
    icon: <DeliveredSmsIcon />,
    count: '13',
    title: 'Delivered',
    divider: true,
  },
  { icon: <ReadSmsIcon />, count: '06', title: 'Read', divider: true },
  { icon: <RepliedSmsIcon />, count: '04', title: 'Replied', divider: true },
  { icon: <FailedSmsIcon />, count: '24', title: 'Failed' },
];

export const scheduledSmsArray = [
  {
    title: 'Fund Campaign',
    status: 'Scheduled',
    desc: 'A drought is defined as drier than normal conditions. This means that a drought is a moisture deficit relative to you.',
    created: '19/Dec/22',
    recipients: '246 Contacts',
  },
  {
    title: 'Sale Campaign',
    status: 'Completed',
    desc: 'A drought is defined as drier than normal conditions. This means that a drought is a moisture deficit relative to you.',
    created: '19/Dec/22',
    recipients: '246 Contacts',
  },
  {
    title: 'Sale Campaign',
    status: 'Completed',
    desc: 'A drought is defined as drier than normal conditions. This means that a drought is a moisture deficit relative to you.',
    created: '19/Dec/22',
    recipients: '246 Contacts',
  },
  {
    title: 'Sale Campaign',
    status: 'Completed',
    desc: 'A drought is defined as drier than normal conditions. This means that a drought is a moisture deficit relative to you.',
    created: '19/Dec/22',
    recipients: '246 Contacts',
  },
];

export const smsContactsArray = [
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    name: 'Leslie Alexander',
    phone: '(480) 555-0103',
  },
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    name: 'Leslie Alexander',
    phone: '(480) 555-0103',
  },
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    name: 'Leslie Alexander',
    phone: '(480) 555-0103',
  },
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    name: 'Leslie Alexander',
    phone: '(480) 555-0103',
  },
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    name: 'Leslie Alexander',
    phone: '(480) 555-0103',
  },
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    name: 'Leslie Alexander',
    phone: '(480) 555-0103',
  },
];
