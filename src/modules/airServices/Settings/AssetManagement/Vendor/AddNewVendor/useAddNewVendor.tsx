import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import {
  newVendorDefaultValues,
  newVendorValidationSchema,
} from './AddNewVendor.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { usePostNewVendorMutation } from '@/services/airServices/settings/asset-management/vendor';

export const useAddNewVendor = (props: any) => {
  const { setIsADrawerOpen } = props;
  const [postNewVendorTrigger] = usePostNewVendorMutation();

  const methodsNewVendor: any = useForm<any>({
    resolver: yupResolver(newVendorValidationSchema),
    defaultValues: newVendorDefaultValues,
  });
  const { handleSubmit, reset } = methodsNewVendor;
  const onSubmit = async (data: any) => {
    try {
      const response = await postNewVendorTrigger({
        body: {
          ...data,
        },
      })?.unwrap();
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
  };
};
