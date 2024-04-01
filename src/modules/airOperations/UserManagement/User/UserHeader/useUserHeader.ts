import { useState } from 'react';
import { useDeleteProductUsersMutation } from '@/services/airOperations/user-management/user';
import { userDropdown } from '../User.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useUserHeader = (props: any) => {
  const { selectedUserList, setSelectedUserList } = props;
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);

  const [deleteUserProducts] = useDeleteProductUsersMutation();

  const userDropdownOptions = userDropdown(setDeleteModal);

  const deleteIds = selectedUserList?.map((list: any) => list?._id);
  const submitDeleteModal = async () => {
    try {
      await deleteUserProducts({ ids: deleteIds });
      successSnackbar('Delete Successfully');
      setSelectedUserList([]);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    search,
    setSearch,
    setSelectedUserList,
    isDrawerOpen,
    setIsDrawerOpen,
    deleteModal,
    setDeleteModal,
    userDropdownOptions,
    submitDeleteModal,
    isAddDrawerOpen,
    setIsAddDrawerOpen,
  };
};
