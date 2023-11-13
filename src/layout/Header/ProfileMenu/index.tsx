import React, { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import {
  Box,
  Menu,
  MenuItem,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';

import { isNullOrEmpty } from '@/utils';

import { ProfileDropDown, StatusDropDown } from '@/layout/Layout.data';

import { ArrowDownImage, ArrowUpImage, AvatarImage } from '@/assets/images';

import { v4 as uuidv4 } from 'uuid';

const ProfilMenu = () => {
  const [statusDropDown, setStatusDropDown] = useState<null | HTMLElement>(
    null,
  );

  const theme = useTheme();

  const [profileDropDown, setProfileDropDown] = useState<null | HTMLElement>(
    null,
  );

  const isProfileDropDownOpen = Boolean(profileDropDown);
  const isStatusOpen = Boolean(statusDropDown);

  const statusDropdownHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setStatusDropDown(event.currentTarget);
  };

  const profileDropdownHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setProfileDropDown(event.currentTarget);
  };
  const closeProfileDropDown = () => {
    setProfileDropDown(null);
  };
  const closeStatusDropDown = () => {
    setStatusDropDown(null);
  };

  return (
    <div>
      <Box
        onClick={profileDropdownHandler}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <Image src={ArrowDownImage} alt="Avatar" />
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={profileDropDown}
        open={isProfileDropDownOpen}
        onClose={closeProfileDropDown}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          marginTop: '20px',
        }}
      >
        <MenuItem>
          <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
            <Image src={AvatarImage} alt="Avatar" />
            <Box onClick={statusDropdownHandler}>
              <Image
                src={isStatusOpen ? ArrowUpImage : ArrowDownImage}
                alt="Avatar"
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="subtitle2"
                sx={{ color: theme?.palette?.grey[600] }}
              >
                Sophie Turner
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme?.palette?.grey[600] }}
              >
                Sales Manager
              </Typography>
            </Box>
          </Box>
        </MenuItem>
        <Divider />
        {!isNullOrEmpty(ProfileDropDown) &&
          ProfileDropDown?.map((item) => (
            <MenuItem
              key={uuidv4()}
              onClick={closeStatusDropDown}
              sx={{
                gap: 1,
                padding: '12px',
                fontSize: '16px',
                color: theme?.palette?.grey[600],
              }}
            >
              <Link href={`${item?.key}`}>{item?.label}</Link>
            </MenuItem>
          ))}
      </Menu>

      <Menu
        id="basic-menu"
        anchorEl={statusDropDown}
        open={isStatusOpen}
        onClose={closeStatusDropDown}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {!isNullOrEmpty(StatusDropDown) &&
          StatusDropDown?.map((statusItem) => (
            <MenuItem
              key={uuidv4()}
              onClick={closeStatusDropDown}
              sx={{
                gap: 1,
                fontSize: '16px',
                color: theme?.palette?.grey[600],
              }}
            >
              <Image src={statusItem?.icon} alt="icon" /> {statusItem?.label}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default ProfilMenu;
