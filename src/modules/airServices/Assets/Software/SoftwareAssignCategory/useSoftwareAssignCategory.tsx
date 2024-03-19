import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  assignCategoryValidationSchema,
  assignCategoryDefaultValues,
  assignCategoryFieldFunction,
} from './SoftwareAssignCategory.data';
import {
  useLazyGetCategoriesDropdownQuery,
  usePutSoftwareAssignCategoryMutation,
} from '@/services/airServices/assets/software';
import { errorSnackbar, successSnackbar } from '@/utils/api';

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
      (software: any) => software,
    );
    const putAssignCategoryParameter = {
      ids: selectedSoftwareIds,
      body: assignCategoryData,
    };

    try {
      const response = await putSoftwareAssignCategoryTrigger(
        putAssignCategoryParameter,
      )?.unwrap();
      successSnackbar(response?.message ?? 'Category Assign Successfully');
      reset(assignCategoryDefaultValues());
      setOpenAssignModal?.(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.error ?? 'Something went wrong');
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
