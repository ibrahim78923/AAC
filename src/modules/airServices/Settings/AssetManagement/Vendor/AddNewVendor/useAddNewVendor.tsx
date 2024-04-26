import { useForm } from 'react-hook-form';
import {
  newVendorDefaultValues,
  newVendorValidationSchema,
} from './AddNewVendor.data';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetVendorsByIdQuery,
  usePatchNewVendorMutation,
  usePostNewVendorMutation,
} from '@/services/airServices/settings/asset-management/vendor';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useAddNewVendor = (props: any) => {
  const router = useRouter();
  const { vendorId } = router?.query;
  const { setIsADrawerOpen } = props;
  const [postNewVendorTrigger, postNewVendorStatus] =
    usePostNewVendorMutation();
  const [patchNewVendorTrigger, patchNewVendorStatus] =
    usePatchNewVendorMutation();

  const { data: vinData, isLoading } = useGetVendorsByIdQuery(
    {
      params: {
        id: vendorId,
      },
    },
    {
      skip: !!!vendorId,
    },
  );

  const methodsNewVendor: any = useForm<any>({
    resolver: yupResolver(newVendorValidationSchema),
    defaultValues: newVendorDefaultValues?.(),
  });

  const { handleSubmit, reset } = methodsNewVendor;

  useEffect(() => {
    reset(() => newVendorDefaultValues(vinData?.data));
  }, [vinData, reset]);

  const onSubmit = async (data: any) => {
    const filteredEmptyData: any = Object?.entries(data || {})
      ?.filter(
        ([, value]: any) => value !== undefined && value != '' && value != null,
      )
      ?.reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: value }), {});

    const body = filteredEmptyData;

    if (!!vendorId) {
      submitUpdateNewVendor(body);
      return;
    }

    try {
      await postNewVendorTrigger({ body })?.unwrap();
      successSnackbar('Vendor Added Successfully');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
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

  return {
    methodsNewVendor,
    newVendorValidationSchema,
    newVendorDefaultValues,
    handleSubmit,
    onSubmit,
    submitUpdateNewVendor,
    isLoading,
    handleClose,
    patchNewVendorStatus,
    postNewVendorStatus,
  };
};
