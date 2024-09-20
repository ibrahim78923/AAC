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
import { NoAssociationFoundImage } from '@/assets/images';
import { AddCircle } from '@mui/icons-material';
import useUsers from '../useUsers';
import { v4 as uuidv4 } from 'uuid';
import NoData from '@/components/NoData';
import useUserManagement from '@/modules/superAdmin/UserManagement/useUserManagement';
import { IMG_URL } from '@/config';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_USERS_PERMISSIONS } from '@/constants/permission-keys';
import SkeletonComponent from '@/components/CardSkeletons';
import { UsersSidebarProps } from './UserSidebar-interface';
import { indexNumbers } from '@/constants';
import { capitalizeFirstLetter } from '@/utils/api';
import { getSession } from '@/utils';

const UsersSidebar = (props: UsersSidebarProps) => {
  const { user }: any = getSession();
  const {
    setEmployeeDataById,
    setSearchAccount,
    employeeDetails,
    setSearchEmployee,
    employeeFilter,
    setEmployeeFilter,
    resetFilter,
    handleEmpListPaginationChange,
  } = props;

  const {
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    isOpenAdduserDrawer,
    setIsOpenAdduserDrawer,
    isActiveEmp,
    setIsActiveEmp,
    theme,
  } = useUsersSidebar();

  const { employeeMetaData, employeeListLoading } = useUsers();
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
        <PermissionsGuard permissions={[ORG_ADMIN_USERS_PERMISSIONS?.ADD_USER]}>
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
        </PermissionsGuard>
      </Box>
      <Divider />
      <PermissionsGuard
        permissions={[ORG_ADMIN_USERS_PERMISSIONS?.SEARCH_AND_FILTER]}
      >
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
      </PermissionsGuard>
      {employeeListLoading ? (
        <SkeletonComponent numberOfSkeletons={7} />
      ) : (
        <Box>
          {(employeeDetails === undefined ||
            employeeDetails?.length < indexNumbers?.ONE) && (
            <NoData
              image={NoAssociationFoundImage}
              message={'No data is available'}
            />
          )}
          <PermissionsGuard
            permissions={[ORG_ADMIN_USERS_PERMISSIONS?.VIEW_USERS]}
          >
            <Box sx={{ height: `calc(70vh - ${15}px)`, overflow: 'auto' }}>
              {employeeDetails?.map((item: any, index: number) => (
                <Box
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
                    setSearchAccount('');
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '5px',
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
                    <Avatar
                      sx={{
                        color: theme?.palette?.grey[600],
                        fontSize: '16px',
                        fontWeight: 500,
                      }}
                      src={item?.avatar && `${IMG_URL}${item?.avatar?.url}`}
                    >
                      {`${capitalizeFirstLetter(
                        item?.firstName?.charAt(0),
                      )}${capitalizeFirstLetter(item?.lastName?.charAt(0))}`}
                    </Avatar>
                    <Box sx={{ width: '100%' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography>
                          {`${capitalizeFirstLetter(item?.firstName)} 
                          ${capitalizeFirstLetter(item?.lastName)}`}
                        </Typography>
                        <PermissionsGuard
                          permissions={[
                            ORG_ADMIN_USERS_PERMISSIONS?.ACTIVE_INACTIVE_USERS,
                          ]}
                        >
                          <StatusBadge
                            value={item?.status}
                            disabled={item?._id === user?._id}
                            onChange={(e: any) =>
                              handleUserSwitchChange(e, item?._id)
                            }
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
                        </PermissionsGuard>
                      </Box>
                      <Typography
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: `calc(30vh - 15px)`,
                        }}
                      >
                        {item?.email}
                      </Typography>
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
          </PermissionsGuard>
        </Box>
      )}
      {isOpenFilterDrawer && (
        <FilterUser
          isOpenDrawer={isOpenFilterDrawer}
          employeeFilter={employeeFilter}
          setEmployeeFilter={setEmployeeFilter}
          setIsOpenFilterDrawer={setIsOpenFilterDrawer}
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
