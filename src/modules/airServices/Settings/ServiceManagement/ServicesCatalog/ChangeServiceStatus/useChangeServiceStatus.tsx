import {
  changeStatusDefaultValues,
  changeStatusValidationSchema,
} from './ChangeServiceStatus.data';
import { usePatchAirServicesSettingsServiceCatalogMutation } from '@/services/airServices/settings/service-management/service-catalog';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { useFormLib } from '@/hooks/useFormLib';
import { ARRAY_INDEX, SELECTED_ARRAY_LENGTH } from '@/constants/strings';

export const useChangeServiceStatus = (prop: any) => {
  const { setOpenStatus, dataProp, setSelectedCheckboxes } = prop;

  const [patchServiceCatalogTrigger, patchServiceCatalogTriggerStatus] =
    usePatchAirServicesSettingsServiceCatalogMutation();

  const singleSelectedStatus =
    dataProp?.selectedCheckboxes?.length === SELECTED_ARRAY_LENGTH?.ONE
      ? dataProp?.selectedCheckboxes?.[ARRAY_INDEX?.ZERO]?.status
      : undefined;

  const formLibProps = {
    validationSchema: changeStatusValidationSchema,
    defaultValues: changeStatusDefaultValues?.(singleSelectedStatus),
  };

  const { handleSubmit, methods } = useFormLib(formLibProps);

  const onSubmit = async (data: any) => {
    const moveToCategoryData = {
      status: data?.status,
      ids: dataProp?.selectedCheckboxes?.map((ids: any) => ids?._id),
    };

    const body = moveToCategoryData;

    const patchServiceCatalogParameter = { body };
    try {
      await patchServiceCatalogTrigger(patchServiceCatalogParameter)?.unwrap();
      successSnackbar('Service Status Updated');
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
    setSelectedCheckboxes?.([]);
    handleClose?.();
  };

  const handleClose = () => {
    setOpenStatus?.(false);
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    patchServiceCatalogTriggerStatus,
    handleClose,
  };
};
