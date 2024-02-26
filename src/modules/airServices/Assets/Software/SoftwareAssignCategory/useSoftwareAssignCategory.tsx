import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  assignCategoryValidationSchema,
  assignCategoryDefaultValues,
  assignCategoryFieldFunction,
} from './SoftwareAssignCategory.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useLazyGetCategoriesDropdownQuery,
  usePutSoftwareAssignCategoryMutation,
} from '@/services/airServices/assets/software';

export const useSoftwareAssignCategory = (params: any) => {
  const { setOpenAssignModal, selectedSoftware } = params;
  const methods: any = useForm<any>({
    resolver: yupResolver(assignCategoryValidationSchema),
    defaultValues: assignCategoryDefaultValues(),
  });

  const { handleSubmit, reset } = methods;

  const assignCategoryDropdownApi = useLazyGetCategoriesDropdownQuery();
  const assignCategoryField = assignCategoryFieldFunction(
    assignCategoryDropdownApi,
  );
  const [putSoftwareAssignCategoryTrigger, putSoftwareAssignCategoryStatus] =
    usePutSoftwareAssignCategoryMutation();

  const onSubmit = async (data: any) => {
    const assignCategoryData = {
      categoryId: data?.category?._id,
    };
    const selectedSoftwareIds = selectedSoftware.map(
      (software: any) => software?.id,
    );
    const putAssignCategoryParameter = {
      ids: selectedSoftwareIds,
      body: assignCategoryData,
    };

    try {
      const response = await putSoftwareAssignCategoryTrigger(
        putAssignCategoryParameter,
      )?.unwrap();
      enqueueSnackbar(response?.message ?? 'Category Assign Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset(assignCategoryDefaultValues());
      setOpenAssignModal?.(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.error ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
      reset(assignCategoryDefaultValues());
      setOpenAssignModal?.(false);
    }
  };

  return {
    onSubmit,
    handleSubmit,
    methods,
    assignCategoryField,
    putSoftwareAssignCategoryStatus,
  };
};
