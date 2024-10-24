import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Box,
  useTheme,
  Popover,
  Typography,
  Badge,
  Divider,
  Avatar,
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
import { indexNumbers } from '@/constants';

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

  const notificationsData = useAppSelector(
    (state) => state.notifications.notificationsData,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setNotifications(notificationsList?.data?.notificationslogs));
  }, [notificationsList?.data?.notificationslogs, useAppSelector, dispatch]);

  const newNotificationsLength = notificationsData?.filter((item: any) => {
    return item?.seen === false;
  });

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
                {notificationsData?.length > indexNumbers?.ZERO ? (
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
                          <Avatar
                            src={generateImage(item?.performedByAvatar?.url)}
                            sx={{ color: theme?.palette?.grey[600] }}
                          >
                            {item?.performedByName?.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ color: theme?.palette?.grey[600] }}
                            >
                              {item?.message
                                ? item?.message
                                : `${capitalizeFirstLetter(
                                    item?.performedByName,
                                  )} ${capitalizeFirstLetter(
                                    item?.activityType,
                                  )} ${capitalizeFirstLetter(item?.module)}`}
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
