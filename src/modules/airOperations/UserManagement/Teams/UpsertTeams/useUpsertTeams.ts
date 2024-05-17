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
  const { teamId } = router?.query;
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
    const formData = {
      id: teamId,
      body: {
        ...rest,
        userAccounts: userAccounts?.map((item: any) => item?._id),
      },
    };
    if (!!teamId) {
      try {
        await patchTeamsUsersTrigger(formData)?.unwrap();
        successSnackbar('Products Users Edit  Successfully');
        handleClose?.();
      } catch (error: any) {
        errorSnackbar('error');
      }
      handleClose?.();
    } else {
      try {
        const body = {
          ...rest,
          userAccounts: userAccounts?.map((item: any) => item?._id),
        };
        await addTeamUsers({ body }).unwrap();
        successSnackbar('Team added successfully.');
        setIsDrawerOpen(false);
        reset?.();
      } catch (error: any) {
        errorSnackbar(error?.data?.message);
      }
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
    disabled,
    setDisabled,
    usersTeamDropdown,
    patchProductTeamStatus,
    addUsersTeamListStatus,
  };
};
