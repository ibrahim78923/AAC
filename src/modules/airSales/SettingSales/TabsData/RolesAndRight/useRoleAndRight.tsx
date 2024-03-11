import React, { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { PAGINATION } from '@/config';
import { airSalesRolesAndRightsAPI } from '@/services/airSales/roles-and-rights';
import { getActiveProductSession, getSession } from '@/utils';

const useRoleAndRight: any = () => {
  const { user } = getSession();
  const theme = useTheme<Theme>();
  const navigate = useRouter();
  const activeProduct = getActiveProductSession();
  const activeAccount = localStorage?.getItem('ActiveAccount');

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

  const { useGetPermissionsRolesQuery } = airSalesRolesAndRightsAPI;
  const organizationId = user?.organization?._id;
  const organizationCompanyAccountId = activeAccount;
  const productId = activeProduct?._id;

  const permissionParams = {
    page: page,
    limit: pageLimit,
    organizationCompanyAccountId: organizationCompanyAccountId,
    organizationId: organizationId,
    productId: productId,
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
