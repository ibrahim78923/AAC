import React, { useState } from 'react';

import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './RolesRight.data';
import { useRouter } from 'next/router';
import { rolesAndRightsAPI } from '@/services/orgAdmin/roles-and-rights';
import { PAGINATION } from '@/config';

const useRoleAndRight: any = () => {
  const theme = useTheme<Theme>();
  const navigate = useRouter();

  const [isDraweropen, setIsDraweropen] = useState({
    isToggle: false,
    type: '',
  });
  const [selectedValue, setSelectedValue] = useState(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [checkedRows, setCheckedRows] = useState();

  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [filterValues, setFilterValues] = useState({
    search: '',
  });

  const { useGetPermissionsRolesQuery } = rolesAndRightsAPI;

  const permissionParams = {
    page: page,
    limit: pageLimit,
    organizationCompanyAccountId: '655d896c16999d346fa1b7d1',
    productId: '6541cbb46e917be584ed1a31',
    search: filterValues?.search ?? undefined,
  };

  const { data: getPermissions } =
    useGetPermissionsRolesQuery(permissionParams);

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
    setIsDraweropen({ isToggle: false, type: '' });
  };

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
  });

  return {
    handleCloseDrawer,
    setIsDraweropen,
    setIsOpenDelete,
    setCheckedRows,
    selectedValue,
    isOpenDelete,
    handleChange,
    isDraweropen,
    setExpanded,
    handleClick,
    handleClose,
    checkedRows,
    expanded,
    navigate,
    methods,
    theme,
    open,
    getPermissions,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    filterValues,
    setFilterValues,
  };
};

export default useRoleAndRight;
