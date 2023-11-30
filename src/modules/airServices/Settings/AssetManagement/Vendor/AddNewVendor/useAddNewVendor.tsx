import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import {
  newVendorDefaultValues,
  newVendorValidationSchema,
} from './AddNewVendor.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useAddNewVendor = (props: any) => {
  const { setIsADrawerOpen } = props;

  const methodsNewVendor = useForm({
    resolver: yupResolver(newVendorValidationSchema),
    defaultValues: newVendorDefaultValues,
  });
  const { handleSubmit, reset } = methodsNewVendor;
  const onSubmit = async () => {
    enqueueSnackbar('Added Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset(newVendorDefaultValues);
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
