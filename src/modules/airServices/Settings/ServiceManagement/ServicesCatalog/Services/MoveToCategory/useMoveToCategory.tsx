import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  moveToCategoryDefaultValues,
  moveToCategoryValidationSchema,
} from './MoveToCategory.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useMoveToCategory = (prop: any) => {
  const { open, setOpen } = prop;
  const methodAdd = useForm({
    resolver: yupResolver(moveToCategoryValidationSchema),
    defaultValues: moveToCategoryDefaultValues,
  });
  const { handleSubmit } = methodAdd;
  const onSubmit = () => {
    setOpen(false);
    enqueueSnackbar('Service Move Successfully', {
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
export default useMoveToCategory;
