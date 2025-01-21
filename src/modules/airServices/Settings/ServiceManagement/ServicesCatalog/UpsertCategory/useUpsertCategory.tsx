import { useFormLib } from '@/hooks/useFormLib';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import {
  upsertServiceCategoryFormDefaultValues,
  upsertServiceCategoryFormValidationSchema,
} from './UpsertCategory.data';
import { usePostAirServicesSettingsServiceCatalogMutation } from '@/services/airServices/settings/service-management/service-catalog';

export const useUpsertCategory = (props: any) => {
  const { setIsPortalOpen } = props;
  const [postServiceCatalogTrigger, postServiceCatalogTriggerStatus] =
    usePostAirServicesSettingsServiceCatalogMutation();

  const formLibProps = {
    validationSchema: upsertServiceCategoryFormValidationSchema,
    defaultValues: upsertServiceCategoryFormDefaultValues,
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const handleClose = () => {
    reset();
    setIsPortalOpen?.(false);
  };

  const onSubmit = async (data: any) => {
    try {
      await postServiceCatalogTrigger({
        body: data,
      })?.unwrap();
      successSnackbar('Service category added successfully!');
      handleClose?.();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    handleClose,
    postServiceCatalogTriggerStatus,
  };
};
