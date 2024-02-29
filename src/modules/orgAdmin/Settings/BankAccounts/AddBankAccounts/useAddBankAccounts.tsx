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
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useAddBankAccounts = (
  setIsOpenAddAccountDrawer: any,
  isOpenAddAccountDrawer: any,
  setCheckedRows: any,
) => {
  const selectedUser = isOpenAddAccountDrawer?.data?._id;

  const { usePostReceiverBankAccountMutation } = receiversBankAccountsAPI;

  const [postReceiverBankAccount]: any = usePostReceiverBankAccountMutation();
  const [updateReceiverBankAccount]: any =
    useUpdateReceiverBankAccountMutation();

  const methods: any = useForm({
    resolver: yupResolver(addAccountsFormValidationSchema),
    defaultValues:
      isOpenAddAccountDrawer?.type === 'edit'
        ? isOpenAddAccountDrawer?.data
        : addAccountsFormDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (values: any) => {
    if (isOpenAddAccountDrawer?.type === 'add') {
      postReceiverBankAccount({ body: values });
    } else {
      delete values?.__v;
      delete values?.isDeleted;
      delete values?._id;
      delete values?.createdBy;
      delete values?.updatedBy;
      updateReceiverBankAccount({ id: selectedUser, body: values });
    }
    reset();
    setIsOpenAddAccountDrawer(false);
    enqueueSnackbar(
      isOpenAddAccountDrawer?.type === 'add'
        ? 'Account added successfully'
        : 'Account edited successfully',
      {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      },
    );
    setCheckedRows([]);
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    postReceiverBankAccount,
    reset,
  };
};

export default useAddBankAccounts;
