import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertUserData,
  upsertUserDefaultValues,
  upsertUserValidationSchema,
} from './UpsertUser.data';
import { useState } from 'react';
import { usePostUserListMutation } from '@/services/airOperations/user-management/user';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import useAuth from '@/hooks/useAuth';
import { useLazyGetDepartmentDropdownQuery } from '@/services/airServices/tickets';

export const useUpsertUser = (setIsDrawerOpen: any) => {
  const auth: any = useAuth();
  const { _id: organizationId } = auth?.user?.organization;
  const departmentDropdown = useLazyGetDepartmentDropdownQuery();
  const [userData, setUserData] = useState<any[]>(upsertUserData);
  const [disabled, setDisabled] = useState(true);

  const methods: any = useForm({
    resolver: yupResolver(upsertUserValidationSchema),
    defaultValues: upsertUserDefaultValues,
  });
  const { handleSubmit, reset } = methods;

  const [addListUsers] = usePostUserListMutation();
  const submit = async (data: any) => {
    try {
      const body = {
        ...data,
        role: data?.role?._id,
        selectTeam: data?._id,
        language: data?._id,
      };

      await addListUsers({ body, organizationId }).unwrap();
      successSnackbar('Users List added successfully.');
      setIsDrawerOpen(false);
    } catch (error: any) {
      errorSnackbar();
    }
    handleClose?.();
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
    reset?.();
  };

  return {
    methods,
    handleSubmit,
    submit,
    setUserData,
    disabled,
    setDisabled,
    userData,
    departmentDropdown,
  };
};
