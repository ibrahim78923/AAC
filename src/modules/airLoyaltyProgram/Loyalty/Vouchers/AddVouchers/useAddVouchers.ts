import { useLazyGetOrganizationsQuery } from '@/services/dropdowns';
import { addVouchersFormFieldsDefaultValues } from './AddVouchers.data';
import { useForm } from 'react-hook-form';
import { usePostVouchersMutation } from '@/services/airLoyaltyProgram/loyalty/vouchers';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useAddVouchers = (props: any) => {
  const { addVouchersOpen, setAddVouchersOpen } = props;
  const apiQueryOrganizations = useLazyGetOrganizationsQuery();
  const methods: any = useForm({
    defaultValues: addVouchersFormFieldsDefaultValues({}),
  });
  const { handleSubmit, watch, reset } = methods;
  const [postVouchersTrigger, postVouchersStatus] = usePostVouchersMutation();
  const submitAddVouchersForm = async (data: any) => {
    const postVouchersParameter = {
      body: data,
    };
    try {
      await postVouchersTrigger(postVouchersParameter)?.unwrap();
      successSnackbar('Voucher added  successfully!');
      setAddVouchersOpen?.(false);
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  return {
    addVouchersOpen,
    setAddVouchersOpen,
    handleSubmit,
    submitAddVouchersForm,
    methods,
    apiQueryOrganizations,
    watch,
    postVouchersStatus,
  };
};
