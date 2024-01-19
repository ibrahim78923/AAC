import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { defaultValues, validationSchema } from './AddDigitalGiftCard.data';
export const useAddDigitalGiftCard = (props: any) => {
  const { setAddDigitalCard } = props;
  const methods: any = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = async () => {
    enqueueSnackbar('Assigned Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    handleCloseDrawer?.();
    reset();
  };
  const handleCloseDrawer = () => {
    reset();
    setAddDigitalCard(false);
  };
  return { handleSubmit, onSubmit, methods, handleCloseDrawer };
};
