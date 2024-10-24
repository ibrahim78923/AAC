import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePutSoftwareAssignCategoryMutation } from '@/services/airServices/assets/software';
import * as Yup from 'yup';
import { SoftwareAssignCategoryI } from './SoftwareAssignCategory.interface';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useSoftwareAssignCategory = (params: SoftwareAssignCategoryI) => {
  const { setOpenAssignModal, selectedSoftware, setSoftwareData } = params;

  const methods = useForm({
    resolver: yupResolver(
      Yup?.object()?.shape({
        category: Yup?.string()?.required(' Category is required'),
      }),
    ),
    defaultValues: { category: '' },
  });

  const { handleSubmit, reset } = methods;

  const [putSoftwareAssignCategoryTrigger, putSoftwareAssignCategoryStatus] =
    usePutSoftwareAssignCategoryMutation();

  const onSubmit = async (data: { category: string }) => {
    const putAssignCategoryApiParameter = {
      body: {
        softwareIds: selectedSoftware,
        category: data?.category,
      },
    };

    try {
      await putSoftwareAssignCategoryTrigger(
        putAssignCategoryApiParameter,
      )?.unwrap();
      successSnackbar('Category Assign Successfully');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    reset();
    setOpenAssignModal?.(false);
    setSoftwareData?.([]);
  };

  return {
    onSubmit,
    handleSubmit,
    methods,
    putSoftwareAssignCategoryStatus,
    handleClose,
  };
};
