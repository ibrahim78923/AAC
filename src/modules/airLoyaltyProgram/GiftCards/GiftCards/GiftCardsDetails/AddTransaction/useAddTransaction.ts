import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { defaultValues, validationSchema } from './AddTranscation.data';
export const useAddTransaction = (props: any) => {
  const { setAddTransaction } = props;
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = async () => {
    enqueueSnackbar('Saved Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset();
  };
  const handleCloseDrawer = () => {
    reset();
    setAddTransaction(false);
  };
  return { handleSubmit, onSubmit, methods, handleCloseDrawer };
};
