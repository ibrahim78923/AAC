import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  departmentFormValidation,
  departmentFormValues,
} from '../DepartmentsFormModal/DepartmentsFormModal.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useDepartmentsHeader = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { USER_MANAGEMENT } = AIR_SERVICES;
  const { push } = useRouter();
  const backArrowClick = () => {
    push({ pathname: USER_MANAGEMENT });
  };
  const addFormMethod = useForm({
    resolver: yupResolver(departmentFormValidation),
    defaultValues: departmentFormValues,
  });
  const { handleSubmit, reset } = addFormMethod;
  const submitAddForm = async () => {
    enqueueSnackbar('Department Added Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset();
  };
  const formProps = { addFormMethod, submitAddForm, handleSubmit };
  return {
    backArrowClick,
    openAddModal,
    setOpenAddModal,
    formProps,
  };
};
