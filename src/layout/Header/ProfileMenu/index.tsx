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
  Avatar,
} from '@mui/material';

import { getSession, isNullOrEmpty } from '@/utils';

import { ProfileDropDown, StatusDropDown } from '@/layout/Layout.data';

import { ArrowDownImage, ArrowUpImage } from '@/assets/images';

import { v4 as uuidv4 } from 'uuid';
import { generateImage } from '@/utils/avatarUtils';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useRouter } from 'next/router';

const ProfilMenu = () => {
  const router = useRouter();
  const currentPath = router?.pathname;
  const pathSegments = currentPath?.slice(1)?.split('/');
  const basePath = pathSegments[0];

  const [statusDropDown, setStatusDropDown] = useState<null | HTMLElement>(
    null,
  );

  const theme = useTheme();
  const { user }: any = getSession();

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
          px: { xs: '0', sm: '8px' },
          justifyContent: 'center',
        }}
      >
        <ArrowDropDownIcon sx={{ fontSize: '30px' }} />
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
            <Avatar
              src={generateImage(user?.avatar?.url)}
              sx={{
                width: 30,
                height: 30,
                bgcolor: 'primary.main',
                fontSize: 13,
              }}
            >
              {`${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`}
            </Avatar>
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
                {`${user?.firstName} ${user?.lastName}`}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme?.palette?.grey[600] }}
              >
                {user?.jobTitle}
              </Typography>
            </Box>
          </Box>
        </MenuItem>
        <Divider />
        {!isNullOrEmpty(ProfileDropDown(basePath)) &&
          ProfileDropDown(basePath)?.map((item) => (
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
              <Link href={`${item?.key}`} onClick={closeProfileDropDown}>
                {item?.label}
              </Link>
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
