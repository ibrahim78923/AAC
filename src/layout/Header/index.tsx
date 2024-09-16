import React, { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import {
  Box,
  Typography,
  InputBase,
  useTheme,
  IconButton,
  Dialog,
  Avatar,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import LinkDropdown from './LinkDropDown';
import AccountMenu from './AccountMenu';
import Search from '@/components/Search';
import NotificationDropdown from './NotificationDropDown';
import SocialIconsDropdown from './SocialIconsDropdown';
import ProfilMenu from './ProfileMenu';

import { getSession, isNullOrEmpty } from '@/utils';

import { QuickLinkData } from '../Layout.data';

import { SearchSharedIcon } from '@/assets/icons';

import { styles } from './Header.style';

import { v4 as uuidv4 } from 'uuid';
import { generateImage } from '@/utils/avatarUtils';
import { ROLES } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const Header = (props: any) => {
  const { currentPermissions } = useAuth();

  const { handleDrawerToggle } = props;
  const theme = useTheme();
  const { user } = getSession();

  const [isExpanded, setIsExpanded] = useState(false);

  const [searchValue, SetSearchValue] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [innerBoxesRendered, setInnerBoxesRendered] = useState(false);

  const role = user?.role;

  const handleClickOpen = () => {
    setIsOpenModal(true);
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', mr: '8px' }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: { sm: 2, xs: 1.2 }, display: { md: 'none' }, padding: 0 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
            <Box
              component="form"
              sx={styles?.searchAnimation(isExpanded, theme)}
            >
              <InputBase
                fullWidth
                sx={{ ml: 1, display: !isExpanded && 'none' }}
                inputProps={{ 'aria-label': 'search' }}
              />
              <IconButton onClick={handleExpandClick}>
                {/* <Image src={SearchImage} alt="search" /> */}
                <SearchSharedIcon />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: { md: 'block', lg: 'none' } }}>
            <Box
              component="form"
              sx={styles?.searchIcon(theme)}
              onClick={handleClickOpen}
            >
              <IconButton>
                <SearchSharedIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            gap: { sm: 2, xs: 1 },
            alignItems: 'center',
          }}
        >
          {role !== ROLES?.SUPER_ADMIN && currentPermissions && (
            <Box sx={styles?.quickLinkBox(theme, innerBoxesRendered)}>
              {!isNullOrEmpty(QuickLinkData) &&
                QuickLinkData?.map((image) => (
                  <PermissionsGuard
                    key={uuidv4()}
                    permissions={image?.permissions}
                  >
                    <Box
                      key={uuidv4()}
                      sx={styles?.innerQuickLinkBox(theme)}
                      onLoad={() => {
                        if (!innerBoxesRendered) {
                          setInnerBoxesRendered(true);
                        }
                      }}
                    >
                      <Link href={image?.path}>
                        <Image
                          src={image?.icon}
                          alt="logo"
                          width={18}
                          height={18}
                        />
                      </Link>
                    </Box>
                  </PermissionsGuard>
                ))}
            </Box>
          )}
          {role && <SocialIconsDropdown />}
          {role !== ROLES?.SUPER_ADMIN && role !== ROLES?.ORG_REQUESTER && (
            <AccountMenu />
          )}
          {role !== ROLES?.ORG_REQUESTER && <LinkDropdown />}

          <NotificationDropdown />

          {role === 'sales' && (
            <Typography
              variant="subtitle1"
              sx={{ color: theme?.palette?.primary?.main }}
            >
              Orcalo Limited
            </Typography>
          )}
          <Avatar
            src={generateImage(user?.avatar?.url)}
            sx={{ width: 30, height: 30 }}
          >
            {`${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`}
          </Avatar>
          <ProfilMenu />
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
