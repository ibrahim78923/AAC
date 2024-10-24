import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  useLazyGetAirServicesSettingsServiceCategoriesDropdownQuery,
  usePatchAirServicesSettingsServiceCatalogMutation,
} from '@/services/airServices/settings/service-management/service-catalog';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import {
  moveToCategoryDefaultValues,
  moveToCategoryValidationSchema,
} from './MoveToCategory.data';

export default function useMoveToCategory(props: any) {
  const { setOpen, dataProp, setSelectedCheckboxes } = props;

  const [patchServiceCatalogTrigger, patchServiceCatalogTriggerStatus] =
    usePatchAirServicesSettingsServiceCatalogMutation();

  const methodAdd = useForm({
    resolver: yupResolver(moveToCategoryValidationSchema),
    defaultValues: moveToCategoryDefaultValues,
  });

  const { handleSubmit } = methodAdd;

  const onSubmit = async (data: any) => {
    const moveToCategoryData = {
      serviceCategory: data?.category?._id,
      ids: dataProp?.selectedCheckboxes,
    };
    const body = moveToCategoryData;

    const patchServiceCatalogParameter = { body };
    try {
      await patchServiceCatalogTrigger(patchServiceCatalogParameter)?.unwrap();
      successSnackbar('Service Moved Successfully!');
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }

    handleClose?.();
    setSelectedCheckboxes?.([]);
  };

  const handleClose = () => {
    setOpen?.(false);
  };

  const apiQueryCategory =
    useLazyGetAirServicesSettingsServiceCategoriesDropdownQuery();

  return {
    methodAdd,
    handleSubmit,
    onSubmit,
    apiQueryCategory,
    patchServiceCatalogTriggerStatus,
    handleClose,
  };
}
