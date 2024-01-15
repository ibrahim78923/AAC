import { useForm } from 'react-hook-form';
import { digitalGiftCardDefaultValues } from './DigitalGiftCardFilter.data';

export const useDigitalGiftCardFilter = (props: any) => {
  const { setOpenFilter } = props;

  const methods: any = useForm({
    defaultValues: digitalGiftCardDefaultValues(),
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = async () => {
    reset();
    handleCloseDrawer?.();
  };
  const handleCloseDrawer = () => {
    setOpenFilter(false);
  };

  return { onSubmit, handleCloseDrawer, methods, handleSubmit };
};
