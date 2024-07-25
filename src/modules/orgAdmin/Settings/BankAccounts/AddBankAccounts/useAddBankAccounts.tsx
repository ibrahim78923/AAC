import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  receiversBankAccountsAPI,
  useGetReceiverBankAccountsByIdQuery,
  useUpdateReceiverBankAccountMutation,
} from '@/services/orgAdmin/settings/receivers-bank-acconts';
import {
  addAccountsFormDefaultValues,
  addAccountsFormValidationSchema,
} from './AddBankAccounts.data';
import { enqueueSnackbar } from 'notistack';
import { DRAWER_TYPES, NOTISTACK_VARIANTS } from '@/constants/strings';

interface DrawerInterface {
  isToggle: boolean;
  type: string;
  recId: string;
}

const useAddBankAccounts = (
  setIsOpenAddAccountDrawer: (value: DrawerInterface) => void,
  setCheckedRows: (value: string[]) => void,
  isOpenAddAccountDrawer: DrawerInterface,
) => {
  const selectedUser = isOpenAddAccountDrawer?.recId;

  const { usePostReceiverBankAccountMutation } = receiversBankAccountsAPI;

  const { data: EditAccountData, isLoading: editAccountLoading } =
    useGetReceiverBankAccountsByIdQuery(isOpenAddAccountDrawer?.recId, {
      skip: !isOpenAddAccountDrawer?.recId,
    });

  const [postReceiverBankAccount, { isLoading: postReceiverAccountLoading }] =
    usePostReceiverBankAccountMutation();
  const [
    updateReceiverBankAccount,
    { isLoading: updateReceiverAccountLoading },
  ] = useUpdateReceiverBankAccountMutation();

  const methods = useForm({
    resolver: yupResolver(addAccountsFormValidationSchema),
    defaultValues: addAccountsFormDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (isOpenAddAccountDrawer?.type === DRAWER_TYPES?.EDIT) {
      // EditAccountData.data.companyAccountName = EditAccountData?.data?.companyAccountName?._id
      reset(EditAccountData?.data);
    }
  }, [EditAccountData?.data]);

  const onSubmit = async (values: any) => {
    try {
      if (isOpenAddAccountDrawer?.type === DRAWER_TYPES?.ADD) {
        await postReceiverBankAccount({ body: values })?.unwrap();
      } else {
        delete values?.__v;
        delete values?.isDeleted;
        delete values?._id;
        delete values?.createdBy;
        delete values?.updatedBy;
        delete values?.createdAt;
        delete values?.organizationId;
        await updateReceiverBankAccount({
          id: selectedUser,
          body: values,
        })?.unwrap();
      }
      reset();
      setIsOpenAddAccountDrawer({ ...isOpenAddAccountDrawer, isToggle: false });
      enqueueSnackbar(
        isOpenAddAccountDrawer?.type === DRAWER_TYPES?.ADD
          ? 'Bank account added successfully'
          : 'Bank account edited successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
      setCheckedRows([]);
    } catch (error: any) {
      const errMsg = error?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    updateReceiverAccountLoading,
    postReceiverAccountLoading,
    postReceiverBankAccount,
    editAccountLoading,
    handleSubmit,
    onSubmit,
    methods,
    reset,
  };
};

export default useAddBankAccounts;
