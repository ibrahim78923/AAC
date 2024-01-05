import Image from 'next/image';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Pagination,
  Tooltip,
  Typography,
} from '@mui/material';

import FilterUser from '../Drawers/FilterUser';

import { FilterSharedIcon, RefreshTasksIcon } from '@/assets/icons';

import Search from '@/components/Search';

import StatusBadge from '@/components/StatusBadge';

import AddUser from '../Drawers/AddUser';

import useUsersSidebar from './useUsersSidebar';

import { AvatarImage, NoAssociationFoundImage } from '@/assets/images';

import { AddCircle } from '@mui/icons-material';
import useUsers from '../useUsers';
import { v4 as uuidv4 } from 'uuid';
import NoData from '@/components/NoData';
import useUserManagement from '@/modules/superAdmin/UserManagement/useUserManagement';

const UsersSidebar = (props: any) => {
  const { setEmployeeDataById } = props;
  const {
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    isOpenAdduserDrawer,
    setIsOpenAdduserDrawer,
    isActiveEmp,
    setIsActiveEmp,
    theme,
  } = useUsersSidebar();

  const {
    employeeDetails,
    setSearchEmployee,
    employeeFilter,
    setEmployeeFilter,
    resetFilter,
    employeeMetaData,
    handleEmpListPaginationChange,
  } = useUsers();

  const { handleUserSwitchChange } = useUserManagement();

  return (
    <Box
      sx={{
        padding: '24px 16px',
        borderRadius: '8px 0px 0px 8px',
        background: theme?.palette?.common?.white,
        minHeight: `calc(89vh - ${15}px)`,
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
          variant="outlined"
          sx={{ background: theme?.palette?.primary?.light }}
          className="small"
          startIcon={
            <AddCircle sx={{ color: theme?.palette?.primary?.main }} />
          }
          onClick={() => {
            setIsOpenAdduserDrawer(true);
          }}
        >
          Add User
        </Button>
      </Box>
      <Divider />
      <Box
        py={1}
        sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}
      >
        <Search
          placeholder="Search by Name"
          size="small"
          onChange={(val: any) => setSearchEmployee(val?.target?.value)}
        />
        <Tooltip title={'Refresh Filter'}>
          <Button
            variant="outlined"
            color="inherit"
            className="small"
            onClick={resetFilter}
          >
            <RefreshTasksIcon />
          </Button>
        </Tooltip>
        <Button
          variant="outlined"
          color="inherit"
          className="small"
          onClick={() => {
            setIsOpenFilterDrawer(true);
          }}
        >
          <FilterSharedIcon />
        </Button>
      </Box>
      {employeeDetails === undefined && (
        <NoData
          image={NoAssociationFoundImage}
          message={'No data is available'}
        />
      )}
      <Box sx={{ height: `calc(70vh - ${15}px)`, overflow: 'auto' }}>
        {employeeDetails?.map((item: any, index: number) => (
          <Box
            className="users-wrapper"
            sx={{
              my: 2,
              backgroundColor:
                isActiveEmp === index ? theme?.palette?.grey[400] : '',
              borderRadius: '4px',
              padding: '11px 8px',
              width: '100%',
            }}
            key={uuidv4()}
            onClick={() => {
              setEmployeeDataById(item?._id);
              setIsActiveEmp(index);
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                cursor: 'pointer',
                flexWrap: {
                  xs: 'wrap',
                  sm: 'nowrap',
                  lg: 'wrap',
                  xl: 'nowrap',
                },
              }}
            >
              <Avatar>
                <Image src={AvatarImage} alt="Avatar" width={40} height={40} />
              </Avatar>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>
                    {item?.firstName} {item?.lastName}
                  </Typography>
                  <StatusBadge
                    value={item?.status}
                    onChange={(e: any) => handleUserSwitchChange(e, item?._id)}
                    options={[
                      {
                        label: 'Active',
                        value: 'ACTIVE',
                        color: theme?.palette?.success?.main,
                      },
                      {
                        label: 'Inactive',
                        value: 'INACTIVE',
                        color: theme?.palette?.error?.main,
                      },
                    ]}
                  />
                </Box>
                <Typography>{item?.email}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Pagination
        count={employeeMetaData?.pages}
        variant="outlined"
        shape="rounded"
        onChange={handleEmpListPaginationChange}
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      />
      {isOpenFilterDrawer && (
        <FilterUser
          isOpenDrawer={isOpenFilterDrawer}
          employeeFilter={employeeFilter}
          setEmployeeFilter={setEmployeeFilter}
          onClose={() => {
            setIsOpenFilterDrawer(false);
          }}
        />
      )}

      {isOpenAdduserDrawer && (
        <AddUser
          isOpenDrawer={isOpenAdduserDrawer}
          setIsOpenAdduserDrawer={setIsOpenAdduserDrawer}
          onClose={() => {
            setIsOpenAdduserDrawer(false);
          }}
        />
      )}
    </Box>
  );
};

export default UsersSidebar;
