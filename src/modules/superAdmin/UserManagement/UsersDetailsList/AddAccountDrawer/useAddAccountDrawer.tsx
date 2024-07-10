import { CommonAPIS } from '@/services/common-APIs';
import { enqueueSnackbar } from 'notistack';
import {
  AddAccountDefaultValues,
  AddAccountValidationSchema,
} from './AddAccountDrawer.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { usePostUsersAccountMutation } from '@/services/superAdmin/user-management/UserList';
import { Dispatch, SetStateAction } from 'react';

const useAddAccountDrawer = (
  userId?: string,
  setIsopen?: Dispatch<SetStateAction<boolean>> | any,
  organizationId?: string,
) => {
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

  const { handleSubmit, reset, watch } = methods;
  const companyAccountValue = watch('company');
  const productValue = watch('product');

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
      user: userId,
      product: values?.product?._id,
      company: values?.company?._id,
      role: values?.role?._id,
    };

    try {
      await postUsersAccount({
        id: organizationId,
        body: postAccountBody,
      })?.unwrap();
      enqueueSnackbar('User Added Successfully', {
        variant: 'success',
      });
      setIsopen(false);
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
    companyRoleParams,
  };
};

export default useAddAccountDrawer;
