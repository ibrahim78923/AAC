import { useState } from 'react';
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
                {notificationsList?.data?.notificationslogs?.length > 0 ? (
                  notificationsList?.data?.notificationslogs?.map(
                    (item: any) => {
                      return (
                        <Box key={uuidv4()}>
                          <Box
                            sx={{
                              display: 'flex',
                              padding: '15px 0px 15px 10px',
                              alignItems: 'center',
                              gap: 1,
                              backgroundColor:
                                !item?.seen && theme?.palette?.grey[100],
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
                                {`${item?.performedByName} updates ${item?.module}`}
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
                    },
                  )
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
