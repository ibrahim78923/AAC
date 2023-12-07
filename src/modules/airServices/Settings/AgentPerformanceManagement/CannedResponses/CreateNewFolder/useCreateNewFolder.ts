import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createNewFolderDefaultValues,
  createNewFolderSchema,
  upsertFolderDefaultValuesFunction,
} from './CreateNewFolder.data';
import { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useCreateNewFolder = (props: any) => {
  const { openCreateNewFolderModal, closeCreateNewFolderModal } = props;
  const method = useForm({
    defaultValues: createNewFolderDefaultValues,
    resolver: yupResolver(createNewFolderSchema),
  });
  const { reset } = method;
  const onSubmit = () => {
    enqueueSnackbar('Folder Created Successfully!', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    closeCreateNewFolderModal();
  };
  useEffect(() => {
    reset(
      upsertFolderDefaultValuesFunction(openCreateNewFolderModal?.editData),
    );
  }, [openCreateNewFolderModal]);
  return {
    method,
    onSubmit,
    openCreateNewFolderModal,
    closeCreateNewFolderModal,
  };
};
