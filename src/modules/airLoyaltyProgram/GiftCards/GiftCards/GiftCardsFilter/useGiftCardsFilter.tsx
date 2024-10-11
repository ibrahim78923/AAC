import { useForm } from 'react-hook-form';
import { giftCardDefaultValues } from './GiftCardsFilter.data';
import { filteredEmptyValues } from '@/utils/api';

export const useGiftCardFilter = (props: any) => {
  const { filterGiftCard, setFilterGiftCard, setIsPortalOpen } = props;

  const methods: any = useForm({
    defaultValues: giftCardDefaultValues(filterGiftCard),
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    const filterValues = filteredEmptyValues?.(data);
    setFilterGiftCard?.(filterValues);
    closeFilterForm?.();
  };

  const resetFilterForm = () => {
    setFilterGiftCard?.({});
    closeFilterForm?.();
  };
  const closeFilterForm = () => {
    setIsPortalOpen({});
    reset();
  };

  return { onSubmit, closeFilterForm, resetFilterForm, methods, handleSubmit };
};
