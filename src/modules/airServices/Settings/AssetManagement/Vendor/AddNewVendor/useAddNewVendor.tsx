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
  useLazyGetVendorsByIdQuery,
  usePatchNewVendorMutation,
  usePostNewVendorMutation,
} from '@/services/airServices/settings/asset-management/vendor';
import { useRouter } from 'next/router';

export const useAddNewVendor = (props: any) => {
  const router = useRouter();
  const { vendorId } = router?.query;
  const { setIsADrawerOpen } = props;
  const [postNewVendorTrigger] = usePostNewVendorMutation();
  const [patchNewVendorTrigger] = usePatchNewVendorMutation();
  const [getVendorsById] = useLazyGetVendorsByIdQuery();
  const getDefaultValues = async () => {
    try {
      const response = await getVendorsById({
        params: {
          id: vendorId,
        },
      })?.unwrap();

      return response.data;
    } catch (error) {
      return newVendorDefaultValues;
    }
  };
  const methodsNewVendor: any = useForm<any>({
    resolver: yupResolver(newVendorValidationSchema),
    defaultValues: getDefaultValues,
  });
  const getSingleVendorParameter = {
    pathParam: {
      vendorId,
    },
  };

  const { data, isLoading, isFetching } = useGetVendorsByIdQuery(
    getSingleVendorParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!vendorId,
    },
  );
  const { handleSubmit } = methodsNewVendor;
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

      enqueueSnackbar(response?.message ?? 'Vendor Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message?.[0] ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }

    setIsADrawerOpen(false);
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
      enqueueSnackbar(response?.message ?? 'NewVendor Updated Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message?.[0] ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    setIsADrawerOpen(false);
  };
  const onClose = () => {
    setIsADrawerOpen?.(false);
  };
  return {
    methodsNewVendor,
    newVendorValidationSchema,
    newVendorDefaultValues,
    handleSubmit,
    onSubmit,
    onClose,
    submitUpdateNewVendor,
    data,
    isLoading,
    isFetching,
  };
};
