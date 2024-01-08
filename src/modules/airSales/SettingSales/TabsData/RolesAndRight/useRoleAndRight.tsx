import React, { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { PAGINATION } from '@/config';
import { airSalesRolesAndRightsAPI } from '@/services/airSales/roles-and-rights';
// import { getSession } from '@/utils';

const useRoleAndRight: any = () => {
  // const { user } = getSession();
  const theme = useTheme<Theme>();
  const navigate = useRouter();

  const [expanded, setExpanded] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [checkedRows, setCheckedRows] = useState();
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [filterValues, setFilterValues] = useState({
    search: '',
  });
  const [isDraweropen, setIsDraweropen] = useState({
    isToggle: false,
    type: 'add',
    id: '',
  });

  // const [isOpenDelete, setIsOpenDelete] = useState(false);

  const { useGetPermissionsRolesQuery } = airSalesRolesAndRightsAPI;
  // const organizationId  = user?.organization 65952bbf6d2c26398e492e42
  // const organizationCompanyAccountId = user?.account?.company?._id; 6597d07959d5ddb8341e316f
  // const productId = user?.product?._id; 6584ff9b508107024e1e3b14

  const permissionParams = {
    page: page,
    limit: pageLimit,
    organizationCompanyAccountId: '6597d07959d5ddb8341e316f',
    organizationId: '65952bbf6d2c26398e492e42',
    productId: '6584ff9b508107024e1e3b14',
    search: filterValues?.search ?? undefined,
  };

  const {
    data: getPermissions,
    isLoading,
    isSuccess,
  } = useGetPermissionsRolesQuery(permissionParams);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setSelectedValue(null);
  };

  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };

  const handleCloseDrawer = () => {
    setIsDraweropen({ isToggle: false, type: '', id: '' });
  };

  return {
    handleCloseDrawer,
    setIsDraweropen,
    setFilterValues,
    setCheckedRows,
    getPermissions,
    selectedValue,
    handleChange,
    isDraweropen,
    setPageLimit,
    filterValues,
    setExpanded,
    handleClick,
    handleClose,
    checkedRows,
    pageLimit,
    isLoading,
    expanded,
    navigate,
    theme,
    open,
    page,
    setPage,
    isSuccess,
  };
};

export default useRoleAndRight;
