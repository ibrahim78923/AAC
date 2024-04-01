import { Box, Typography } from '@mui/material';
import useNotification from './useNotification';
import { styles } from './Notification.style';
import { NotificationIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_SETTINGS } from '@/constants/permission-keys';
import { SwitchBtn } from '@/components/SwitchButton';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

const Notification = () => {
  const { theme, notificationList, getDataLoading, handleSwitchNotifications } =
    useNotification();

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
          <PermissionsGuard
            permissions={[
              AIR_SALES_SETTINGS?.ACTIVE_INACTIVE_EMAIL_NOTIFICATION,
            ]}
          >
            <SwitchBtn />
          </PermissionsGuard>
        </Box>
        <Typography variant="h6" sx={{ marginY: '20px', fontWeight: '600' }}>
          Notification List
        </Typography>
        {getDataLoading ? (
          <SkeletonTable />
        ) : (
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
                  <SwitchBtn
                    defaultChecked={item?.status}
                    handleSwitchChange={(val: any) => {
                      handleSwitchNotifications(val, item?.title);
                    }}
                  />
                </PermissionsGuard>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Notification;
