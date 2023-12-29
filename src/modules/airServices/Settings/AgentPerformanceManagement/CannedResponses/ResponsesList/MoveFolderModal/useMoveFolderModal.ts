import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  moveFolderDefaultValues,
  moveFolderSchema,
} from './MoveFolderModal.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useLazyGetFoldersQuery } from '@/services/dropdowns';
import { useMoveResponsesMutation } from '@/services/airServices/settings/agent-performance-management/canned-responses';

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
      (item: any) => upsertCannedResponseFormData?.append('id', item?._id),
    );
    const moveResponsesParameter = {
      body: upsertCannedResponseFormData,
    };
    try {
      const response = await moveResponsesTrigger(
        moveResponsesParameter,
      )?.unwrap();
      enqueueSnackbar(response?.message ?? 'Moved Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      closeMoveFolderModal();
      setSelectedData([]);
      reset();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something went wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
