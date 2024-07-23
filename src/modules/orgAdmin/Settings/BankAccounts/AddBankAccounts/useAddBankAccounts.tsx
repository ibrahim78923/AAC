import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  receiversBankAccountsAPI,
  useUpdateReceiverBankAccountMutation,
} from '@/services/orgAdmin/settings/receivers-bank-acconts';
import {
  addAccountsFormDefaultValues,
  addAccountsFormValidationSchema,
} from './AddBankAccounts.data';
import { enqueueSnackbar } from 'notistack';
import { DRAWER_TYPES, NOTISTACK_VARIANTS } from '@/constants/strings';
import { CommonAPIS } from '@/services/common-APIs';
import { getSession } from '@/utils';

const useAddBankAccounts = (
  setIsOpenAddAccountDrawer: any,
  isOpenAddAccountDrawer: any,
  setCheckedRows: any,
) => {
  const selectedUser = isOpenAddAccountDrawer?.data?._id;
  const { user }: any = getSession();
  const { usePostReceiverBankAccountMutation } = receiversBankAccountsAPI;
  const { useGetCompanyAccountsQuery } = CommonAPIS;

  const { data: companyAccounts } = useGetCompanyAccountsQuery({
    orgId: user?.organization?._id,
  });

  const [postReceiverBankAccount, { isLoading: postReceiverAccountLoading }] =
    usePostReceiverBankAccountMutation();
  const [
    updateReceiverBankAccount,
    { isLoading: updateReceiverAccountLoading },
  ] = useUpdateReceiverBankAccountMutation();

  const methods: any = useForm({
    resolver: yupResolver(addAccountsFormValidationSchema),
    defaultValues:
      isOpenAddAccountDrawer?.type === 'edit'
        ? isOpenAddAccountDrawer?.data
        : addAccountsFormDefaultValues,
  });

  const { handleSubmit, reset } = methods;

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
        await updateReceiverBankAccount({ id: selectedUser, body: values });
      }
      reset();
      setIsOpenAddAccountDrawer(false);
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

    // if (isOpenAddAccountDrawer?.type === DRAWER_TYPES?.ADD) {
    //   postReceiverBankAccount({ body: values });
    // } else {
    //   delete values?.__v;
    //   delete values?.isDeleted;
    //   delete values?._id;
    //   delete values?.createdBy;
    //   delete values?.updatedBy;
    //   updateReceiverBankAccount({ id: selectedUser, body: values });
    // }
    // reset();
    // setIsOpenAddAccountDrawer(false);
    // enqueueSnackbar(
    //   isOpenAddAccountDrawer?.type === DRAWER_TYPES?.ADD
    //     ? 'Bank account added successfully'
    //     : 'Bank account edited successfully',
    //   {
    //     variant: NOTISTACK_VARIANTS?.SUCCESS,
    //   },
    // );
    // setCheckedRows([]);
  };

  return {
    updateReceiverAccountLoading,
    postReceiverAccountLoading,
    postReceiverBankAccount,
    companyAccounts,
    handleSubmit,
    onSubmit,
    methods,
    reset,
  };
};

export default useAddBankAccounts;
