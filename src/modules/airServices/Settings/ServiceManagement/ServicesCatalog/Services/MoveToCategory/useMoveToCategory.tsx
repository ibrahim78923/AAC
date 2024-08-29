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
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { IServicesProps } from '../Services.interface';

const useMoveToCategory = (prop: IServicesProps) => {
  const [patchServiceCatalogTrigger, patchServiceCatalogTriggerStatus] =
    usePatchServiceCatalogMutation();

  const { open, setOpen, id, setSelectedCheckboxes } = prop;

  const methodAdd = useForm({
    resolver: yupResolver(moveToCategoryValidationSchema),
    defaultValues: moveToCategoryDefaultValues,
  });

  const { handleSubmit } = methodAdd;

  const onSubmit = async (data: any) => {
    const moveToCategoryData = {
      serviceCategory: data?.category?._id,
      ids: id?.selectedCheckboxes,
    };
    const body = moveToCategoryData;

    const patchServiceCatalogParameter = { body };
    try {
      await patchServiceCatalogTrigger(patchServiceCatalogParameter)?.unwrap();

      successSnackbar('Service Move Successfully!');
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
    setOpen?.(false);
    setSelectedCheckboxes?.([]);
  };
  const apiQueryCategroy = useLazyGetCategoriesDropdownQuery();
  return {
    methodAdd,
    handleSubmit,
    onSubmit,
    open,
    setOpen,
    apiQueryCategroy,
    patchServiceCatalogTriggerStatus,
  };
};
export default useMoveToCategory;
