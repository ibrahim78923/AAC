import { Avatar, Box, MenuItem, Popover, Tooltip } from '@mui/material';
import { Fragment, useState, useEffect } from 'react';
import { ProfileAvatars } from './Profile.data';
import { v4 as uuidv4 } from 'uuid';

export const Profile = () => {
  const [users, setUsers] = useState<any>([]);
  const [usersExtra, setUsersExtra] = useState([]);
  const [showExtras, setShowExtras] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setUsers(ProfileAvatars?.slice(0, 5));
    setUsersExtra(ProfileAvatars?.slice(5, ProfileAvatars?.length));
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
            onClick={(event: any) => setShowExtras(event.currentTarget)}
          >
            +{usersExtra?.length}
          </Avatar>
        </Tooltip>
      )}

      {showExtras && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
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
          <Box width={250} p={1}>
            {usersExtra?.map((item: any) => (
              <MenuItem key={uuidv4()}>
                <Tooltip title={item?.name}>
                  <Avatar src={item?.img?.src} />
                </Tooltip>
              </MenuItem>
            ))}
          </Box>
        </Popover>
      )}
    </Fragment>
  );
};
