import React from 'react';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRoles } from '../useRoles';
import { rolesCardOptions } from '../Roles.data';
import { AddRoleIcon } from '@/assets/icons';
import { SETTINGS_ADD_ROLE } from '@/constants/strings';
import { AlertModals } from '@/components/AlertModals';

const RolesView = ({ roleData }) => {
  const {
    openRolesMenu,
    rolesMenu,
    handleCloseMenu,
    handleClickMenu,
    addNewRole,
    isRoleDeleteModalOpen,
    roleCloseHandler,
    handleMenuOptionClick,
  } = useRoles();

  if (roleData?.roleTitle === SETTINGS_ADD_ROLE?.ADD_ROLE) {
    return (
      <Card
        sx={{ height: '100%', maxHeight: '15.8rem', cursor: 'pointer' }}
        onClick={addNewRole}
      >
        <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5">Add Role</Typography>
          <Box marginLeft={'auto'} marginTop={'4rem'}>
            <AddRoleIcon />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ cursor: 'pointer' }}>
      <CardContent style={{ display: 'flex' }}>
        <Typography variant="h5">{roleData?.roleTitle}</Typography>
        <Box marginLeft={'auto'}>
          <IconButton
            aria-label="more"
            id="roles-button"
            aria-controls={openRolesMenu ? 'roles-menu' : undefined}
            aria-expanded={openRolesMenu ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClickMenu}
          >
            <MoreHorizSharpIcon sx={{ color: '#6B7280' }} />
          </IconButton>
          <Menu
            id="roles-menu"
            MenuListProps={{
              'aria-labelledby': 'roles-button',
            }}
            anchorEl={rolesMenu}
            open={openRolesMenu}
            onClose={handleCloseMenu}
            sx={{
              '& .MuiList-root': {
                width: 143,
              },
            }}
          >
            {rolesCardOptions?.map((option) => (
              <MenuItem
                key={option}
                onClick={() => handleMenuOptionClick(option)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </CardContent>
      <AlertModals
        message="Are you sure you want to delete this Member?"
        type="delete"
        open={isRoleDeleteModalOpen}
        handleClose={roleCloseHandler}
        handleSubmit={handleMenuOptionClick}
      />

      <Typography sx={{ p: 2 }}>{roleData?.roleDescription}</Typography>
      {roleData?.roleTitle === SETTINGS_ADD_ROLE?.DEPARTMENT_HEAD ? (
        <Divider sx={{ mt: 2.5 }} />
      ) : (
        <Divider />
      )}
      <Box sx={{ p: 2, display: 'flex' }}>
        <GroupIcon sx={{ color: '#6B7280' }} />
        <Typography sx={{ ml: 2 }}>{roleData?.roleAgentCount}</Typography>{' '}
      </Box>
    </Card>
  );
};

export default RolesView;
