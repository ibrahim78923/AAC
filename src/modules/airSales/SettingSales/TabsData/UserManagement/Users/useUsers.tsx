import { useState } from 'react';
import {
  useDeleteProductUserMutation,
  useUpdateProductsUsersMutation,
} from '@/services/airSales/settings/users';
import { enqueueSnackbar } from 'notistack';
import { PAGINATION } from '@/config';
import { getActiveProductSession } from '@/utils';
import { useGetProductsUsersQuery } from '@/services/airSales/settings/users';
import { DRAWER_TYPES } from '@/constants/strings';

const useUsers = () => {
  const ActiveProduct = getActiveProductSession();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [checkedUser, setCheckedUser] = useState<string[]>([]);
  const [isAddUserDrawer, setIsAddUserDrawer] = useState<any>({
    isToggle: false,
    type: DRAWER_TYPES?.ADD,
    recordId: [],
  });
  const [searchUser, setSearchUser] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const productUserParams = {
    page: page,
    limit: pageLimit,
    search: searchUser ? searchUser : undefined,
    product: ActiveProduct?._id,
    meta: true,
  };
  const {
    data: productsUsers,
    isLoading,
    isSuccess,
  } = useGetProductsUsersQuery(productUserParams);

  const [updateProductsUsers, { isLoading: updateUserLoading }] =
    useUpdateProductsUsersMutation();

  const [deleteProductUser, { isLoading: deleteProductUsersLoading }] =
    useDeleteProductUserMutation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateStatus = async (id: any, value: any) => {
    const statusVal = value?.target?.checked ? 'ACTIVE' : 'INACTIVE';
    try {
      await updateProductsUsers({
        id: id,
        body: { status: statusVal },
      })?.unwrap();
      enqueueSnackbar('Status updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      });
    }
  };

  const deleteHandler = async (ids: any) => {
    const deletedRecords = ids?.map((item: any) => item);
    const idsString = deletedRecords?.join(', ');

    try {
      await deleteProductUser(idsString)?.unwrap();
      setIsOpenDelete(false);
      enqueueSnackbar('Users deleted successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      });
      setIsOpenDelete(false);
    }
  };

  return {
    isOpenDelete,
    setIsOpenDelete,
    anchorEl,
    setAnchorEl,
    open,
    handleClick,
    handleClose,
    handleUpdateStatus,
    deleteHandler,
    deleteProductUsersLoading,
    updateUserLoading,
    productsUsers,
    setSearchUser,
    setPage,
    setPageLimit,
    isLoading,
    isSuccess,
    checkedUser,
    setCheckedUser,
    isAddUserDrawer,
    setIsAddUserDrawer,
  };
};

export default useUsers;
