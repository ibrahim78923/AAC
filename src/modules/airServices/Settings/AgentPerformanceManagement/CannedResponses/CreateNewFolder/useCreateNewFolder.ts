import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createNewFolderDefaultValues,
  createNewFolderSchema,
  upsertFolderDefaultValuesFunction,
} from './CreateNewFolder.data';
import { useEffect } from 'react';
import {
  usePatchCannedResponseMutation,
  usePostCannedResponsesMutation,
} from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { ICannedResponsesProps } from '../CannedResponses.interface';
import { IErrorResponse } from '@/types/shared/ErrorResponse';

export const useCreateNewFolder = (props: ICannedResponsesProps) => {
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
      await postCannedResponseTrigger(postCannedResponseParameter)?.unwrap();
      successSnackbar('Folder Created Successfully!');
      closeCreateNewFolderModal();
      reset();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  const submitUpdateCannedResponse = async (data: any) => {
    try {
      await patchCannedResponseTrigger(data)?.unwrap();
      successSnackbar('Canned Response Updated Successfully!');
      closeCreateNewFolderModal();
      reset();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
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
