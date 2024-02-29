import { useForm } from 'react-hook-form';
import { giftCardDetailsDefaultValues } from './GiftCardDetailsFilter.data';

export const useGiftCardDetailsFilter = (props: any) => {
  const { setOpenFilter } = props;

  const methods: any = useForm({
    defaultValues: giftCardDetailsDefaultValues(),
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
