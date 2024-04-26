import React from 'react';

import { Box, Typography, Switch } from '@mui/material';

import useNotification from './useNotification';

import { styles } from './Notification.style';

import { DealsIcon, NotificationIcon, QuotesIcon } from '@/assets/icons';
import { AIR_MARKETER_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const Notification = () => {
  const { theme } = useNotification();

  return (
    <>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h3">Notifications</Typography>
        </Box>

        <Typography variant="h6" sx={{ marginY: '20px', fontWeight: '600' }}>
          Email Notification
        </Typography>
        <Box sx={styles?.BoxStyling(theme)}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <NotificationIcon />
            <Box sx={{ marginLeft: '15px' }}>
              <Typography
                variant="h6"
                sx={{ color: theme?.palette?.slateBlue?.main }}
              >
                Email
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme?.palette?.custom?.main }}
              >
                Email notification will be sent to your inbox.
              </Typography>
            </Box>
          </Box>
          <PermissionsGuard
            permissions={[
              AIR_MARKETER_SETTINGS_PERMISSIONS?.ACTIVE_INACTIVE_NOTIFICATIONS,
            ]}
          >
            <Switch defaultChecked />
          </PermissionsGuard>
        </Box>
        <Typography variant="h6" sx={{ marginY: '20px', fontWeight: '600' }}>
          Notification List
        </Typography>
        <Box sx={styles?.BoxStyling(theme)}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <DealsIcon />
            <Box sx={{ marginLeft: '15px' }}>
              <Typography
                variant="h6"
                sx={{ color: theme?.palette?.slateBlue?.main }}
              >
                Deals
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme?.palette?.custom?.main }}
              >
                Deals notification will be sent to your inbox.{' '}
              </Typography>
            </Box>
          </Box>
          <PermissionsGuard
            permissions={[
              AIR_MARKETER_SETTINGS_PERMISSIONS?.ACTIVE_INACTIVE_NOTIFICATIONS,
            ]}
          >
            <Switch defaultChecked />
          </PermissionsGuard>
        </Box>

        <Box sx={styles?.BoxStyling(theme)} style={{ marginTop: '25px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <QuotesIcon />
            <Box sx={{ marginLeft: '15px' }}>
              <Typography
                variant="h6"
                sx={{ color: theme?.palette?.slateBlue?.main }}
              >
                Quotes
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme?.palette?.custom?.main }}
              >
                Quotes notification will be sent to your inbox.
              </Typography>
            </Box>
          </Box>

          <PermissionsGuard
            permissions={[
              AIR_MARKETER_SETTINGS_PERMISSIONS?.ACTIVE_INACTIVE_NOTIFICATIONS,
            ]}
          >
            <Switch defaultChecked />
          </PermissionsGuard>
        </Box>
      </Box>
    </>
  );
};

export default Notification;
