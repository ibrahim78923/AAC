import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  moveToCategoryDefaultValues,
  moveToCategoryValidationSchema,
} from './MoveToCategory.data';

import {
  useLazyGetCategoriesDropdownQuery,
  usePatchServiceCatalogMutation,
} from '@/services/airServices/settings/service-management/service-catalog';
import { errorSnackbar, successSnackbar } from '@/utils/api';

const useMoveToCategory = (prop: any) => {
  const [patchServiceCatalogTrigger] = usePatchServiceCatalogMutation();
  const { open, setOpen, id, setSelectedCheckboxes } = prop;
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
      await patchServiceCatalogTrigger(patchServiceCatalogParameter)?.unwrap();

      successSnackbar('Service Move Successfully!');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
    setOpen(false);
    setSelectedCheckboxes([]);
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
