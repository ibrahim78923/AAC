import { useEffect, useState } from 'react';
import {
  addResponseDefaultValues,
  addResponseValidationSchema,
} from './AddResponseForm.data';
import { ARRAY_INDEX, CANNED_RESPONSES } from '@/constants/strings';
import {
  usePatchAirServicesSettingsCannedAddResponseMutation,
  usePostAirServicesSettingsCannedAddResponseMutation,
} from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { useSearchParams } from 'next/navigation';
import { getSession } from '@/utils';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { useFormLib } from '@/hooks/useFormLib';

export const useAddResponseForm = (props: any) => {
  const { open, setDrawerOpen, folderName, selectedData, setSelectedData } =
    props;

  const searchParams = useSearchParams();
  const cannedResponseId: any = searchParams.get('id');

  const editableObj = selectedData?.[ARRAY_INDEX?.ZERO];

  const [postResponseTrigger, postResponseStatus] =
    usePostAirServicesSettingsCannedAddResponseMutation();
  const [patchResponseTrigger, patchResponseStatus] =
    usePatchAirServicesSettingsCannedAddResponseMutation();

  const [openSelectAgentsModal, setOpenSelectAgentsModal] = useState(false);
  const [hasAttachment, setHasAttachment] = useState(false);
  const [selectedAgentsList, setSelectedAgentsList] = useState<any>([]);

  const formLibProps = {
    validationSchema: addResponseValidationSchema,
    defaultValues: addResponseDefaultValues(folderName),
  };

  const { handleSubmit, watch, reset, setValue, methods } =
    useFormLib(formLibProps);

  const availableForChanged = watch(CANNED_RESPONSES?.AVAILABLE_FOR);

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedAgentsList([]);
    setSelectedData([]);
    reset();
  };

  const submitAddResponse = async (data: any) => {
    delete data?.folder;
    if (!data?.fileUrl) {
      delete data?.fileUrl;
    }
    const upsertResponseFormData = new FormData();
    Object?.entries?.(data || {})?.forEach(
      ([key, value]: any) => upsertResponseFormData?.append(key, value),
    );
    upsertResponseFormData?.append('folderId', cannedResponseId);
    if (availableForChanged === CANNED_RESPONSES?.SELECT_AGENTS) {
      if (!!!selectedAgentsList?.length) {
        errorSnackbar('Please select Agents');
        return;
      }
      upsertResponseFormData?.append(
        'agents',
        selectedAgentsList?.map((agent: any) => agent?._id),
      );
    }
    if (availableForChanged === CANNED_RESPONSES?.MY_SELF) {
      const { user }: any = getSession();
      upsertResponseFormData?.append('agents', user?._id);
    }
    const responseParameter = {
      body: upsertResponseFormData,
    };
    if (!!editableObj) {
      upsertResponseFormData?.append('id', editableObj?._id);
      submitUpdateResponse(upsertResponseFormData);
      return;
    }

    try {
      await postResponseTrigger(responseParameter)?.unwrap();
      successSnackbar('Response Added Successfully');
      closeDrawer();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  const submitUpdateResponse = async (data: any) => {
    const responseParameter = {
      body: data,
    };
    try {
      await patchResponseTrigger(responseParameter)?.unwrap();
      successSnackbar('Response Updated Successfully!');
      closeDrawer();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  useEffect(() => {
    setOpenSelectAgentsModal(false);
    reset(addResponseDefaultValues(folderName, editableObj));
    setSelectedAgentsList(editableObj?.agentDetails);
  }, [open]);

  return {
    methods,
    handleSubmit,
    submitAddResponse,
    selectedAgentsList,
    setSelectedAgentsList,
    setOpenSelectAgentsModal,
    openSelectAgentsModal,
    open,
    closeDrawer,
    editableObj,
    postResponseStatus,
    patchResponseStatus,
    availableForChanged,
    setValue,
    hasAttachment,
    setHasAttachment,
  };
};
