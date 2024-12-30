import { usePutSoftwareAssignCategoryMutation } from '@/services/airServices/assets/software';
import * as Yup from 'yup';
import { SoftwareAssignCategoryI } from './SoftwareAssignCategory.interface';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';

export const useSoftwareAssignCategory = (params: SoftwareAssignCategoryI) => {
  const { setOpenAssignModal, selectedSoftware, setSoftwareData } = params;

  const useFormValues = {
    validationSchema: Yup?.object()?.shape({
      category: Yup?.string()?.required(' Category is required'),
    }),
    defaultValues: { category: '' },
  };

  const { handleSubmit, reset, methods } = useFormLib(useFormValues);

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
