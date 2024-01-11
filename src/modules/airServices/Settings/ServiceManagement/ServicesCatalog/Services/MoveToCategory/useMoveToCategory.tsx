import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  moveToCategoryDefaultValues,
  moveToCategoryValidationSchema,
} from './MoveToCategory.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useLazyGetCategoriesDropdownQuery,
  usePatchServiceCatalogMutation,
} from '@/services/airServices/settings/service-management/service-catalog';

const useMoveToCategory = (prop: any) => {
  const [patchServiceCatalogTrigger] = usePatchServiceCatalogMutation();
  const { open, setOpen, id } = prop;
  const methodAdd = useForm({
    resolver: yupResolver(moveToCategoryValidationSchema),
    defaultValues: moveToCategoryDefaultValues,
  });
  const { handleSubmit } = methodAdd;
  const onSubmit = async (data: any) => {
    const moveToCategoryData = new FormData();

    moveToCategoryData.append('serviceCategory', data?.category?._id);
    moveToCategoryData.append('id', id?.selectedCheckboxes?.[0]);
    const body = moveToCategoryData;

    const patchServiceCatalogParameter = { body };
    try {
      const response = await patchServiceCatalogTrigger(
        patchServiceCatalogParameter,
      )?.unwrap();

      enqueueSnackbar(response?.data?.message ?? 'Service Move Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    setOpen(false);
  };
  const apiQueryCategroy = useLazyGetCategoriesDropdownQuery();
  return {
    methodAdd,
    handleSubmit,
    onSubmit,
    open,
    setOpen,
    apiQueryCategroy,
  };
};
export default useMoveToCategory;
