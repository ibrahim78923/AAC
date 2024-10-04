import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Box,
  useTheme,
  Popover,
  Typography,
  Badge,
  Divider,
} from '@mui/material';
import { NotificationImage } from '@/assets/images';
import { v4 as uuidv4 } from 'uuid';
import useNotificationDropDown from './useNotificationDropDown';
import dayjs from 'dayjs';
import NoData from '@/components/NoData';
import SkeletonComponent from '@/components/CardSkeletons';
import { generateImage } from '@/utils/avatarUtils';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setNotifications } from '@/redux/slices/notifications/notifications';
import { capitalizeFirstLetter } from '@/utils/api';

const NotificationDropdown = () => {
  const theme = useTheme();

  const [openPopver, setOpenPopover] = useState<
    (EventTarget & HTMLDivElement) | null
  >(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOpenPopover(event?.currentTarget);
  };

  const handleClose = () => {
    setOpenPopover(null);
  };

  const isOpenPopover = Boolean(openPopver);
  const { notificationsList, getNotificationLoading, handleSeenNotification } =
    useNotificationDropDown();
  const newNotificationsLength =
    notificationsList?.data?.notificationslogs?.filter((item: any) => {
      return item?.seen === false;
    });

  const notificationsData = useAppSelector(
    (state) => state.notifications.notificationsData,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setNotifications(notificationsList?.data?.notificationslogs));
  }, [notificationsList?.data?.notificationslogs]);

  return (
    <div>
      <Box onClick={handleClick}>
        {
          <Badge badgeContent={newNotificationsLength?.length} color="error">
            <Image
              src={NotificationImage}
              alt="notification"
              style={{ cursor: 'pointer' }}
            />
          </Badge>
        }
      </Box>
      <Popover
        // id={id}
        open={isOpenPopover}
        anchorEl={openPopver}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          marginTop: '20px',
          '& .MuiPopover-paper': {
            height: '80vh',
            width: '350px',
          },
        }}
      >
        <>
          <Box
            sx={{
              textAlign: 'center',
              p: 2,
            }}
          >
            <Typography variant="h5">Notifications</Typography>
          </Box>
          <Box sx={{ px: 2 }}>
            {getNotificationLoading ? (
              <SkeletonComponent numberOfSkeletons={5} />
            ) : (
              <Box>
                {notificationsData?.length > 0 ? (
                  notificationsData?.map((item: any) => {
                    return (
                      <Box key={uuidv4()} mt={0.5}>
                        <Box
                          sx={{
                            display: 'flex',
                            padding: '15px 0px 15px 10px',
                            alignItems: 'center',
                            gap: 1,
                            borderRadius: 1,
                            backgroundColor: !item?.seen
                              ? theme?.palette?.grey[400]
                              : theme?.palette?.common?.white,
                          }}
                          onClick={() => handleSeenNotification(item?._id)}
                        >
                          <Image
                            src={generateImage(item?.performedByAvatar?.url)}
                            width={32}
                            height={32}
                            alt="notification-avatar"
                          />
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ color: theme?.palette?.grey[600] }}
                            >
                              {`${item?.performedByName} ${capitalizeFirstLetter(
                                item?.activityType,
                              )} ${capitalizeFirstLetter(item?.module)}`}
                              {item?.message}
                            </Typography>
                            <Typography
                              variant="body3"
                              sx={{ color: theme?.palette?.custom?.main }}
                            >
                              {dayjs(item?.createdAt)?.format(
                                'MMM DD [at] h:mm A',
                              )}
                            </Typography>
                          </Box>
                        </Box>
                        <Divider />
                      </Box>
                    );
                  })
                ) : (
                  <NoData />
                )}
              </Box>
            )}
          </Box>
        </>
      </Popover>
    </div>
  );
};

export default NotificationDropdown;
