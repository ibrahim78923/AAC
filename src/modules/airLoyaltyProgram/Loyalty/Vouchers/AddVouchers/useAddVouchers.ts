import {
  addVouchersFormFieldsDefaultValues,
  vouchersValidationSchema,
} from './AddVouchers.data';
import {
  useGetSingleVouchersQuery,
  useLazyVouchersTiersDropdownListQuery,
  usePostVouchersMutation,
  useEditVoucherMutation,
} from '@/services/airLoyaltyProgram/loyalty/vouchers';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useEffect } from 'react';
import { generateRadomString } from '@/utils/api';
import { ARRAY_INDEX, VOUCHERS_CONSTANTS } from '@/constants/strings';
import { useFormLib } from '@/hooks/useFormLib';

export const useAddVouchers = (props: any) => {
  const { addVouchersOpen, setAddVouchersOpen } = props;
  const apiQueryVoucherTiers = useLazyVouchersTiersDropdownListQuery();
  const [postVouchersTrigger, postVouchersStatus] = usePostVouchersMutation();
  const [editVouchersTrigger, editVouchersStatus] = useEditVoucherMutation();
  const getByIdParams = {
    voucherCode: addVouchersOpen?.voucherCode,
  };
  const {
    data: getVoucherById,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetSingleVouchersQuery(getByIdParams, {
    skip: !addVouchersOpen?.voucherCode && addVouchersOpen?.upsert,
    refetchOnMountOrArgChange: true,
  });
  const { methods, handleSubmit, watch, reset, setValue, clearErrors } =
    useFormLib({
      defaultValues: addVouchersFormFieldsDefaultValues(
        getVoucherById?.data?.[ARRAY_INDEX?.ZERO],
      ),
      validationSchema: vouchersValidationSchema,
    });
  useEffect(() => {
    reset(
      addVouchersFormFieldsDefaultValues(
        getVoucherById?.data?.[ARRAY_INDEX?.ZERO],
      ),
    );
  }, [addVouchersOpen?.voucherCode, getVoucherById, reset]);

  const randomString = () => {
    setValue('voucherCode', generateRadomString());
    clearErrors('voucherCode');
  };
  const handleUpsertVoucher = async (postParams: any) => {
    try {
      await postVouchersTrigger(postParams)?.unwrap();
      successSnackbar('Voucher added  successfully!');
      setAddVouchersOpen?.({});
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const handleEditVoucher = async (editParams: any) => {
    try {
      await editVouchersTrigger(editParams)?.unwrap();
      successSnackbar('Voucher Edited Successfully!');
      setAddVouchersOpen?.({});
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const submitAddVouchersForm = (data: any) => {
    const vouchersFormData = new FormData();
    Object?.keys(data)?.forEach((key) => {
      if (data[key] instanceof Date) {
        vouchersFormData?.append(key, data[key]?.toISOString());
      } else if (key === VOUCHERS_CONSTANTS?.FILE_URL) {
        vouchersFormData?.append(
          key,
          data[key] instanceof File
            ? data[key]
            : new File([data[key]], data[key]?.url),
        );
      } else {
        vouchersFormData?.append(key, data[key]?._id ?? data[key]);
      }
    });
    const postVouchersParameter = {
      body: vouchersFormData,
    };
    if (addVouchersOpen?.voucherCode) {
      handleEditVoucher(vouchersFormData);
    } else {
      handleUpsertVoucher(postVouchersParameter);
    }
  };
  const activeFromValue = watch('activeFrom');
  return {
    addVouchersOpen,
    setAddVouchersOpen,
    handleSubmit,
    submitAddVouchersForm,
    methods,
    apiQueryVoucherTiers,
    watch,
    postVouchersStatus,
    randomString,
    activeFromValue,
    isLoading,
    editVouchersStatus,
    isFetching,
    isError,
    refetch,
  };
};
