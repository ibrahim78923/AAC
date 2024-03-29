import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addServiceCatalogDefaultValues,
  addServiceCatalogValidationSchema,
} from './AddServiceCatalog.data';

import { usePostServiceCatalogMutation } from '@/services/airServices/settings/service-management/service-catalog';
import { errorSnackbar, successSnackbar } from '@/utils/api';

const useAddServiceCatalog = (prop: any) => {
  const { open, setOpen } = prop;
  const [postServiceCatalogTrigger] = usePostServiceCatalogMutation();
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
      reset(addServiceCatalogDefaultValues);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
    setOpen(false);
  };

  return {
    methodAdd,
    handleSubmit,
    onSubmit,
    open,
    setOpen,
  };
};
export default useAddServiceCatalog;
