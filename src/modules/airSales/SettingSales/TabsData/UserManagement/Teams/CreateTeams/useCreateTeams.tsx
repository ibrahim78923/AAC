import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { teamsDefaultValues, teamsValidationSchema } from './CreateTeams.data';
import { CommonAPIS } from '@/services/common-APIs';
import { usePostTeamsMutation } from '@/services/airSales/settings/teams';
import { enqueueSnackbar } from 'notistack';

const useCreateTeams = () => {
  const { useGetProductsUsersQuery } = CommonAPIS;
  const { data: productsUsers } = useGetProductsUsersQuery({});
  const [postTeams] = usePostTeamsMutation();
  const methods: any = useForm({
    resolver: yupResolver(teamsValidationSchema),
    defaultValues: teamsDefaultValues,
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
