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
import {
  usePatchCannedResponseMutation,
  usePostCannedResponsesMutation,
} from '@/services/airServices/settings/agent-performance-management/canned-responses';

export const useCreateNewFolder = (props: any) => {
  const { openCreateNewFolderModal, closeCreateNewFolderModal } = props;
  const method = useForm({
    defaultValues: createNewFolderDefaultValues,
    resolver: yupResolver(createNewFolderSchema),
  });
  const [postCannedResponseTrigger, postCannedResponseStatus] =
    usePostCannedResponsesMutation();
  const [patchCannedResponseTrigger, patchCannedResponseStatus] =
    usePatchCannedResponseMutation();
  const { reset } = method;
  const onSubmit = async (data: any) => {
    const postCannedResponseParameter = {
      body: data,
    };
    if (!!openCreateNewFolderModal?.editData) {
      const responseParameter = {
        body: { ...data, id: openCreateNewFolderModal?.editData?._id },
      };
      submitUpdateCannedResponse(responseParameter);
      return;
    }
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
  const submitUpdateCannedResponse = async (data: any) => {
    try {
      const response = await patchCannedResponseTrigger(data)?.unwrap();
      enqueueSnackbar(
        response?.message ?? 'Canned Response Updated Successfully!',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
      closeCreateNewFolderModal();
      reset();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message?.[0] ?? 'Something went wrong', {
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
    patchCannedResponseStatus,
  };
};
