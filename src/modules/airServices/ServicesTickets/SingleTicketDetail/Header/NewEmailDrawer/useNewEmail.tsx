import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import {
  addEmailDefaultValues,
  addEmailValidationSchema,
} from './NewEmailDrawer.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useNewEmailDrawer = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const methods: any = useForm({
    resolver: yupResolver(addEmailValidationSchema),
    defaultValues: addEmailDefaultValues,
  });

  const { handleSubmit, reset } = methods;
  const onClose = () => {
    reset(addEmailDefaultValues);
    setIsDrawerOpen?.(false);
  };
  const onSubmit = handleSubmit(() => {
    enqueueSnackbar('Email Added Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setIsDrawerOpen?.(false);
  });
  return {
    methods,
    handleSubmit,
    onSubmit,
    isDrawerOpen,
    setIsDrawerOpen,
    onClose,
  };
};
