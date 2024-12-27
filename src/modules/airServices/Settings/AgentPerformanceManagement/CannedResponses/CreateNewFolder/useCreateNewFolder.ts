import {
  createNewFolderSchema,
  upsertFolderDefaultValuesFunction,
} from './CreateNewFolder.data';
import { useEffect } from 'react';
import {
  usePatchAirServicesSettingsCannedResponseMutation,
  usePostAirServicesSettingsCannedResponsesMutation,
} from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { ICannedResponsesProps } from '../CannedResponses.interface';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { useFormLib } from '@/hooks/useFormLib';

export const useCreateNewFolder = (props: ICannedResponsesProps) => {
  const { openCreateNewFolderModal, closeCreateNewFolderModal } = props;

  const formLibProps = {
    validationSchema: createNewFolderSchema,
    defaultValues: upsertFolderDefaultValuesFunction(
      openCreateNewFolderModal?.editData,
    ),
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const [postCannedResponseTrigger, postCannedResponseStatus] =
    usePostAirServicesSettingsCannedResponsesMutation();

  const [patchCannedResponseTrigger, patchCannedResponseStatus] =
    usePatchAirServicesSettingsCannedResponseMutation();

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
    methods,
    onSubmit,
    handleSubmit,
    openCreateNewFolderModal,
    closeCreateNewFolderModal,
    postCannedResponseStatus,
    patchCannedResponseStatus,
  };
};
