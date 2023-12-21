import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import {
  newVendorDefaultValues,
  newVendorValidationSchema,
} from './AddNewVendor.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  usePatchNewVendorMutation,
  usePostNewVendorMutation,
} from '@/services/airServices/settings/asset-management/vendor';
import { useRouter } from 'next/router';

export const useAddNewVendor = (props: any) => {
  const router = useRouter();
  const { NewVendorId } = router?.query;
  const { setIsADrawerOpen } = props;
  const [postNewVendorTrigger] = usePostNewVendorMutation();
  const [patchNewVendorTrigger] = usePatchNewVendorMutation();
  const methodsNewVendor: any = useForm<any>({
    resolver: yupResolver(newVendorValidationSchema),
    defaultValues: newVendorDefaultValues,
  });
  const { handleSubmit, reset } = methodsNewVendor;
  const onSubmit = async (data: any) => {
    const body = {
      ...data,
    };
    if (!!NewVendorId) {
      submitUpdateNewVendor(body);
      return;
    }

    try {
      const response = await postNewVendorTrigger({ body })?.unwrap();
      enqueueSnackbar(response?.message ?? 'Vendor Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset(newVendorDefaultValues);
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }

    setIsADrawerOpen(false);
  };

  const submitUpdateNewVendor = async (data: any) => {
    const patchNewVendorParameter = {
      body: {
        id: NewVendorId,
        ...data,
      },
    };
    try {
      const response = await patchNewVendorTrigger(
        patchNewVendorParameter,
      )?.unwrap();
      enqueueSnackbar(response?.message ?? 'NewVendor Updated Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset(newVendorDefaultValues);
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const onClose = () => {
    reset(newVendorDefaultValues);
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
  };
};
