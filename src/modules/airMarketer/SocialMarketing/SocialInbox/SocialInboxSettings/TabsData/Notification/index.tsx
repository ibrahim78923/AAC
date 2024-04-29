import React from 'react';

import { Box, Typography } from '@mui/material';

import useNotification from './useNotification';

import { styles } from './Notification.style';

import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { SwitchBtn } from '@/components/SwitchButton';
import { v4 as uuidv4 } from 'uuid';

const Notification = () => {
  const {
    theme,
    notificationList,
    getDataLoading,
    handleSwitchNotifications,
    updateLoading,
  } = useNotification();

  return (
    <>
      {getDataLoading && updateLoading ? (
        <SkeletonTable />
      ) : (
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

          <Box display="flex" gap={2} flexDirection="column">
            {notificationList?.map((item: any) => (
              <>
                {item?.title === 'Email' && (
                  <Typography
                    variant="h6"
                    sx={{ marginTop: '20px', fontWeight: '600' }}
                  >
                    Email Notification
                  </Typography>
                )}

                {item?.title === 'Companies' && (
                  <Typography
                    variant="h6"
                    sx={{ marginTop: '20px', fontWeight: '600' }}
                  >
                    Module List Notification
                  </Typography>
                )}
                <PermissionsGuard permissions={[item?.permission]}>
                  <Box sx={styles?.BoxStyling(theme)} key={uuidv4()}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}
                    >
                      {item?.icon}
                      <Box sx={{ marginLeft: '15px' }}>
                        <Typography
                          variant="h6"
                          sx={{ color: theme?.palette?.slateBlue?.main }}
                        >
                          {item?.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: theme?.palette?.custom?.main }}
                        >
                          {item?.description}
                        </Typography>
                      </Box>
                    </Box>
                    <SwitchBtn
                      defaultChecked={item?.status}
                      handleSwitchChange={(val: any) => {
                        handleSwitchNotifications(val, item?.key);
                      }}
                    />
                  </Box>
                </PermissionsGuard>
              </>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Notification;
