import { useForm } from 'react-hook-form';
import { digitalGiftCardDefaultValues } from './DigitalGiftCardFilter.data';
import { filteredEmptyValues } from '@/utils/api';

export const useDigitalGiftCardFilter = (props: any) => {
  const { filterDigitalCard, setFilterDigitalCard, setIsPortalOpen } = props;

  const methods: any = useForm({
    defaultValues: digitalGiftCardDefaultValues(filterDigitalCard),
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    const filterValues = filteredEmptyValues?.(data);
    setFilterDigitalCard?.(filterValues);
    closeFilterForm?.();
  };

  const resetFilterForm = () => {
    setFilterDigitalCard?.({});
    closeFilterForm?.();
  };
  const closeFilterForm = () => {
    setIsPortalOpen({});
    reset();
  };

  return { onSubmit, closeFilterForm, resetFilterForm, methods, handleSubmit };
};
