import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertTeamDefaultValues,
  upsertTeamValidationSchema,
} from './UpsertTeams.data';
import { useEffect, useState } from 'react';
import {
  useLazyGetProductTeamUserListDropdownQuery,
  usePatchTeamUsersMutation,
  usePostCreateTeamMutation,
} from '@/services/airOperations/user-management/user';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
export const useUpsertTeams = (setIsDrawerOpen: any, teamData: any) => {
  const router = useRouter();
  const { _id } = router?.query;
  const [disabled, setDisabled] = useState(true);
  const methods: any = useForm({
    resolver: yupResolver(upsertTeamValidationSchema),
    defaultValues: upsertTeamDefaultValues(teamData),
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(upsertTeamDefaultValues(teamData));
  }, [teamData, reset]);

  const usersTeamDropdown = useLazyGetProductTeamUserListDropdownQuery();

  const [patchTeamsUsersTrigger, patchProductTeamStatus] =
    usePatchTeamUsersMutation();

  const [addTeamUsers, addUsersTeamListStatus] = usePostCreateTeamMutation();
  const submit = async (data: any) => {
    const { userAccounts, ...rest } = data;
    try {
      const body = {
        ...rest,
        userAccounts: userAccounts?.map((item: any) => item?._id),
      };
      if (!!_id) {
        editTeamUsersDetails?.(body);
        return;
      }
      await addTeamUsers({ body }).unwrap();
      successSnackbar('Team added successfully.');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error);
    }
  };
  const handleClose = () => {
    setIsDrawerOpen({ val: false });
    reset?.();
  };

  const editTeamUsersDetails = async (data: any) => {
    const formData = {
      id: _id,
      ...data,
    };
    try {
      await patchTeamsUsersTrigger(formData)?.unwrap();
      successSnackbar('Products Users Edit  Successfully');
      setIsDrawerOpen(false);
    } catch (error: any) {
      errorSnackbar('error');
    }
    handleClose?.();
  };

  return {
    methods,
    handleSubmit,
    submit,
    disabled,
    setDisabled,
    usersTeamDropdown,
    patchProductTeamStatus,
    addUsersTeamListStatus,
    editTeamUsersDetails,
  };
};
