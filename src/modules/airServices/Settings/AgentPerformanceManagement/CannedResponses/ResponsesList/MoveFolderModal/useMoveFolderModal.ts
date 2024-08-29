import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  moveFolderDefaultValues,
  moveFolderSchema,
} from './MoveFolderModal.data';
import { useLazyGetFoldersQuery } from '@/services/dropdowns';
import { useMoveResponsesMutation } from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { IErrorResponse } from '@/types/shared/ErrorResponse';

export const useMoveFolderModal = (props: any) => {
  const {
    openMoveFolderModal,
    closeMoveFolderModal,
    setSelectedData,
    selectedData,
  } = props;
  const apiQueryFolders = useLazyGetFoldersQuery();
  const method = useForm({
    defaultValues: moveFolderDefaultValues,
    resolver: yupResolver(moveFolderSchema),
  });
  const { reset } = method;
  const [moveResponsesTrigger, { isLoading }] = useMoveResponsesMutation();
  const onSubmit = async (data: any) => {
    const upsertCannedResponseFormData = new FormData();
    upsertCannedResponseFormData?.append('folderId', data?.folder?._id);
    selectedData?.forEach(
      (item: any) => upsertCannedResponseFormData?.append('ids', item?._id),
    );
    const moveResponsesParameter = {
      body: upsertCannedResponseFormData,
    };
    try {
      await moveResponsesTrigger(moveResponsesParameter)?.unwrap();
      successSnackbar('Moved Successfully!');
      closeMoveFolderModal();
      setSelectedData([]);
      reset();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  return {
    method,
    onSubmit,
    openMoveFolderModal,
    closeMoveFolderModal,
    apiQueryFolders,
    isLoading,
  };
};
