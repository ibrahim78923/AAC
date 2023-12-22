import { CommonAPIS } from '@/services/common-APIs';
import useUsers from '../../useUsers';
import { enqueueSnackbar } from 'notistack';
import {
  AddAccountDefaultValues,
  AddAccountValidationSchema,
} from './AddAccount.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const useAddAccount = () => {
  const { user } = useUsers();
  const {
    useGetProductsQuery,
    useGetCompanyAccountsQuery,
    useGetCompanyAccountsRolesQuery,
  } = CommonAPIS;
  const { data: products } = useGetProductsQuery({});
  const { data: companyAccounts } = useGetCompanyAccountsQuery({
    orgId: user?.organization?._id,
  });

  const methods: any = useForm({
    resolver: yupResolver(AddAccountValidationSchema),
    defaultValues: AddAccountDefaultValues,
  });

  const { handleSubmit, reset, watch } = methods;
  const companyAccountValue = watch('company');
  const onSubmit = async () => {
    enqueueSnackbar('User Added Successfully', {
      variant: 'success',
    });
    reset();
  };

  const roleParams = {
    organizationCompanyAccountId: companyAccountValue,
  };
  const { data: companyRoles } = useGetCompanyAccountsRolesQuery(roleParams);

  return {
    products,
    companyAccounts,
    companyRoles,
    handleSubmit,
    onSubmit,
    methods,
  };
};

export default useAddAccount;
