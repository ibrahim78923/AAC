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
import { useEffect } from 'react';

const useAddAccount = (
  employeeDataById?: any,
  setIsOpenAddAccountDrawer?: any,
) => {
  const { user } = useUsers();
  const [postUsersAccount] = usePostUsersAccountMutation();
  const {
    useLazyGetCompanyAccountsListsQuery,
    useLazyGetCompanyAccountsRolesListQuery,
  } = CommonAPIS;
  const companyAccounts = useLazyGetCompanyAccountsListsQuery();

  const methods: any = useForm({
    resolver: yupResolver(AddAccountValidationSchema),
    defaultValues: AddAccountDefaultValues,
  });

  const { handleSubmit, reset, watch, setValue } = methods;
  const companyAccountValue = watch('company');
  const productValue = watch('product');

  useEffect(() => {
    setValue('role', null);
  }, [productValue, companyAccountValue]);

  let companyRoleParams = {};

  if (companyAccountValue && productValue) {
    companyRoleParams = {
      organizationCompanyAccountId: companyAccountValue._id,
      productId: productValue._id,
    };
  }
  const companyRoles = useLazyGetCompanyAccountsRolesListQuery();

  const onSubmit = async (values: any) => {
    const postAccountBody = {
      ...values,
      user: employeeDataById,
      product: values?.product?._id,
      company: values?.company?._id,
      role: values?.role?._id,
    };

    try {
      await postUsersAccount({
        id: user?.organization?._id,
        body: postAccountBody,
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
    user,
    companyAccounts,
    companyRoles,
    handleSubmit,
    onSubmit,
    methods,
    companyRoleParams,
  };
};

export default useAddAccount;
