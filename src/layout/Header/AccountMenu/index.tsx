import React, { useState } from 'react';
import Image from 'next/image';

import { Box, useTheme, Popover, Typography } from '@mui/material';

import { isNullOrEmpty } from '@/utils';

import { MyAccountData } from '@/mock/modules/SuperAdminDashboard';

import { CrossImage, HomeMenuImage } from '@/assets/images';

import { v4 as uuidv4 } from 'uuid';

import { styles } from './AccountMenu.style';

const role = 'sales';
const AccountMenu = () => {
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
          src={HomeMenuImage}
          alt="dropdown"
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
            height: '93vh',
            width: '450px',
          },
        }}
      >
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 2,
            }}
          >
            <Typography variant="subtitle1">My Accounts</Typography>
            <Typography
              variant="subtitle2"
              onClick={handleClose}
              sx={{ cursor: 'pointer' }}
            >
              <Image src={CrossImage} alt="cross-image" />
            </Typography>
          </Box>
          <Box>
            {!isNullOrEmpty(MyAccountData) &&
              MyAccountData.map((item) => {
                return (
                  <Box sx={{ px: 2 }} key={uuidv4()}>
                    <Box sx={styles.mainBox(item, role, theme)}>
                      <Box style={styles.cartBox(item, role, theme)}>
                        <Image
                          src={item.icon}
                          alt="icon"
                          style={{
                            filter:
                              item.role === role
                                ? 'brightness(100) grayscale(100%)'
                                : '',
                          }}
                        />
                      </Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ marginLeft: '10px' }}
                      >
                        {item.title}
                      </Typography>
                    </Box>

                    <Box>
                      {item?.children?.map((subitem) => {
                        return (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'baseline',
                              padding: '10px 0px 10px 45px',
                            }}
                            key={uuidv4()}
                          >
                            <Typography
                              sx={styles.radioCircle(theme)}
                            ></Typography>
                            <Box>
                              <Typography variant="body1">
                                {subitem?.company}
                              </Typography>
                              <Typography variant="body2">
                                {subitem?.websiteLink}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </>
      </Popover>
    </div>
  );
};

export default AccountMenu;
