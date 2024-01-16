import { useForm } from 'react-hook-form';
import { assignedPhysicalGiftFilterDefaultValues } from './AssignedPhysicalGiftCardsFilter.data';

export const useAssignedPhysicalGiftCardsFilter = (props: any) => {
  const { setIsDrawerOpen } = props;
  const methods: any = useForm({
    defaultValues: assignedPhysicalGiftFilterDefaultValues?.(),
  });
  const { handleSubmit } = methods;
  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  const onSubmit = () => {
    setIsDrawerOpen(false);
  };
  return {
    methods,
    handleSubmit,
    onSubmit,
    handleClose,
  };
};
