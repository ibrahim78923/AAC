import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { rolesAndRightsAPI } from '@/services/orgAdmin/roles-and-rights';
import { PAGINATION } from '@/config';
// import dayjs from 'dayjs';

const useRolesAndRights = () => {
  const navigate = useRouter();
  const theme = useTheme();

  const [isOpenAddUserDrawer, setIsOpenAddUserDrawer] = useState(false);
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [checkedRows, setCheckedRows] = useState();
  const [filterValues, setFilterValues] = useState({
    search: '',
    status: '',
    productId: '',
    // dateStart: null
  });
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const { useGetPermissionsRolesQuery } = rolesAndRightsAPI;

  const permissionParams = {
    page: page,
    limit: pageLimit,
    organizationCompanyAccountId: '56cb91bdc3464f14678934ca',
    search: filterValues?.search,
    productId: filterValues?.productId,
    status: filterValues?.status,
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
    handleClose,
    handleClick,
    navigate,
    theme,
    setPageLimit,
    setPage,
  };
};

export default useRolesAndRights;
