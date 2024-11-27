import { useForm } from 'react-hook-form';
import { giftCardDetailsDefaultValues } from './GiftCardDetailsFilter.data';
import { PAGINATION } from '@/config';

export const useGiftCardDetailsFilter = (props: any) => {
  const {
    filterGiftCardDetails,
    setFilterGiftCardDetails,
    setIsPortalOpen,
    setPage,
  } = props;

  const methods: any = useForm({
    defaultValues: giftCardDetailsDefaultValues(filterGiftCardDetails),
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    const giftCardDetailsFilter: any = Object?.entries(data || {})
      ?.filter(
        ([, value]: any) => value !== undefined && value != '' && value != null,
      )
      ?.reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: value }), {});

    if (!Object?.keys(giftCardDetailsFilter || {})?.length) {
      setFilterGiftCardDetails?.(giftCardDetailsFilter);
      closeFilterForm();
      return;
    }
    setPage?.(PAGINATION?.CURRENT_PAGE);
    setFilterGiftCardDetails?.(giftCardDetailsFilter);
    setIsPortalOpen?.(false);
  };

  const resetFilterForm = () => {
    reset?.();
    setFilterGiftCardDetails?.(null);
    setIsPortalOpen?.(false);
  };

  const closeFilterForm = () => {
    reset?.();
    setIsPortalOpen?.(false);
  };

  return {
    onSubmit,
    closeFilterForm,
    resetFilterForm,
    methods,
    handleSubmit,
  };
};
