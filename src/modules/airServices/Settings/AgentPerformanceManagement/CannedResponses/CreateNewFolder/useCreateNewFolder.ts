import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createNewFolderDefaultValues,
  createNewFolderSchema,
} from './CreateNewFolder.data';
import { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useCreateNewFolder = (openCreateNewFolderModal: any) => {
  const method = useForm({
    defaultValues: createNewFolderDefaultValues,
    resolver: yupResolver(createNewFolderSchema),
  });
  const { setValue, reset } = method;
  const onSubmit = () => {
    enqueueSnackbar('Folder Created Successfully!', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };
  useEffect(() => {
    if (openCreateNewFolderModal?.editData) {
      setValue('folderName', openCreateNewFolderModal?.editData?.name);
      setValue('description', openCreateNewFolderModal?.editData?.description);
    } else {
      reset();
    }
  }, [openCreateNewFolderModal]);
  return {
    method,
    onSubmit,
  };
};
