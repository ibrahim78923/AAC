import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { rolesAndRightsAPI } from '@/services/orgAdmin/roles-and-rights';
import { PAGINATION } from '@/config';
import { getSession } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

// import dayjs from 'dayjs';

const useRolesAndRights = () => {
  const navigate = useRouter();
  const theme = useTheme();
  const { user } = getSession();
  const [isOpenAddUserDrawer, setIsOpenAddUserDrawer] = useState(false);
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [checkedRows, setCheckedRows] = useState();
  const [filterValues, setFilterValues] = useState({
    search: '',
    status: '',
    productId: '',
    // dateStart: ''
  });
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const { useGetPermissionsRolesQuery, useUpdateRoleRightsMutation } =
    rolesAndRightsAPI;

  const [updateRoleRights] = useUpdateRoleRightsMutation();

  const permissionParams = {
    page: page,
    limit: pageLimit,
    organizationId: user?.organization?._id,
    productId: filterValues?.productId,
    status: filterValues?.status,
    search: filterValues?.search,
    //commented for future use
    // dateStart: dayjs(filterValues?.dateStart)?.format('YYYY-MM-DD')
  };

  const { data: getPermissions } =
    useGetPermissionsRolesQuery(permissionParams);

  const handleClose = () => {
    setSelectedValue(null);
  };

  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };

  const resetFilters = () => {
    setFilterValues({
      search: '',
      status: '',
      productId: '',
      // dateStart: ''
    });
  };

  const updateStatus = (id: any, val: any) => {
    const status = val?.target?.checked ? 'ACTIVE' : 'INACTIVE';
    updateRoleRights({ id, body: { status: status } });
    enqueueSnackbar('User updated successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };

  return {
    setIsOpenAddUserDrawer,
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    isOpenAddUserDrawer,
    setSelectedValue,
    selectedValue,
    setCheckedRows,
    filterValues,
    setFilterValues,
    checkedRows,
    getPermissions,
    setPageLimit,
    handleClose,
    handleClick,
    resetFilters,
    updateStatus,
    navigate,
    setPage,
    theme,
  };
};

export default useRolesAndRights;
