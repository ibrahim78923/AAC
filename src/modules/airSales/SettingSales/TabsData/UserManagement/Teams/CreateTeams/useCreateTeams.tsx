import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { teamsDefaultValues, teamsValidationSchema } from './CreateTeams.data';
import {
  useGetTeamsUsersQuery,
  usePostTeamsMutation,
  useUpdateTeamsMutation,
} from '@/services/airSales/settings/teams';
import { enqueueSnackbar } from 'notistack';
import useUserManagement from '../../useUserManagement';
import { useEffect } from 'react';
import { DRAWER_TYPES } from '@/constants/strings';
import { getActiveProductSession } from '@/utils';

const useCreateTeams = (
  teamDataById: any,
  setIsAddTeam: any,
  drawerType: any,
) => {
  const ActiveProduct = getActiveProductSession();
  const { productsUsers } = useUserManagement();

  const availableUsersParams = {
    teamId: teamDataById?.data?._id,
    product: ActiveProduct?._id,
  };

  const { data: getAvailableUsers } =
    useGetTeamsUsersQuery(availableUsersParams);
  const [postTeams, { isLoading: postTeamLoading }] = usePostTeamsMutation();
  const [updateTeams, { isLoading: updateTeamLoading }] =
    useUpdateTeamsMutation();

  const methods: any = useForm({
    resolver: yupResolver(teamsValidationSchema),
    defaultValues: teamsDefaultValues,
  });

  const { handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    if (drawerType === DRAWER_TYPES?.EDIT) {
      const data = teamDataById?.data;
      const fieldsToSet: any = {
        name: data?.name,
        userAccounts: data?.accounts?.map((item: any) => item?._id) ?? [],
      };

      for (const key in fieldsToSet) {
        setValue(key, fieldsToSet[key]);
      }
    }
  }, [teamDataById?.data]);

  const onSubmit = async (values: any) => {
    try {
      if (drawerType === DRAWER_TYPES?.ADD) {
        await postTeams({ body: values })?.unwrap();
        reset();
        enqueueSnackbar('Team created successfully', {
          variant: 'success',
        });
      } else {
        await updateTeams({
          id: teamDataById?.data?._id,
          body: values,
        })?.unwrap();
        enqueueSnackbar('Team updated successfully', {
          variant: 'success',
        });
      }
      setIsAddTeam({ isToggle: false });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      });
    }
  };

  const splitUsername = (username: any) => {
    const [firstName, lastName] = username?.split(' ');
    return { firstName, lastName };
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    productsUsers,
    postTeamLoading,
    updateTeamLoading,
    getAvailableUsers,
    splitUsername,
  };
};

export default useCreateTeams;
