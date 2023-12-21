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
import { usePostCannedResponsesMutation } from '@/services/airServices/settings/agent-performance-management/canned-responses';

export const useCreateNewFolder = (props: any) => {
  const { openCreateNewFolderModal, closeCreateNewFolderModal } = props;
  const method = useForm({
    defaultValues: createNewFolderDefaultValues,
    resolver: yupResolver(createNewFolderSchema),
  });
  const [postCannedResponseTrigger, postCannedResponseStatus] =
    usePostCannedResponsesMutation();
  const { reset } = method;
  const onSubmit = async (data: any) => {
    const upsertCannedResponseFormData = new FormData();
    Object?.entries?.(data || {})?.forEach(
      ([key, value]: any) => upsertCannedResponseFormData?.append(key, value),
    );
    const postCannedResponseParameter = {
      body: data,
    };
    try {
      const response = await postCannedResponseTrigger(
        postCannedResponseParameter,
      )?.unwrap();
      enqueueSnackbar(response?.message ?? 'Folder Created Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      closeCreateNewFolderModal();
      reset();
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
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
    postCannedResponseStatus,
  };
};
