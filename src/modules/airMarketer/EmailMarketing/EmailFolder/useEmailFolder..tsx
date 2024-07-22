import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createFolderDefaultValues,
  createFolderValidationSchema,
} from './EmailFolder.data';
import { enqueueSnackbar } from 'notistack';
import {
  useGetEmailFolderQuery,
  usePostEmailFolderMutation,
} from '@/services/airMarketer/emailFolder';

const useEmailFolder = () => {
  const [allSelectedFoldersIds, setAllSelectedFoldersIds] = useState<string[]>(
    [],
  );
  const [searchValue, setSearchValue] = useState('');
  const { data: allFolder, isLoading } = useGetEmailFolderQuery({
    ...(searchValue && { search: searchValue }),
  });

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
  const [postEmailFolder, { isLoading: isLoadingPost }] =
    usePostEmailFolderMutation();

  const onSubmitCreateFolder = async (values: any) => {
    try {
      await postEmailFolder({ body: values })?.unwrap();
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
    allFolder,
    allSelectedFoldersIds,
    setAllSelectedFoldersIds,
    searchValue,
    setSearchValue,
    isLoading,
    isLoadingPost,
  };
};
export default useEmailFolder;
