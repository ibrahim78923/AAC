import { usePostUsersAccountMutation } from '@/services/superAdmin/user-management/UserList';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  AddAccountDefaultValues,
  AddAccountValidationSchema,
} from './AddAccountDrawer.data';
import { enqueueSnackbar } from 'notistack';
import { CommonAPIS } from '@/services/common-APIs';

const useAddAccountDrawer = (props: any) => {
  const { userId, organizationId, setIsOpen } = props;
  const [postUsersAccount] = usePostUsersAccountMutation();
  const methods: any = useForm({
    resolver: yupResolver(AddAccountValidationSchema),
    defaultValues: AddAccountDefaultValues,
  });

  const { handleSubmit, reset, watch } = methods;
  const organizationValue = watch('company');

  const onSubmit = async (values: any) => {
    values.user = userId;
    try {
      postUsersAccount({ id: organizationId, body: values });
      setIsOpen(false);
      enqueueSnackbar('User Added Successfully', {
        variant: 'success',
      });
      reset();
    } catch (error: any) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
    }
  };

  const { useGetCompanyAccountsQuery, useGetCompanyAccountsRolesQuery }: any =
    CommonAPIS;
  const { data: companyAccounts } = useGetCompanyAccountsQuery({
    orgId: organizationId,
  });
  const params = { organizationCompanyAccountId: organizationValue };
  const { data: companyRoles } = useGetCompanyAccountsRolesQuery(params);
  return {
    handleSubmit,
    onSubmit,
    methods,
    companyAccounts,
    companyRoles,
  };
};

export default useAddAccountDrawer;
