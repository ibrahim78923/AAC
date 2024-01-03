import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { addUserDefaultValues, addUserValidationSchema } from './UsersAdd.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useState } from 'react';
const useUsersAdd = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const methods: any = useForm({
    resolver: yupResolver(addUserValidationSchema),
    defaultValues: addUserDefaultValues,
  });
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('User Add Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    closeModal();
    reset(addUserDefaultValues);
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    openModal,
    closeModal,
    isModalOpen,
  };
};
export default useUsersAdd;
