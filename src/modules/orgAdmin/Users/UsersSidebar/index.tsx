import Image from 'next/image';

import { Avatar, Box, Button, Divider, Typography } from '@mui/material';

import FilterUser from '../Drawers/FilterUser';

import { FilterSharedIcon, PlusSharedIcon } from '@/assets/icons';

import Search from '@/components/Search';

import StatusBadge from '@/components/StatusBadge';

import AddUser from '../Drawers/AddUser';

import useUsersSidebar from './useUsersSidebar';

import { AvatarImage } from '@/assets/images';

const UsersSidebar = () => {
  const {
    userStatus,
    setUserStatus,
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    isOpenAdduserDrawer,
    setIsOpenAdduserDrawer,
    theme,
  } = useUsersSidebar();
  return (
    <Box
      sx={{
        padding: '24px 16px',
        borderRadius: '8px 0px 0px 8px',
        background: theme?.palette?.common?.white,
        minHeight: `calc(100% - ${0}px)`,
      }}
    >
      <Box
        py={1}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h3">Users</Typography>
        <Button
          onClick={() => {
            setIsOpenAdduserDrawer(true);
          }}
          variant="contained"
          startIcon={<PlusSharedIcon />}
        >
          Add User
        </Button>
      </Box>
      <Divider />
      <Box
        py={1}
        sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}
      >
        <Search placeholder="Placeholder" size="small" />
        <Button
          onClick={() => {
            setIsOpenFilterDrawer(true);
          }}
          sx={{
            border: '1px solid grey',
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FilterSharedIcon />
        </Button>
      </Box>

      <Box
        className="users-wrapper"
        sx={{
          backgroundColor: theme.palette.grey[400],
          borderRadius: '4px',
          padding: '11px 8px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            flexWrap: { xs: 'wrap', sm: 'nowrap', lg: 'wrap', xl: 'nowrap' },
          }}
        >
          <Avatar>
            <Image src={AvatarImage} alt="Avatar" width={40} height={40} />
          </Avatar>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Roberts Rohan</Typography>
              <StatusBadge
                value={userStatus}
                onChange={(e: any) => setUserStatus(e.target.value)}
                options={[
                  {
                    label: 'Active',
                    value: 'active',
                    color: theme?.palette?.success?.main,
                  },
                  {
                    label: 'Inactive',
                    value: 'inactive',
                    color: theme?.palette?.error?.main,
                  },
                ]}
              />
            </Box>
            <Typography>Robert@airapplecart.co.uk</Typography>
          </Box>
        </Box>
      </Box>

      {isOpenFilterDrawer && (
        <FilterUser
          isOpenDrawer={isOpenFilterDrawer}
          onClose={() => {
            setIsOpenFilterDrawer(false);
          }}
        />
      )}

      {isOpenAdduserDrawer && (
        <AddUser
          isOpenDrawer={isOpenAdduserDrawer}
          onClose={() => {
            setIsOpenAdduserDrawer(false);
          }}
        />
      )}
    </Box>
  );
};

export default UsersSidebar;
