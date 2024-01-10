import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import {
  newVendorDefaultValues,
  newVendorValidationSchema,
} from './AddNewVendor.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useGetVendorsByIdQuery,
  usePatchNewVendorMutation,
  usePostNewVendorMutation,
} from '@/services/airServices/settings/asset-management/vendor';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAddNewVendor = (props: any) => {
  const router = useRouter();
  const { vendorId } = router?.query;
  const { setIsADrawerOpen } = props;
  const [postNewVendorTrigger] = usePostNewVendorMutation();
  const [patchNewVendorTrigger] = usePatchNewVendorMutation();
  const { data: vinData, isLoading } = useGetVendorsByIdQuery({
    params: {
      id: vendorId,
    },
  });

  const methodsNewVendor: any = useForm<any>({
    resolver: yupResolver(newVendorValidationSchema),
    defaultValues: newVendorDefaultValues,
  });

  const { handleSubmit, reset } = methodsNewVendor;
  useEffect(() => {
    reset(() => vinData?.data);
  }, [vinData]);
  const onSubmit = async (data: any) => {
    const body = {
      ...data,
    };
    if (!!vendorId) {
      submitUpdateNewVendor(body);
      return;
    }

    try {
      const response = await postNewVendorTrigger({ body })?.unwrap();

      enqueueSnackbar(response?.data?.message ?? 'Vendor Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset(newVendorDefaultValues);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message?.[0] ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }

    setIsADrawerOpen(false);
    reset?.();
  };

  const submitUpdateNewVendor = async (data: any) => {
    const updateData: any = {};
    for (const key in newVendorDefaultValues) {
      if (data?.[key] !== undefined) {
        updateData[key] = data?.[key];
      }
    }
    const patchNewVendorParameter = {
      body: {
        id: vendorId,
        ...updateData,
      },
    };
    try {
      const response = await patchNewVendorTrigger(
        patchNewVendorParameter,
      )?.unwrap();
      enqueueSnackbar(
        response?.data?.message ?? 'Vendor Updated Successfully!',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message?.[0] ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    setIsADrawerOpen(false);
  };

  return {
    methodsNewVendor,
    newVendorValidationSchema,
    newVendorDefaultValues,
    handleSubmit,
    onSubmit,
    submitUpdateNewVendor,
    isLoading,
  };
};
