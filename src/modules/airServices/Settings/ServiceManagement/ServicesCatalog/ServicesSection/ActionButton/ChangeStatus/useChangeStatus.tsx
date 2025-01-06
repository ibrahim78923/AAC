import {
  changeStatusDefaultValues,
  changeStatusValidationSchema,
} from './ChangeStatus.data';
import { usePatchAirServicesSettingsServiceCatalogMutation } from '@/services/airServices/settings/service-management/service-catalog';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { useFormLib } from '@/hooks/useFormLib';

const useChangeStatus = (prop: any) => {
  const { setOpenStatus, dataProp, setSelectedCheckboxes } = prop;

  const [patchServiceCatalogTrigger, patchServiceCatalogTriggerStatus] =
    usePatchAirServicesSettingsServiceCatalogMutation();

  const formLibProps = {
    validationSchema: changeStatusValidationSchema,
    defaultValues: changeStatusDefaultValues,
  };

  const { handleSubmit, methods } = useFormLib(formLibProps);

  const onSubmit = async (data: any) => {
    const moveToCategoryData = {
      status: data?.status,
      ids: dataProp?.selectedCheckboxes,
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
export default useChangeStatus;
