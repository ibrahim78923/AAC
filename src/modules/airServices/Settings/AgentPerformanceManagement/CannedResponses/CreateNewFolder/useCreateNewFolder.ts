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
  const { setIsPortalOpen, isPortalOpen } = props;

  const formLibProps = {
    validationSchema: createNewFolderSchema,
    defaultValues: upsertFolderDefaultValuesFunction(isPortalOpen?.editData),
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const [postCannedResponseTrigger, postCannedResponseStatus] =
    usePostAirServicesSettingsCannedResponsesMutation();

  const [patchCannedResponseTrigger, patchCannedResponseStatus] =
    usePatchAirServicesSettingsCannedResponseMutation();

  const closeModal = () => {
    setIsPortalOpen({ open: false, delete: false, editData: null });
    reset();
  };

  const onSubmit = async (data: any) => {
    const postCannedResponseParameter = {
      body: data,
    };

    if (!!isPortalOpen?.editData) {
      const responseParameter = {
        body: { ...data, id: isPortalOpen?.editData?._id },
      };
      submitUpdateCannedResponse(responseParameter);
      return;
    }

    try {
      await postCannedResponseTrigger(postCannedResponseParameter)?.unwrap();
      successSnackbar('Folder Created Successfully!');
      closeModal?.();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  const submitUpdateCannedResponse = async (data: any) => {
    try {
      await patchCannedResponseTrigger(data)?.unwrap();
      successSnackbar('Canned Response Updated Successfully!');
      closeModal?.();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  useEffect(() => {
    reset(upsertFolderDefaultValuesFunction(isPortalOpen?.editData));
  }, [isPortalOpen]);

  const apiCallInProgress =
    postCannedResponseStatus?.isLoading || patchCannedResponseStatus?.isLoading;

  return {
    methods,
    onSubmit,
    handleSubmit,
    postCannedResponseStatus,
    patchCannedResponseStatus,
    apiCallInProgress,
    closeModal,
  };
};
