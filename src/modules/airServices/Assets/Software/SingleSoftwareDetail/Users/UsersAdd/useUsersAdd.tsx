import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addUserData,
  addUserDefaultValues,
  addUserValidationSchema,
} from './UsersAdd.data';
import { useState } from 'react';
import {
  useAddSoftwareUsersMutation,
  useLazyGetContractDropdownListQuery,
  useLazyGetUsersDropdownListQuery,
} from '@/services/airServices/assets/software/single-software-detail/users';
import { useSearchParams } from 'next/navigation';
import { UsersAddFormDataI } from './UsersAdd.interface';
import { errorSnackbar, successSnackbar } from '@/utils/api';
const useUsersAdd = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const params = useSearchParams();
  const softwareId = params?.get('softwareId');
  const methods: any = useForm({
    resolver: yupResolver(addUserValidationSchema),
    defaultValues: addUserDefaultValues(),
  });

  const [addSoftwareUsers, { isLoading }] = useAddSoftwareUsersMutation();

  const contractDropdown = useLazyGetContractDropdownListQuery();
  const userDropdown = useLazyGetUsersDropdownListQuery();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const { handleSubmit, reset } = methods;
  const onSubmit = async (data: UsersAddFormDataI) => {
    const params = {
      softwareId: softwareId,
      contractId: data?.contract?._id,
      userRefId: data?.user?._id,
    };
    try {
      await addSoftwareUsers(params)?.unwrap();
      successSnackbar('Software Add successfully');
      reset(addUserDefaultValues);
      closeModal();
    } catch (error: any) {
      errorSnackbar(error?.error?.message);
    }
  };

  const addUserDataFormFieldsAddUser = addUserData(
    userDropdown,
    contractDropdown,
  );

  return {
    methods,
    handleSubmit,
    onSubmit,
    openModal,
    closeModal,
    isModalOpen,
    addUserDataFormFieldsAddUser,
    isLoading,
  };
};
export default useUsersAdd;
