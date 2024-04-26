import { useForm } from 'react-hook-form';
import { assignedPhysicalGiftFilterDefaultValues } from './AssignedPhysicalGiftCardsFilter.data';
import { filteredEmptyValues } from '@/utils/api';

export const useAssignedPhysicalGiftCardsFilter = (props: any) => {
  const {
    filterAssignedPhysicalCard,
    setFilterAssignedPhysicalCard,
    setIsPortalOpen,
  } = props;

  const methods: any = useForm({
    defaultValues: assignedPhysicalGiftFilterDefaultValues?.(
      filterAssignedPhysicalCard,
    ),
  });

  const { handleSubmit, reset } = methods;

  const submitFilter = async (data: any) => {
    const filterValues = filteredEmptyValues?.(data);
    setFilterAssignedPhysicalCard?.(filterValues);
    closeFilterForm?.();
  };

  const resetFilterForm = () => {
    setFilterAssignedPhysicalCard?.({});
    closeFilterForm?.();
  };
  const closeFilterForm = () => {
    setIsPortalOpen({});
    reset();
  };

  return {
    methods,
    handleSubmit,
    submitFilter,
    closeFilterForm,
    resetFilterForm,
  };
};
