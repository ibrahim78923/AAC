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
import { useFormLib } from '@/hooks/useFormLib';

export default function useMoveToCategory(props: any) {
  const { setOpen, dataProp, setSelectedCheckboxes } = props;

  const [patchServiceCatalogTrigger, patchServiceCatalogTriggerStatus] =
    usePatchAirServicesSettingsServiceCatalogMutation();

  const formLibProps = {
    validationSchema: moveToCategoryValidationSchema,
    defaultValues: moveToCategoryDefaultValues,
  };

  const { handleSubmit, methods } = useFormLib(formLibProps);

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
    methods,
    handleSubmit,
    onSubmit,
    apiQueryCategory,
    patchServiceCatalogTriggerStatus,
    handleClose,
  };
}
