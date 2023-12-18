import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  assignedPhysicalGiftFilterDefaultValues,
  assignedPhysicalGiftFilterValidationSchema,
} from './AssignedPhysicalGiftCardsFilter.data';

export const useAssignedPhysicalGiftCardsFilter = (props: any) => {
  const { setIsDrawerOpen } = props;
  const methods: any = useForm({
    resolver: yupResolver(assignedPhysicalGiftFilterValidationSchema),

    defaultValues: assignedPhysicalGiftFilterDefaultValues,
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
