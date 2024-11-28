import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { rolesAndRightsAPI } from '@/services/orgAdmin/roles-and-rights';
import { PAGINATION } from '@/config';
import { getSession } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

const useRolesAndRights = () => {
  const navigate = useRouter();
  const theme = useTheme();
  const { user }: any = getSession();
  const [isOpenAddUserDrawer, setIsOpenAddUserDrawer] = useState(false);
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [selectedValue, setSelectedValue] = useState(null);
  const [checkedRows, setCheckedRows] = useState();
  const [filterValues, setFilterValues] = useState<any>({
    search: '',
    status: '',
    product: {},
  });

  const [loadingState, setLoadingState] = useState<{ [key: string]: boolean }>(
    {},
  );

  const {
    useGetPermissionsRolesOrgadminQuery,
    useUpdateRoleRightsOrgadminMutation,
  } = rolesAndRightsAPI;

  const [updateRoleRights] = useUpdateRoleRightsOrgadminMutation();
  const permissionParams = {
    page: page,
    limit: pageLimit,
    organizationId: user?.organization?._id,
    productId: filterValues?.product?._id,
    status: filterValues?.status,
    search: filterValues?.search ?? undefined,
    dateStart: filterValues?.startDate
      ? dayjs(filterValues?.startDate)?.format(DATE_FORMAT?.API)
      : undefined,
    dateEnd: filterValues?.endDate
      ? dayjs(filterValues?.endDate)?.format(DATE_FORMAT?.API)
      : undefined,
  };

  const {
    data: getPermissions,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetPermissionsRolesOrgadminQuery(permissionParams, {
    skip: !user?.organization?._id,
  });

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
    });
  };

  // const updateStatus = async (id: string, val: any) => {
  //   setLoadingState((prevState) => ({ ...prevState, [id]: true }));
  //   const status = val?.target?.checked ? 'ACTIVE' : 'INACTIVE';
  //   try {
  //     await updateRoleRights({ id, body: { status: status } });
  //     enqueueSnackbar('User updated successfully', {
  //       variant: NOTISTACK_VARIANTS?.SUCCESS,
  //     });
  //   } catch (error: any) {
  //     const errMsg = error?.data?.message;
  //     const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
  //     enqueueSnackbar(errMessage ?? 'Error occurred', {
  //       variant: NOTISTACK_VARIANTS?.ERROR,
  //     });
  //   } finally {
  //     setLoadingState((prevState) => ({ ...prevState, [id]: false }));
  //   }
  // };

  const updateStatus = async (id: string, isChecked: boolean) => {
    setLoadingState((prevState) => ({ ...prevState, [id]: true }));
    const status = isChecked ? 'ACTIVE' : 'INACTIVE';
    try {
      await updateRoleRights({ id, body: { status: status } });
      enqueueSnackbar('User updated successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    } finally {
      setLoadingState((prevState) => ({ ...prevState, [id]: false }));
    }
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
    isSuccess,
    isLoading,
    isFetching,
    loadingState,
  };
};

export default useRolesAndRights;
