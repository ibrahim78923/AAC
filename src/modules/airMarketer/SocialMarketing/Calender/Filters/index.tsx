import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  Avatar,
  AvatarGroup,
  Button,
  Grid,
  Menu,
  MenuItem,
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import useFilter from './useFilter';
import {
  AvatarImage,
  FacebookCalenderImage,
  InstagramCalenderImage,
  TwitterCalenderImage,
  YoutubeCalenderImage,
  FacebookDropdownImage,
  InstagramDropdownImage,
  TwitterDropdownImage,
  LinkedinDropdownImage,
} from '@/assets/images';
import Image from 'next/image';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_SOCIAL_MARKETING_CALENDER_PERMISSIONS } from '@/constants/permission-keys';

dayjs.extend(customParseFormat);

const Filters = () => {
  const theme = useTheme();
  const {
    handleClickActions,
    handleCloseMenuOptions,
    anchorEl,
    openDropDown,
    handleProfilesCloseMenuOptions,
    handleProfilesClickActions,
    profilesAnchorEl,
    openDropDownprofiles,
    handleClose,
  } = useFilter();

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'end',
        marginBottom: { xs: '60px', sm: '0px' },
      }}
    >
      <PermissionsGuard
        permissions={[
          AIR_MARKETER_SOCIAL_MARKETING_CALENDER_PERMISSIONS?.FILTER_BY_PLATFORM,
        ]}
      >
        <Grid xs={12} sm={6} md={6} lg={2} className="select-users">
          <Button
            onClick={handleClickActions}
            sx={{
              border: `1px solid ${theme?.palette?.custom?.dark}`,
              color: theme?.palette?.custom?.main,
              backgroundColor: 'white',
              width: '100%',
              height: '36px',
              '@media (max-width:400px)': {
                width: '100% !important',
              },
            }}
          >
            <AvatarGroup total={4}>
              <Avatar
                style={{
                  border: 'none',
                  marginLeft: '-23px',
                }}
                alt="Instagram Image"
                src={InstagramCalenderImage?.src}
              />
              <Avatar
                style={{
                  border: 'none',
                  marginLeft: '-23px',
                }}
                alt="Facebook Image"
                src={FacebookCalenderImage?.src}
              />
              <Avatar
                style={{
                  border: 'none',
                  marginLeft: '-23px',
                }}
                alt="YoutubeImage"
                src={YoutubeCalenderImage?.src}
              />
              <Avatar
                style={{
                  border: 'none',
                  marginLeft: '-23px',
                }}
                alt="Twitter Image"
                src={TwitterCalenderImage?.src}
              />
            </AvatarGroup>{' '}
            Platforms
            <ArrowDropDown />
          </Button>

          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={openDropDown}
            onClose={handleCloseMenuOptions}
            sx={{ width: '100%' }}
          >
            <MenuItem
              onClick={handleClose}
              sx={{ width: '215px', padding: '10px 15px' }}
            >
              {' '}
              <Image
                src={FacebookDropdownImage}
                alt="logo"
                style={{ marginRight: '10px' }}
              />{' '}
              Facebook
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{ width: '215px', padding: '10px 15px' }}
            >
              {' '}
              <Image
                src={InstagramDropdownImage}
                alt="logo"
                style={{ marginRight: '10px' }}
              />
              Instagram
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{ width: '215px', padding: '10px 15px' }}
            >
              {' '}
              <Image
                src={LinkedinDropdownImage}
                alt="logo"
                style={{ marginRight: '10px' }}
              />
              Linkedin
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{ width: '215px', padding: '10px 15px' }}
            >
              {' '}
              <Image
                src={TwitterDropdownImage}
                alt="logo"
                style={{ marginRight: '10px' }}
              />
              Twitter
            </MenuItem>
          </Menu>
        </Grid>
      </PermissionsGuard>
      <PermissionsGuard
        permissions={[
          AIR_MARKETER_SOCIAL_MARKETING_CALENDER_PERMISSIONS?.FILTER_BY_PROFILE,
        ]}
      >
        <Grid xs={12} sm={6} md={6} lg={2} className="select-status">
          <Button
            onClick={handleProfilesClickActions}
            sx={{
              border: `1px solid ${theme?.palette?.custom?.dark}`,
              color: theme?.palette?.custom?.main,
              backgroundColor: 'white',
              width: '100%',
              height: '36px',
              '@media (max-width:400px)': {
                width: '100% !important',
              },
            }}
          >
            <AvatarGroup total={4}>
              <Avatar
                style={{
                  border: 'none',
                  marginLeft: '-20px',
                }}
                sx={{
                  '& .MuiAvatar-img': {
                    width: '75%',
                    height: '75%',
                    border: '2px solid white',
                    borderRadius: '50%',
                  },
                }}
                alt="Instagram Image"
                src={AvatarImage.src}
              />
              <Avatar
                style={{
                  border: 'none',
                  marginLeft: '-20px',
                }}
                sx={{
                  '& .MuiAvatar-img': {
                    width: '75%',
                    height: '75%',
                    border: '2px solid white',
                    borderRadius: '50%',
                  },
                }}
                alt="Facebook Image"
                src={AvatarImage?.src}
              />
              <Avatar
                style={{
                  border: 'none',
                  marginLeft: '-20px',
                }}
                sx={{
                  '& .MuiAvatar-img': {
                    width: '75%',
                    height: '75%',
                    border: '2px solid white',
                    borderRadius: '50%',
                  },
                }}
                alt="YoutubeImage"
                src={AvatarImage?.src}
              />
              <Avatar
                style={{
                  border: 'none',
                  marginLeft: '-20px',
                }}
                sx={{
                  '& .MuiAvatar-img': {
                    width: '75%',
                    height: '75%',
                    border: '2px solid white',
                    borderRadius: '50%',
                  },
                }}
                alt="Twitter Image"
                src={AvatarImage?.src}
              />
            </AvatarGroup>{' '}
            Profiles
            <ArrowDropDown />
          </Button>

          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={profilesAnchorEl}
            open={openDropDownprofiles}
            onClose={handleProfilesCloseMenuOptions}
            sx={{ width: '100%' }}
          >
            <MenuItem
              onClick={handleClose}
              sx={{ width: '215px', padding: '10px 15px' }}
            >
              {' '}
              <Image
                src={AvatarImage}
                alt="logo"
                style={{ marginRight: '10px', width: '27px', height: '27px' }}
              />{' '}
              Profiles
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{ width: '215px', padding: '10px 15px' }}
            >
              {' '}
              <Image
                src={AvatarImage}
                alt="logo"
                style={{ marginRight: '10px', width: '27px', height: '27px' }}
              />{' '}
              Profiles
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{ width: '215px', padding: '10px 15px' }}
            >
              {' '}
              <Image
                src={AvatarImage}
                alt="logo"
                style={{ marginRight: '10px', width: '27px', height: '27px' }}
              />{' '}
              Profiles
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{ width: '215px', padding: '10px 15px' }}
            >
              {' '}
              <Image
                src={AvatarImage}
                alt="logo"
                style={{ marginRight: '10px', width: '27px', height: '27px' }}
              />{' '}
              Profiles
            </MenuItem>
          </Menu>
        </Grid>
      </PermissionsGuard>
    </Grid>
  );
};

export default Filters;
