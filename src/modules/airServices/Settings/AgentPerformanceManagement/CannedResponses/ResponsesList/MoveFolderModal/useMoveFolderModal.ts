import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  moveFolderDefaultValues,
  moveFolderSchema,
} from './MoveFolderModal.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useMoveFolderModal = (props: any) => {
  const { openMoveFolderModal, closeMoveFolderModal } = props;
  const method = useForm({
    defaultValues: moveFolderDefaultValues,
    resolver: yupResolver(moveFolderSchema),
  });
  const onSubmit = () => {
    enqueueSnackbar('Moved Successfully!', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    closeMoveFolderModal();
  };
  return {
    method,
    onSubmit,
    openMoveFolderModal,
    closeMoveFolderModal,
  };
};
