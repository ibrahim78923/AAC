import { useForm } from 'react-hook-form';
import {
  giftCardDetailsDefaultValues,
  giftCardDetailsFilterFromFieldsDynamic,
} from './GiftCardDetailsFilter.data';
import { filteredEmptyValues } from '@/utils/api';

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

  const giftCardDetailsFilterFromFields =
    giftCardDetailsFilterFromFieldsDynamic?.();

  return {
    giftCardDetailsFilterFromFields,
    onSubmit,
    closeFilterForm,
    resetFilterForm,
    methods,
    handleSubmit,
  };
};
