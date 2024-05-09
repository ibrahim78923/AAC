import { useLazyGetOrganizationsQuery } from '@/services/dropdowns';
import { addVouchersFormFieldsDefaultValues } from './AddVouchers.data';
import { useForm } from 'react-hook-form';
import { usePostVouchersMutation } from '@/services/airLoyaltyProgram/loyalty/vouchers';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import dayjs from 'dayjs';

export const useAddVouchers = (props: any) => {
  const { addVouchersOpen, setAddVouchersOpen } = props;
  const apiQueryOrganizations = useLazyGetOrganizationsQuery();
  const methods: any = useForm({
    defaultValues: addVouchersFormFieldsDefaultValues({}),
  });
  const { handleSubmit, watch, reset } = methods;
  const [postVouchersTrigger, postVouchersStatus] = usePostVouchersMutation();
  const submitAddVouchersForm = async (data: any) => {
    const {
      name,
      description,
      voucherCode,
      assignTo,
      vouchers,
      redemptions,
      time,
      off,
      limitPercentage,
      limitAmount,
      limitVouchers,
      limitRedemptions,
      days,
      hours,
      minutes,
      seconds,
    } = data;
    const apiData = {
      name,
      description,
      voucherCode,
      assignTo: assignTo?._id,
      voucherLimitType: vouchers,
      voucherLimitValue: +limitVouchers,
      redemptionLimitType: redemptions,
      redemptionLimitValue: +limitRedemptions,
      timeLimitType: time,
      voucherTimeLimit: (() => {
        const today = dayjs(new Date());
        const result = today
          .add(days, 'day')
          .add(hours, 'hour')
          .add(minutes, 'minute')
          .add(seconds, 'second');
        return result;
      })(),
      discountType: off,
      discountValue: limitPercentage
        ? +limitPercentage
        : limitAmount
          ? +limitAmount
          : '',
    };
    const postVouchersParameter = {
      body: apiData,
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
