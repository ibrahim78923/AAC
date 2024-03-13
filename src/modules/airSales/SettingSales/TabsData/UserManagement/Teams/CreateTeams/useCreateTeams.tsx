import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { teamsValidationSchema } from './CreateTeams.data';
import { usePostTeamsMutation } from '@/services/airSales/settings/teams';
import { enqueueSnackbar } from 'notistack';
import useUserManagement from '../../useUserManagement';

const useCreateTeams = (editData: any, setIsAddTeam: any) => {
  const { productsUsers } = useUserManagement();
  const [postTeams] = usePostTeamsMutation();
  const methods: any = useForm({
    resolver: yupResolver(teamsValidationSchema),
    defaultValues: {
      name: editData?.name,
    },
  });

  const { handleSubmit, reset } = methods;
  const onSubmit = async (values: any) => {
    values.userAccounts = [values.userAccounts];
    try {
      await postTeams({ body: values })?.unwrap();
      reset();
      enqueueSnackbar('Team created successfully', {
        variant: 'success',
      });
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
  };
};

export default useCreateTeams;
