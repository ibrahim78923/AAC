import { Avatar, Box, Menu, Tooltip, Typography } from '@mui/material';
import { Fragment, useState, useEffect } from 'react';
import { ProfileAvatars } from './Profile.data';
import { v4 as uuidv4 } from 'uuid';

export const Profile = () => {
  const [users, setUsers] = useState<any>([]);
  const [usersExtra, setUsersExtra] = useState<any>([]);
  const [showExtras, setShowExtras] = useState<any>(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'basic-menu' : undefined;

  const maxLimit = 5;

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setUsers(ProfileAvatars?.slice(0, maxLimit));
    setUsersExtra(ProfileAvatars?.slice(maxLimit, ProfileAvatars?.length));
  }, [ProfileAvatars]);

  return (
    <Fragment>
      <Avatar
        sx={{
          bgcolor: 'primary.lighter',
          color: 'primary.main',
          borderRadius: 2,
          cursor: 'pointer',
        }}
      >
        All
      </Avatar>

      {users?.map((item: any) => (
        <Tooltip title={item?.name} key={uuidv4()}>
          <Avatar
            sx={{ borderRadius: 2, mx: 0.2, cursor: 'pointer' }}
            src={item?.img?.src}
          />
        </Tooltip>
      ))}

      {usersExtra?.length > 0 && (
        <Tooltip title="Show Remaining">
          <Avatar
            sx={{
              bgcolor: 'primary.lighter',
              color: 'primary.main',
              borderRadius: 2,
              cursor: 'pointer',
            }}
            onClick={(event: any) => {
              setAnchorEl(event.currentTarget);
              setShowExtras(true);
            }}
          >
            +{usersExtra?.length}
          </Avatar>
        </Tooltip>
      )}

      {showExtras && (
        <Menu
          id={id}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box width={250}>
            {usersExtra?.map((item: any) => (
              <Box
                key={uuidv4()}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  borderRadius: 2,
                  p: 1,
                  ':hover': { bgcolor: 'primary.lighter' },
                }}
              >
                <Avatar src={item?.img?.src} />
                <Typography variant={'body1'}>{item?.name}</Typography>
              </Box>
            ))}
          </Box>
        </Menu>
      )}
    </Fragment>
  );
};
