import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addServiceCatalogDefaultValues,
  addServiceCatalogValidationSchema,
} from './AddServiceCatalog.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useAddServiceCatalog = (prop: any) => {
  const { open, setOpen } = prop;
  const methodAdd = useForm({
    resolver: yupResolver(addServiceCatalogValidationSchema),
    defaultValues: addServiceCatalogDefaultValues,
  });
  const { handleSubmit } = methodAdd;
  const onSubmit = () => {
    setOpen(false);
    enqueueSnackbar('Service Add Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
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
