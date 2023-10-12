import React from 'react';

import { Box, Typography, Switch } from '@mui/material';
import { styles } from './Notification.style';
import { DealsIcon, NotificationIcon, QuotesIcon } from '@/assets/icons';
import useNotification from './useNotification';

const Notification = () => {
  const { theme } = useNotification();

  return (
    <>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.grey[700]}`,
          padding: '2rem 1rem',
          boxShadow: '0px 1px 2px 0px #1018280F',
          borderRadius: '8px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h4">Notifications</Typography>
        </Box>

        <Typography variant="h6" sx={{ marginY: '20px', fontWeight: '600' }}>
          Email Notification
        </Typography>
        <Box sx={styles.BoxStyling(theme)}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <NotificationIcon />
            <Box sx={{ marginLeft: '15px' }}>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.slateBlue.main }}
              >
                Email
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.custom.main }}
              >
                Email notification will be sent to your inbox.
              </Typography>
            </Box>
          </Box>

          <Switch defaultChecked />
        </Box>
        <Typography variant="h6" sx={{ marginY: '20px', fontWeight: '600' }}>
          Notification List
        </Typography>
        <Box sx={styles.BoxStyling(theme)}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <DealsIcon />
            <Box sx={{ marginLeft: '15px' }}>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.slateBlue.main }}
              >
                Deals
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.custom.main }}
              >
                Deals notification will be sent to your inbox.{' '}
              </Typography>
            </Box>
          </Box>

          <Switch defaultChecked />
        </Box>

        <Box sx={styles.BoxStyling(theme)} style={{ marginTop: '25px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <QuotesIcon />
            <Box sx={{ marginLeft: '15px' }}>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.slateBlue.main }}
              >
                Quotes
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.custom.main }}
              >
                Quotes notification will be sent to your inbox.
              </Typography>
            </Box>
          </Box>

          <Switch defaultChecked />
        </Box>
      </Box>
    </>
  );
};

export default Notification;
