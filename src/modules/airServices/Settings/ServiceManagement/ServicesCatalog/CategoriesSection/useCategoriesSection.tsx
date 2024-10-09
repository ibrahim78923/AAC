import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addServiceCatalogDefaultValues,
  addServiceCatalogValidationSchema,
} from './CategoriesSection.data';
import { usePostAirServicesSettingsServiceCatalogMutation } from '@/services/airServices/settings/service-management/service-catalog';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';

const useCategoriesSection = (props: any) => {
  const { setOpen } = props;

  const router: any = useRouter();
  const theme: any = useTheme();

  const [postServiceCatalogTrigger, postServiceCatalogTriggerStatus] =
    usePostAirServicesSettingsServiceCatalogMutation();

  const methodAdd = useForm({
    resolver: yupResolver(addServiceCatalogValidationSchema),
    defaultValues: addServiceCatalogDefaultValues,
  });

  const { handleSubmit, reset } = methodAdd;

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
    methodAdd,
    handleSubmit,
    onSubmit,
    handleClose,
    postServiceCatalogTriggerStatus,
  };
};

export default useCategoriesSection;
