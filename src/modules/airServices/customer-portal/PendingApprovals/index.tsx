import React from 'react';
import { CardLayout } from '../CardLayout';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styles } from './PendingApprovals.style';

export const PendingApprovals = () => {
  const { palette }: any = useTheme();
  const { mainWrapper } = styles;

  return (
    <CardLayout title={'Pending for Approval'} btnClick={() => {}}>
      <Box sx={mainWrapper(palette)}>
        <Typography fontWeight={600} color={palette?.blue?.main}>
          Request for :
          <Typography
            component={'span'}
            variant="body2"
            fontSize={12}
            pl={'0.5rem'}
            color={palette?.blue?.main}
          >{`${'# SR-8'}, ${'Adobe Illustrator CC  '}`}</Typography>
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            pt: '0.5rem',
          }}
        >
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
