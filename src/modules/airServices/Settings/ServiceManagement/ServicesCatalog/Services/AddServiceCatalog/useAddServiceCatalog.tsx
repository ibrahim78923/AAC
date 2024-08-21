import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addServiceCatalogDefaultValues,
  addServiceCatalogValidationSchema,
} from './AddServiceCatalog.data';
import { usePostServiceCatalogMutation } from '@/services/airServices/settings/service-management/service-catalog';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { IServicesProps } from '../Services.interface';
import { IErrorResponse } from '@/types/shared/ErrorResponse';

const useAddServiceCatalog = (prop: IServicesProps) => {
  const { open, setOpen } = prop;

  const [postServiceCatalogTrigger, postServiceCatalogTriggerStatus] =
    usePostServiceCatalogMutation();

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
      successSnackbar('Service Add Successfully');
      handleClose?.();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
    setOpen?.(false);
  };

  const handleClose = () => {
    reset();
    setOpen?.(false);
  };

  return {
    methodAdd,
    handleSubmit,
    onSubmit,
    open,
    handleClose,
    postServiceCatalogTriggerStatus,
  };
};

export default useAddServiceCatalog;
