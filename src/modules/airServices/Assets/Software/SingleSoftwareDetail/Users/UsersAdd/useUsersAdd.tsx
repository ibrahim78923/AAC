import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import {
  addUserData,
  addUserDefaultValues,
  addUserValidationSchema,
} from './UsersAdd.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useState } from 'react';
import {
  useAddSoftwareUsersMutation,
  useLazyGetContractDropdownListQuery,
  useLazyGetUsersDropdownListQuery,
} from '@/services/airServices/assets/software/single-software-detail/users';
import { useSearchParams } from 'next/navigation';
const useUsersAdd = () => {
  const [isModalOpen, setModalOpen] = useState(false);
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
  const onSubmit = async (data: any) => {
    const params = {
      softwareId: softwareId,
      contractId: data?.contract?._id,
      userRefId: data?.user?._id,
    };
    try {
      const res = await addSoftwareUsers(params)?.unwrap();
      enqueueSnackbar(res?.message ?? 'Software Add successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset(addUserDefaultValues);
      closeModal();
    } catch (error: any) {
      enqueueSnackbar(error?.error?.message ?? 'User Not Added', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
    contractDropdown,
    userDropdown,
    addUserDataFormFieldsAddUser,
    isLoading,
  };
};
export default useUsersAdd;
