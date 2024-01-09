import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addServiceCatalogDefaultValues,
  addServiceCatalogValidationSchema,
} from './AddServiceCatalog.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { usePostServiceCatalogMutation } from '@/services/airServices/settings/service-management/service-catalog';

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
      const response = await postServiceCatalogTrigger({
        body: data,
      })?.unwrap();
      enqueueSnackbar(response?.data?.message ?? 'Service Add Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset(addServiceCatalogDefaultValues);
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
