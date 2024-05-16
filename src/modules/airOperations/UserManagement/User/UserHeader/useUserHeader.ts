import { useState } from 'react';
import {
  useDeleteProductUsersMutation,
  usePostProductUserListMutation,
} from '@/services/airOperations/user-management/user';
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

  const { handleSubmit, reset } = methods;

  const [addListUsers, addUsersListStatus] = usePostProductUserListMutation();

  const submit = async (data: any) => {
    try {
      const body = {
        ...data,
        role: data?.role?._id,
        team: data?.team?._id,
        language: data?._id,
      };
      await addListUsers({ body }).unwrap();
      successSnackbar('Users List added successfully.');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
    handleClose?.();
  };

  const handleClose = () => {
    setIsAddDrawerOpen(false);
    reset?.();
  };
  return {
    search,
    setSearch,
    setSelectedUserList,
    deleteModal,
    setDeleteModal,
    userDropdownOptions,
    submitDeleteModal,
    isAddDrawerOpen,
    setIsAddDrawerOpen,
    methods,
    handleSubmit,
    deleteStatus,
    submit,
    addUsersListStatus,
  };
};
