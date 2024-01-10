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
import { usePostDepartmentMutation } from '@/services/airServices/settings/user-management/departments';
import { useLazyGetOrganizationsQuery } from '@/services/dropdowns';

export const useDepartmentsHeader = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { USER_MANAGEMENT } = AIR_SERVICES;
  const { push } = useRouter();
  const backArrowClick = () => {
    push({ pathname: USER_MANAGEMENT });
  };
  const usersList = useLazyGetOrganizationsQuery();

  const [postDepartment] = usePostDepartmentMutation();
  const addFormMethod = useForm({
    resolver: yupResolver(departmentFormValidation),
    defaultValues: departmentFormValues,
  });
  const { handleSubmit, reset } = addFormMethod;
  const submitAddForm = async (formData: any) => {
    const modifyData = {
      ...formData,
      departmentHeadId: formData?.departmentHeadId?._id,
      members: formData?.members?.map((value: any) => value?._id),
    };
    try {
      const response: any = await postDepartment({
        body: modifyData,
      });
      enqueueSnackbar(
        response?.data?.message && 'Department Added Successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
      reset();
      setOpenAddModal(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.error ?? 'An error', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const formProps = { addFormMethod, submitAddForm, handleSubmit };
  return {
    backArrowClick,
    openAddModal,
    setOpenAddModal,
    formProps,
    usersList,
  };
};
