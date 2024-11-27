import { useForm } from 'react-hook-form';
import { giftCardDefaultValues } from './GiftCardsFilter.data';
import { PAGINATION } from '@/config';

export const useGiftCardFilter = (props: any) => {
  const { filterGiftCard, setFilterGiftCard, setIsPortalOpen, setPage } = props;

  const methods: any = useForm({
    defaultValues: giftCardDefaultValues(filterGiftCard),
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    const giftCardFiltered: any = Object?.entries(data || {})
      ?.filter(
        ([, value]: any) => value !== undefined && value != '' && value != null,
      )
      ?.reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: value }), {});

    if (!Object?.keys(giftCardFiltered || {})?.length) {
      setFilterGiftCard?.(giftCardFiltered);
      closeFilterForm();
      return;
    }
    setPage?.(PAGINATION?.CURRENT_PAGE);
    setFilterGiftCard?.(giftCardFiltered);
    setIsPortalOpen?.(false);
  };

  const resetFilterForm = () => {
    reset?.();
    setFilterGiftCard?.(null);
    setIsPortalOpen?.(false);
  };

  const closeFilterForm = () => {
    reset?.();
    setIsPortalOpen?.(false);
  };

  return { onSubmit, closeFilterForm, resetFilterForm, methods, handleSubmit };
};
