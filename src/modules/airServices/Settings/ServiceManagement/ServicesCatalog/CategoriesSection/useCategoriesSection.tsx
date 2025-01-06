import {
  addServiceCatalogDefaultValues,
  addServiceCatalogValidationSchema,
} from './CategoriesSection.data';
import { usePostAirServicesSettingsServiceCatalogMutation } from '@/services/airServices/settings/service-management/service-catalog';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { useFormLib } from '@/hooks/useFormLib';

const useCategoriesSection = (props: any) => {
  const { setOpen } = props;

  const router: any = useRouter();
  const theme: any = useTheme();

  const [postServiceCatalogTrigger, postServiceCatalogTriggerStatus] =
    usePostAirServicesSettingsServiceCatalogMutation();

  const formLibProps = {
    validationSchema: addServiceCatalogValidationSchema,
    defaultValues: addServiceCatalogDefaultValues,
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const onSubmit = async (data: any) => {
    try {
      await postServiceCatalogTrigger({
        body: data,
      })?.unwrap();
      successSnackbar('Service Added Successfully!');
      handleClose?.();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  const handleClose = () => {
    reset();
    setOpen?.(false);
  };

  return {
    router,
    theme,
    methods,
    handleSubmit,
    onSubmit,
    handleClose,
    postServiceCatalogTriggerStatus,
  };
};

export default useCategoriesSection;
