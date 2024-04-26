import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createFolderDefaultValues,
  createFolderValidationSchema,
} from './EmailFolder.data';
import { enqueueSnackbar } from 'notistack';

const useEmailFolder = () => {
  // Create Folder
  const methodsCreateFolder = useForm({
    resolver: yupResolver(createFolderValidationSchema),
    defaultValues: createFolderDefaultValues,
  });
  const {
    handleSubmit: handleMethodCreateFolder,
    reset: resetCreateFolderForm,
  } = methodsCreateFolder;
  const [openModalCreateFolder, setOpenModalCreateFolder] = useState(false);
  const handleOpenModalCreateFolder = () => {
    setOpenModalCreateFolder(true);
  };
  const handleCloseModalCreateFolder = () => {
    setOpenModalCreateFolder(false);
  };

  const onSubmitCreateFolder = async () => {
    try {
      // await postAddFaq({ body: values })?.unwrap();
      handleCloseModalCreateFolder();
      resetCreateFolderForm();
      enqueueSnackbar('Created new folder successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleCreateFolderSubmit =
    handleMethodCreateFolder(onSubmitCreateFolder);

  return {
    openModalCreateFolder,
    handleOpenModalCreateFolder,
    handleCloseModalCreateFolder,
    methodsCreateFolder,
    handleCreateFolderSubmit,
  };
};
export default useEmailFolder;
