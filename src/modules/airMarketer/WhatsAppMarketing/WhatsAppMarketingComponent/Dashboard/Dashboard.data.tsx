import React from 'react';
import {
  DeliveredSmsIcon,
  FailedSmsIcon,
  ReadSmsIcon,
  RepliedSmsIcon,
  SentSmsIcon,
} from '@/assets/icons';

export const smsStatusArray = (whatsappAnalytics: any) => {
  return [
    {
      icon: <SentSmsIcon />,
      count: whatsappAnalytics?.sent,
      title: 'Sent',
      divider: true,
    },
    {
      icon: <DeliveredSmsIcon />,
      count: whatsappAnalytics?.delivered,
      title: 'Delivered',
      divider: true,
    },
    {
      icon: <ReadSmsIcon />,
      count: whatsappAnalytics?.read,
      title: 'Read',
      divider: true,
    },
    {
      icon: <RepliedSmsIcon />,
      count: whatsappAnalytics?.replied,
      title: 'Replied',
      divider: true,
    },
    {
      icon: <FailedSmsIcon />,
      count: whatsappAnalytics?.failed,
      title: 'Failed',
    },
  ];
};

export const smsStatusArrayStatic = [
  { icon: <SentSmsIcon />, count: 2, title: 'Sent', divider: true },
  { icon: <DeliveredSmsIcon />, count: 30, title: 'Delivered', divider: true },
  { icon: <ReadSmsIcon />, count: 40, title: 'Read', divider: true },
  { icon: <RepliedSmsIcon />, count: 2, title: 'Replied', divider: true },
  { icon: <FailedSmsIcon />, count: 0, title: 'Failed' },
];
