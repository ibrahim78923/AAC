import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePutSoftwareAssignCategoryMutation } from '@/services/airServices/assets/software';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import * as Yup from 'yup';

export const useEventDialog = (params: any) => {
  const { setOpenAssignModal, selectedSoftware, setSoftwareData } = params;

  const methods: any = useForm<any>({
    resolver: yupResolver(
      Yup?.object()?.shape({
        category: Yup?.mixed()?.required(' Category is required'),
      }),
    ),
    defaultValues: { category: '' },
  });

  const { handleSubmit, reset } = methods;

  const [putSoftwareAssignCategoryTrigger, putSoftwareAssignCategoryStatus] =
    usePutSoftwareAssignCategoryMutation();

  const onSubmit = async (data: any) => {
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
