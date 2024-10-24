import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  changeStatusDefaultValues,
  changeStatusValidationSchema,
} from './ChangeStatus.data';
import { usePatchAirServicesSettingsServiceCatalogMutation } from '@/services/airServices/settings/service-management/service-catalog';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { IErrorResponse } from '@/types/shared/ErrorResponse';

const useChangeStatus = (prop: any) => {
  const { setOpenStatus, dataProp, setSelectedCheckboxes } = prop;

  const [patchServiceCatalogTrigger, patchServiceCatalogTriggerStatus] =
    usePatchAirServicesSettingsServiceCatalogMutation();

  const methodChangeStatus = useForm({
    resolver: yupResolver(changeStatusValidationSchema),
    defaultValues: changeStatusDefaultValues,
  });

  const { handleSubmit } = methodChangeStatus;

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
    methodChangeStatus,
    handleSubmit,
    onSubmit,
    patchServiceCatalogTriggerStatus,
    handleClose,
  };
};
export default useChangeStatus;
