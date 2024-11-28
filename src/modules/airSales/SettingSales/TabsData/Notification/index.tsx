import { Box, CircularProgress, Typography } from '@mui/material';
import useNotification from './useNotification';
import { styles } from './Notification.style';
import { NotificationIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_SETTINGS } from '@/constants/permission-keys';
import { SwitchBtn } from '@/components/SwitchButton';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { v4 as uuidv4 } from 'uuid';

const Notification: any = () => {
  const {
    theme,
    notificationList,
    getDataLoading,
    handleSwitchNotifications,
    notificationsStatus,
    loadingState,
  } = useNotification();

  return (
    <>
      {getDataLoading ? (
        <SkeletonTable />
      ) : (
        <Box
          sx={{
            border: `1px solid ${theme?.palette?.grey[700]}`,
            padding: '1rem',
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
            <Typography variant="h3">Notifications</Typography>
          </Box>

          <Typography variant="h6" sx={{ marginY: '20px', fontWeight: '600' }}>
            Email Notification
          </Typography>
          <Box sx={styles.BoxStyling(theme)}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
            >
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
            <PermissionsGuard
              permissions={[
                AIR_SALES_SETTINGS?.ACTIVE_INACTIVE_EMAIL_NOTIFICATION,
              ]}
            >
              <SwitchBtn
                defaultChecked={notificationsStatus?.emailNotification}
                handleSwitchChange={(val: any) => {
                  handleSwitchNotifications(val, 'emailNotification');
                }}
              />
            </PermissionsGuard>
          </Box>
          <Typography variant="h6" sx={{ marginY: '20px', fontWeight: '600' }}>
            Notification List
          </Typography>
          <Box display="flex" gap={2} flexDirection="column">
            {notificationList?.map((item: any) => (
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
                <PermissionsGuard permissions={[item?.permission]}>
                  {loadingState[item?.key] ? (
                    <CircularProgress size={25} />
                  ) : (
                    <SwitchBtn
                      defaultChecked={item?.status}
                      handleSwitchChange={(val: any) => {
                        handleSwitchNotifications(val, item?.key);
                      }}
                    />
                  )}
                </PermissionsGuard>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Notification;
