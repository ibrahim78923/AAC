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
  FacebookImage,
  InstagramImage,
  TwitterImage,
  YoutubeImage,
} from '@/assets/images';

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
  } = useFilter();

  return (
    <Grid
      container
      sx={{ display: 'flex', gap: '10px', justifyContent: 'end' }}
    >
      <Grid xs={12} md={6} lg={2} className="select-users">
        <Button
          onClick={handleClickActions}
          sx={{
            border: `1px solid ${theme?.palette?.custom?.dark}`,
            color: theme?.palette?.custom?.main,
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
              alt="Instagram Image"
              src={InstagramImage.src}
            />
            <Avatar
              style={{
                border: 'none',
                marginLeft: '-20px',
              }}
              alt="Facebook Image"
              src={FacebookImage.src}
            />
            <Avatar
              style={{
                border: 'none',
                marginLeft: '-20px',
              }}
              alt="YoutubeImage"
              src={YoutubeImage.src}
            />
            <Avatar
              style={{
                border: 'none',
                marginLeft: '-20px',
              }}
              alt="Twitter Image"
              src={TwitterImage.src}
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
        >
          <MenuItem>Facebook</MenuItem>
          <MenuItem>Instagram</MenuItem>
          <MenuItem>Youtube</MenuItem>
          <MenuItem>Twitter</MenuItem>
        </Menu>
      </Grid>
      <Grid xs={12} md={6} lg={2} className="select-status">
        <Button
          onClick={handleProfilesClickActions}
          sx={{
            border: `1px solid ${theme?.palette?.custom?.dark}`,
            color: theme?.palette?.custom?.main,
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
              alt="YoutubeImage"
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
              alt="Twitter Image"
              src={AvatarImage.src}
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
          <MenuItem>Profiles</MenuItem>
          <MenuItem>Profiles</MenuItem>
          <MenuItem>Profiles</MenuItem>
          <MenuItem>Profiles</MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default Filters;
