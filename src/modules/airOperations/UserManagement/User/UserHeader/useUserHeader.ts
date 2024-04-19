import { useState } from 'react';
import { useDeleteProductUsersMutation } from '@/services/airOperations/user-management/user';
import { userDropdown } from '../User.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  upsertUserDefaultValues,
  upsertUserValidationSchema,
} from '../UpsertUser/UpsertUser.data';

export const useUserHeader = (props: any) => {
  const { selectedUserList, setSelectedUserList } = props;
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);

  const [deleteUserProducts, deleteStatus] = useDeleteProductUsersMutation();

  const userDropdownOptions = userDropdown(setDeleteModal);

  const deleteIds = selectedUserList?.map((list: any) => list?._id);
  const submitDeleteModal = async () => {
    try {
      await deleteUserProducts({ ids: deleteIds });
      successSnackbar('Delete Successfully');
      setSelectedUserList([]);
      setDeleteModal(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const methods = useForm({
    resolver: yupResolver(upsertUserValidationSchema),
    defaultValues: upsertUserDefaultValues(null),
  });

  const { handleSubmit } = methods;

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
    methods,
    handleSubmit,
    deleteStatus,
  };
};
