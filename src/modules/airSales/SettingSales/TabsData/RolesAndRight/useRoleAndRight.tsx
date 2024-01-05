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
    type: '',
    id: '',
  });

  // const [isOpenDelete, setIsOpenDelete] = useState(false);

  const { useGetPermissionsRolesQuery } = airSalesRolesAndRightsAPI;
  // org id  =  65952bbf6d2c26398e492e42
  // const comapnyAccountid = user?.account?.company?._id;
  // 65952ce22676367b22c905ae
  // const currentProductId = user?.product?._id;
  //6553145fe330587844cbc672

  const permissionParams = {
    page: page,
    limit: pageLimit,
    organizationCompanyAccountId: '65952ce22676367b22c905ae',
    productId: '6553145fe330587844cbc672',
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
    setCheckedRows,
    selectedValue,
    handleChange,
    isDraweropen,
    setExpanded,
    handleClick,
    handleClose,
    checkedRows,
    expanded,
    navigate,
    theme,
    open,
    getPermissions,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    filterValues,
    setFilterValues,
    isLoading,
    isSuccess,
  };
};

export default useRoleAndRight;
