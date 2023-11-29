import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addAssetDefaultValues,
  addAssetValidationSchema,
} from './AddAsset.data';

export const useAddAsset = (setAddModalOpen: any) => {
  const methods: any = useForm({
    resolver: yupResolver(addAssetValidationSchema),
    defaultValues: addAssetDefaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    try {
      setAddModalOpen?.(false);
      enqueueSnackbar('Asset Added Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      setAddModalOpen?.(false);
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
