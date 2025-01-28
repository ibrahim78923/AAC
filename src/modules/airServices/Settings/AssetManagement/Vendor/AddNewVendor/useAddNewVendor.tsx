import {
  newVendorDefaultValues,
  newVendorValidationSchema,
} from './AddNewVendor.data';
import {
  useGetVendorsByIdQuery,
  usePatchNewVendorMutation,
  usePostNewVendorMutation,
} from '@/services/airServices/settings/asset-management/vendor';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { filteredEmptyValues } from '@/utils/api';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { DYNAMIC_FIELDS } from '@/utils/dynamic-forms';
import { IVendorProps } from '../Vendor.interface';
import { useFormLib } from '@/hooks/useFormLib';
import { useDynamicForm } from '@/components/DynamicForm/useDynamicForm';

export const useAddNewVendor = (props: IVendorProps) => {
  const router = useRouter();
  const { vendorId } = router?.query;
  const { setIsADrawerOpen } = props;

  const [postNewVendorTrigger, postNewVendorStatus] =
    usePostNewVendorMutation();
  const [patchNewVendorTrigger, patchNewVendorStatus] =
    usePatchNewVendorMutation();

  const dynamicFormProps = {
    productType: DYNAMIC_FIELDS?.PT_SERVICES,
    moduleType: DYNAMIC_FIELDS?.MT_VENDOR,
  };

  const {
    form,
    handleUploadAttachments,
    isDynamicFormLoading,
    hasDynamicFormError,
    attachmentsApiCallInProgress,
    getDynamicFormData,
  } = useDynamicForm(dynamicFormProps);

  useEffect(() => {
    getDynamicFormData();
  }, []);

  const {
    data: vinData,
    isLoading,
    isFetching,
    isError,
    isUninitialized,
    refetch,
  } = useGetVendorsByIdQuery(
    {
      params: {
        id: vendorId,
      },
    },
    {
      skip: !!!vendorId,
      refetchOnMountOrArgChange: true,
    },
  );

  const { methods, reset, handleSubmit } = useFormLib({
    validationSchema: newVendorValidationSchema?.(form),
    defaultValues: newVendorDefaultValues?.(),
  });

  useEffect(() => {
    reset(() => newVendorDefaultValues(vinData?.data, form));
  }, [vinData, reset, form]);

  const onSubmit = async (data: any) => {
    const filteredEmptyData = filteredEmptyValues(data);

    try {
      const { body }: any = await handleUploadAttachments?.(
        data,
        filteredEmptyData,
      );
      if (!!vendorId) {
        submitUpdateNewVendor(body);
        return;
      }

      await postNewVendorTrigger({ body })?.unwrap();
      successSnackbar('Vendor Added Successfully');
      handleClose?.();
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  const submitUpdateNewVendor = async (data: any) => {
    const patchNewVendorParameter = {
      body: {
        id: vendorId,
        ...data,
      },
    };
    try {
      await patchNewVendorTrigger(patchNewVendorParameter)?.unwrap();
      successSnackbar('Vendor Updated Successfully!');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    setIsADrawerOpen?.(false);
    reset?.();
  };

  const apiCallInProgress =
    patchNewVendorStatus?.isLoading ||
    postNewVendorStatus?.isLoading ||
    attachmentsApiCallInProgress;

  const showLoader = isLoading || isFetching || isDynamicFormLoading;
  const hasError = isError || hasDynamicFormError;

  const refreshApi = () => {
    if (!isUninitialized) {
      refetch?.();
    }
    getDynamicFormData?.();
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    handleClose,
    form,
    apiCallInProgress,
    refreshApi,
    hasError,
    showLoader,
  };
};
