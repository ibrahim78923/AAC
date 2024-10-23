import { addVouchersFormFieldsDefaultValues } from './AddVouchers.data';
import { useForm } from 'react-hook-form';
import {
  useLazyGetContactsListQuery,
  usePostVouchersMutation,
} from '@/services/airLoyaltyProgram/loyalty/vouchers';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useAddVouchers = (props: any) => {
  const { addVouchersOpen, setAddVouchersOpen } = props;
  const apiQueryOrganizations = useLazyGetContactsListQuery();
  const methods: any = useForm({
    defaultValues: addVouchersFormFieldsDefaultValues({}),
  });
  const { handleSubmit, watch, reset, setValue } = methods;
  const [postVouchersTrigger, postVouchersStatus] = usePostVouchersMutation();
  const randomString = () => {
    const CHARACTERS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const LENGTH = 8;
    let result = '';
    for (let i = LENGTH; i > 0; --i)
      result += CHARACTERS[Math?.floor(Math?.random() * CHARACTERS?.length)];
    setValue('voucherCode', result);
  };
  const submitAddVouchersForm = async (data: any) => {
    const apiData = {
      name: data?.name,
      description: data?.description,
      image: data?.image,
      addAmountOperator: data?.addAmountOperator,
      addAmount: +data?.addAmount,
      percentageOff: +data?.percentageOff,
      activeFrom: data?.activeFrom,
      activeTo: data?.activeTo,
      voucherCode: data?.voucherCode,
      appliedTo: data?.appliedTo?._id,
      voucherLimitType: data?.voucherType,
      voucherLimitValue: +data?.limitVouchers,
      redemptionLimitType: data?.redeemType,
      redemptionLimitValue: +data?.limitRedemptions,
    };
    const postVouchersParameter = {
      body: apiData,
    };
    try {
      await postVouchersTrigger(postVouchersParameter)?.unwrap();
      successSnackbar('Voucher added  successfully!');
      setAddVouchersOpen?.({});
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const activeFromValue = watch('activeFrom');
  return {
    addVouchersOpen,
    setAddVouchersOpen,
    handleSubmit,
    submitAddVouchersForm,
    methods,
    apiQueryOrganizations,
    watch,
    postVouchersStatus,
    randomString,
    activeFromValue,
  };
};
