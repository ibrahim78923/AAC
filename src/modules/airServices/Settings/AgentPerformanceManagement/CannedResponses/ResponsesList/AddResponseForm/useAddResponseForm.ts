import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  addResponseDefaultValues,
  addResponseValidationSchema,
} from './AddResponseForm.data';
import { CANNED_RESPONSES } from '@/constants/strings';
import {
  usePatchResponseMutation,
  usePostResponseMutation,
} from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { useSearchParams } from 'next/navigation';
import { getSession } from '@/utils';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { IErrorResponse } from '@/types/shared/ErrorResponse';

export const useAddResponseForm = (props: any) => {
  const { open, setDrawerOpen, folderName, selectedData, setSelectedData } =
    props;
  const searchParams = useSearchParams();
  const cannedResponseId: any = searchParams.get('id');
  const editableObj = selectedData?.[0];
  const [postResponseTrigger, postResponseStatus] = usePostResponseMutation();
  const [patchResponseTrigger, patchResponseStatus] =
    usePatchResponseMutation();
  const [openSelectAgentsModal, setOpenSelectAgentsModal] = useState(false);
  const [hasAttachment, setHasAttachment] = useState(false);
  const [agents, setAgents] = useState<any>([]);
  const methodsAddResponseForm = useForm<any>({
    resolver: yupResolver(addResponseValidationSchema),
    defaultValues: addResponseDefaultValues(folderName),
  });
  const { handleSubmit, watch, reset, setValue } = methodsAddResponseForm;
  const availableForChanged = watch(CANNED_RESPONSES?.AVAILABLE_FOR);
  const closeDrawer = () => {
    setDrawerOpen(false);
    setAgents([]);
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
      if (!!!agents?.length) {
        errorSnackbar('Please select Agents');
        return;
      }
      upsertResponseFormData?.append(
        'agents',
        agents?.map((agent: any) => agent?._id),
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
    setAgents(editableObj?.agentDetails);
  }, [open]);
  return {
    methodsAddResponseForm,
    handleSubmit,
    submitAddResponse,
    agents,
    setAgents,
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
