import { CommonAPIS } from '@/services/common-APIs';
import useUsers from '../../useUsers';
import { enqueueSnackbar } from 'notistack';
import {
  AddAccountDefaultValues,
  AddAccountValidationSchema,
} from './AddAccount.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { usePostUsersAccountMutation } from '@/services/superAdmin/user-management/UserList';
import { useEffect, useState } from 'react';

const useAddAccount = (
  employeeDataById?: any,
  setIsOpenAddAccountDrawer?: any,
) => {
  const { user } = useUsers();
  const [companyVal, setCompanyVal] = useState('');
  const [postUsersAccount] = usePostUsersAccountMutation();
  const { useGetCompanyAccountsQuery, useGetCompanyAccountsRolesQuery } =
    CommonAPIS;
  const { data: companyAccounts } = useGetCompanyAccountsQuery({
    orgId: user?.organization?._id,
  });

  const methods: any = useForm({
    resolver: yupResolver(AddAccountValidationSchema),
    defaultValues: AddAccountDefaultValues,
  });

  const { handleSubmit, reset, watch } = methods;
  const companyAccountValue = watch('company');

  useEffect(() => {
    setCompanyVal(companyAccountValue);
  }, [companyAccountValue]);

  if (companyVal !== companyAccountValue) {
    methods.setValue('role', '');
  }

  const roleParams = {
    organizationCompanyAccountId: companyAccountValue,
  };
  const { data: companyRoles } = useGetCompanyAccountsRolesQuery(roleParams);

  const onSubmit = async (values: any) => {
    values.user = employeeDataById;
    try {
      await postUsersAccount({
        id: user?.organization?._id,
        body: values,
      })?.unwrap();
      enqueueSnackbar('User Added Successfully', {
        variant: 'success',
      });
      setIsOpenAddAccountDrawer(false);
      reset();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      });
    }
  };

  return {
    companyAccounts,
    companyRoles,
    handleSubmit,
    onSubmit,
    methods,
  };
};

export default useAddAccount;
