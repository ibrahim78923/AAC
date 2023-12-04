import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  moveFolderDefaultValues,
  moveFolderSchema,
} from './MoveFolderModal.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useMoveFolderModal = () => {
  const method = useForm({
    defaultValues: moveFolderDefaultValues,
    resolver: yupResolver(moveFolderSchema),
  });
  const onSubmit = () => {
    enqueueSnackbar('Moved Successfully!', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };
  return {
    method,
    onSubmit,
  };
};
