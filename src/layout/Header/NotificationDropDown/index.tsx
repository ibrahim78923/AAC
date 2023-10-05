import React, { useState } from 'react';
import Image from 'next/image';

import { Box, useTheme, Popover, Typography } from '@mui/material';

import { isNullOrEmpty } from '@/utils';

import { NotificationData } from '@/mock/modules/SuperAdminDashboard';

import { NotificationImage } from '@/assets/images';

import { v4 as uuidv4 } from 'uuid';

const NotificationDropdown = () => {
  const theme = useTheme();
  const [openPopver, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClose = () => {
    setOpenPopover(null);
  };

  const isOpenPopover = Boolean(openPopver);
  const id = isOpenPopover ? 'simple-popover' : undefined;

  return (
    <div>
      <Box onClick={handleClick}>
        <Image
          src={NotificationImage}
          alt="notification"
          style={{ cursor: 'pointer' }}
        />
      </Box>

      <Popover
        id={id}
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
          <Box>
            <Box sx={{ px: 2 }} key={uuidv4()}>
              <Box>
                {!isNullOrEmpty(NotificationData) &&
                  NotificationData?.map((item) => {
                    return (
                      <Box
                        sx={{
                          display: 'flex',

                          padding: '15px 0px 15px 10px',
                          gap: 1,
                        }}
                        key={uuidv4()}
                      >
                        <Image
                          src={item.icon}
                          width={32}
                          height={32}
                          alt="notification-avatar"
                        />
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ color: theme.palette.grey[600] }}
                          >
                            {item?.message}
                          </Typography>
                          <Typography
                            variant="body3"
                            sx={{ color: theme.palette.custom.main }}
                          >
                            {item?.date}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
            </Box>
          </Box>
        </>
      </Popover>
    </div>
  );
};

export default NotificationDropdown;
