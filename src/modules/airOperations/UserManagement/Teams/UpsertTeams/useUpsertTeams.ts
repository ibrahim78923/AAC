import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertTeamData,
  upsertTeamDefaultValues,
  upsertTeamValidationSchema,
} from './UpsertTeams.data';
import { useState } from 'react';
import {
  useLazyGetProductUserListDropdownQuery,
  usePostCreateTeamMutation,
} from '@/services/airOperations/user-management/user';
import { errorSnackbar, successSnackbar } from '@/utils/api';
export const useUpsertTeams = (setIsDrawerOpen: any) => {
  const [teamData, setTeamData] = useState<any[]>(upsertTeamData);
  const [disabled, setDisabled] = useState(true);

  const methods: any = useForm({
    resolver: yupResolver(upsertTeamValidationSchema),
    defaultValues: upsertTeamDefaultValues,
  });
  const { handleSubmit, reset } = methods;
  const usersTeamDropdown = useLazyGetProductUserListDropdownQuery();

  const [addTeamUsers] = usePostCreateTeamMutation();
  const submit = async (data: any) => {
    const { userAccounts, ...rest } = data;
    try {
      const body = {
        ...rest,
        userAccounts: userAccounts?.map((item: any) => item?.user?._id),
      };
      await addTeamUsers({ body }).unwrap();
      successSnackbar('Team added successfully.');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const handleClose = () => {
    setIsDrawerOpen({ val: false });
    reset?.();
  };

  return {
    methods,
    handleSubmit,
    submit,
    setTeamData,
    disabled,
    setDisabled,
    teamData,
    usersTeamDropdown,
  };
};
