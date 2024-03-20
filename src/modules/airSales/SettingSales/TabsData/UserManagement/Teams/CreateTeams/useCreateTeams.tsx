import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { teamsDefaultValues, teamsValidationSchema } from './CreateTeams.data';
import {
  usePostTeamsMutation,
  useUpdateTeamsMutation,
} from '@/services/airSales/settings/teams';
import { enqueueSnackbar } from 'notistack';
import useUserManagement from '../../useUserManagement';
import { useEffect } from 'react';

const useCreateTeams = (
  teamDataById: any,
  setIsAddTeam: any,
  drawerType: any,
) => {
  const { productsUsers } = useUserManagement();
  const [postTeams, { isLoading: postTeamLoading }] = usePostTeamsMutation();
  const [updateTeams, { isLoading: updateTeamLoading }] =
    useUpdateTeamsMutation();

  const methods: any = useForm({
    resolver: yupResolver(teamsValidationSchema),
    defaultValues: teamsDefaultValues,
  });

  const { handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    if (drawerType === 'edit') {
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
      if (drawerType === 'add') {
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

  return {
    methods,
    handleSubmit,
    onSubmit,
    productsUsers,
    postTeamLoading,
    updateTeamLoading,
  };
};

export default useCreateTeams;
