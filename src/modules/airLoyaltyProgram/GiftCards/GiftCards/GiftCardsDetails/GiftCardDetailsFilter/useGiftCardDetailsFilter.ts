import { useForm } from 'react-hook-form';
import {
  giftCardDetailsDefaultValues,
  giftCardDetailsFilterFromFieldsDynamic,
} from './GiftCardDetailsFilter.data';
import { filteredEmptyValues } from '@/utils/api';
import { useLazyGetShopDropdownForGiftCardDetailsQuery } from '@/services/airLoyaltyProgram/giftCards/giftCards/details';

export const useGiftCardDetailsFilter = (props: any) => {
  const { filterGiftCardDetails, setFilterGiftCardDetails, setIsPortalOpen } =
    props;

  const methods: any = useForm({
    defaultValues: giftCardDetailsDefaultValues(filterGiftCardDetails),
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    const filterValues = filteredEmptyValues?.(data);
    setFilterGiftCardDetails?.(filterValues);
    closeFilterForm?.();
  };

  const resetFilterForm = () => {
    setFilterGiftCardDetails?.({});
    closeFilterForm?.();
  };
  const closeFilterForm = () => {
    setIsPortalOpen({});
    reset();
  };

  const shopApiQuery = useLazyGetShopDropdownForGiftCardDetailsQuery?.();

  const giftCardDetailsFilterFromFields =
    giftCardDetailsFilterFromFieldsDynamic?.(shopApiQuery);

  return {
    giftCardDetailsFilterFromFields,
    onSubmit,
    closeFilterForm,
    resetFilterForm,
    methods,
    handleSubmit,
  };
};
