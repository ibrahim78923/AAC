import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createNewFolderDefaultValues,
  createNewFolderSchema,
} from './CreateNewFolder.data';
import { useEffect } from 'react';

export const useCreateNewFolder = (openCreateNewFolderModal: any) => {
  const method = useForm({
    defaultValues: createNewFolderDefaultValues,
    resolver: yupResolver(createNewFolderSchema),
  });
  const { setValue } = method;
  const onSubmit = () => {};
  useEffect(() => {
    if (openCreateNewFolderModal?.editData) {
      setValue('folderName', openCreateNewFolderModal?.editData?.name);
      setValue('description', openCreateNewFolderModal?.editData?.description);
    } else {
      setValue('folderName', '');
      setValue('description', '');
    }
  }, [openCreateNewFolderModal]);
  return {
    method,
    onSubmit,
  };
};
