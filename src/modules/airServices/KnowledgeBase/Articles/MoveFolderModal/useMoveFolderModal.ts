import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  moveFolderValidationSchema,
  moveFolderDefaultValues,
} from './MoveFolderModal.data';
import { enqueueSnackbar } from 'notistack';

export const useMoveFolderModal = () => {
  const methodMoveFolderForm = useForm({
    resolver: yupResolver(moveFolderValidationSchema),
    defaultValues: moveFolderDefaultValues,
  });
  const submitMoveFolder = () => {
    enqueueSnackbar('Article moved to a new folder successfully', {
      variant: 'success',
      autoHideDuration: 2000,
    });
  };
  const modalSubmitHandler = () => {
    methodMoveFolderForm?.handleSubmit(submitMoveFolder)();
  };
  return {
    methodMoveFolderForm,
    submitMoveFolder,
    modalSubmitHandler,
  };
};
