import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import {
  upsertVendorDefaultValues,
  upsertVendorValidationSchema,
} from './UpsertVendor.data';

export const useUpsertVendor = (
  setIsUpsertModalOpen: any,
  isUpsertModalOpen: any,
) => {
  const methods: any = useForm({
    resolver: yupResolver(upsertVendorValidationSchema),
    defaultValues: upsertVendorDefaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    try {
      setIsUpsertModalOpen?.(false);
      enqueueSnackbar(
        `Vendor ${isUpsertModalOpen?.id ? 'Updated' : 'Added'} Successfully!`,
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      setIsUpsertModalOpen?.(false);
      enqueueSnackbar(error ?? 'Something Went Wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
  };
};
