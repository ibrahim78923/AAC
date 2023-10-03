import React, { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import {
  Box,
  Menu,
  MenuItem,
  Typography,
  Divider,
  InputBase,
  useTheme,
  IconButton,
  Dialog,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import LinkDropdown from './LinkDropDown';
import AccountMenu from './AccountMenu';
import Search from '@/components/Search';
import NotificationDropdown from './NotificationDropDown';

import { isNullOrEmpty } from '@/utils';

import {
  ProfileDropDown,
  QuickLinkData,
  StatusDropDown,
} from '../SuperAdminLayout.data';

import {
  ArrowDownImage,
  ArrowUpImage,
  AvatarImage,
  SearchImage,
} from '@/assets/images';

import { HeaderStyles } from './Header.style';

import { v4 as uuidv4 } from 'uuid';

const role = 'super-admin';

const Header = (props: any) => {
  const { handleDrawerToggle } = props;
  const theme = useTheme();

  const [isExpanded, setIsExpanded] = useState(false);
  const [profileDropDown, setProfileDropDown] = useState<null | HTMLElement>(
    null,
  );
  const [statusDropDown, setStatusDropDown] = useState<null | HTMLElement>(
    null,
  );
  const [searchValue, SetSearchValue] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleClickOpen = () => {
    setIsOpenModal(true);
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const isProfileDropDownOpen = Boolean(profileDropDown);
  const isStatusOpen = Boolean(statusDropDown);

  const statusDropdownHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setStatusDropDown(event.currentTarget);
  };

  const profileDropdownHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setProfileDropDown(event.currentTarget);
  };
  const closeProfileDropDown = () => {
    setProfileDropDown(null);
  };
  const closeStatusDropDown = () => {
    setStatusDropDown(null);
  };

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <Box
        sx={{
          mr: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' }, padding: 0 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
            <Box
              component="form"
              sx={HeaderStyles.searchAnimation(isExpanded, theme)}
            >
              <InputBase
                fullWidth
                sx={{ ml: 1, display: !isExpanded && 'none' }}
                inputProps={{ 'aria-label': 'search' }}
              />
              <IconButton onClick={handleExpandClick}>
                <Image src={SearchImage} alt="search" />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: { md: 'block', lg: 'none' } }}>
            <Box
              component="form"
              sx={HeaderStyles.searchIcon(theme)}
              onClick={handleClickOpen}
            >
              <IconButton>
                <Image src={SearchImage} alt="search" />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            gap: 2,
            alignItems: 'center',
          }}
        >
          {role === 'sales' && (
            <Box sx={HeaderStyles.quickLinkBox(theme)}>
              {!isNullOrEmpty(QuickLinkData) &&
                QuickLinkData.map((image) => (
                  <Box
                    key={uuidv4()}
                    sx={HeaderStyles.innerQuickLinkBox(theme)}
                  >
                    <Image
                      src={image?.icon}
                      alt="logo"
                      width={18}
                      height={18}
                    />
                  </Box>
                ))}
            </Box>
          )}
          {role && <AccountMenu />}

          <LinkDropdown />
          <NotificationDropdown />

          {role === 'sales' && (
            <Typography
              variant="subtitle1"
              sx={{ color: theme.palette.primary.main }}
            >
              Orcalo Limited
            </Typography>
          )}
          <Image src={AvatarImage} alt="Avatar" />
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
                    sx={{ color: theme.palette.grey[600] }}
                  >
                    Sophie Turner
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.grey[600] }}
                  >
                    Sales Manager
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            <Divider />
            {!isNullOrEmpty(ProfileDropDown) &&
              ProfileDropDown.map((item) => (
                <MenuItem
                  key={uuidv4()}
                  onClick={closeStatusDropDown}
                  sx={{
                    gap: 1,
                    padding: '12px',
                    fontSize: '16px',
                    color: theme.palette.grey[600],
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
              StatusDropDown.map((statusItem) => (
                <MenuItem
                  key={uuidv4()}
                  onClick={closeStatusDropDown}
                  sx={{
                    gap: 1,
                    fontSize: '16px',
                    color: theme.palette.grey[600],
                  }}
                >
                  <Image src={statusItem?.icon} alt="icon" />{' '}
                  {statusItem?.label}
                </MenuItem>
              ))}
          </Menu>
        </Box>
      </Box>

      <Dialog
        open={isOpenModal}
        onClose={handleClose}
        maxWidth="md"
        sx={{
          '& .MuiDialog-paper': {
            width: '300px',
            height: '300px',
            padding: '20px 20px',
            alignItems: 'center',
          },
        }}
      >
        <Box>
          <Search
            searchBy={searchValue}
            setSearchBy={SetSearchValue}
            label="Search By Name"
            width="260px"
          />
        </Box>
      </Dialog>
    </>
  );
};

export default Header;
