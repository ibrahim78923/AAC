import React from 'react';
import { CardLayout } from '../CardLayout';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styles } from './PendingApprovals.style';

export const PendingApprovals = () => {
  const { palette }: any = useTheme();
  const { mainWrapper, approvalWrapper, approvalTicket } = styles;

  return (
    <CardLayout title={'Pending for Approval'} btnClick={() => {}}>
      <Box sx={mainWrapper(palette)}>
        <Typography fontWeight={600} color={palette?.blue?.main}>
          Request for :
          <Typography
            component={'span'}
            variant="body2"
            sx={approvalTicket(palette)}
          >{`${'# SR-8'}, ${'Adobe Illustrator CC  '}`}</Typography>
        </Typography>
        <Box sx={approvalWrapper}>
          <Avatar></Avatar>
          <Typography
            color={palette?.blue?.light}
          >{`Dough Lucas  sent approval request `}</Typography>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography color={palette?.grey?.[900]} fontSize={'0.75rem'}>
            {'3 hours ago'}
          </Typography>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography color={palette?.grey?.[900]} fontSize={'0.75rem'}>
            {'Via Phone'}
          </Typography>
        </Box>
      </Box>
    </CardLayout>
  );
};
