import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  addResponseDefaultValues,
  addResponseValidationSchema,
} from './AddResponseForm.data';
import { enqueueSnackbar } from 'notistack';
import { CANNED_RESPONSES, NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  usePatchResponseMutation,
  usePostResponseMutation,
} from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { useSearchParams } from 'next/navigation';

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
  const [agents, setAgents] = useState<any>([]);
  const methodsAddResponseForm = useForm<any>({
    resolver: yupResolver(addResponseValidationSchema),
    defaultValues: addResponseDefaultValues(folderName),
  });
  const { handleSubmit, watch, reset } = methodsAddResponseForm;
  const availableForChanged = watch(CANNED_RESPONSES?.AVAILABLE_FOR);
  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedData([]);
    reset();
  };
  const submitAddResponse = async (data: any) => {
    delete data?.folder;
    const upsertResponseFormData = new FormData();
    Object?.entries?.(data || {})?.forEach(
      ([key, value]: any) => upsertResponseFormData?.append(key, value),
    );
    upsertResponseFormData?.append('folderId', cannedResponseId);
    const responseParameter = {
      body: upsertResponseFormData,
    };
    if (!!editableObj) {
      upsertResponseFormData?.append('id', editableObj?._id);
      submitUpdateResponse(upsertResponseFormData);
      return;
    }

    try {
      const response = await postResponseTrigger(responseParameter)?.unwrap();
      enqueueSnackbar(
        response?.data?.message ?? 'Response Added Successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
      closeDrawer();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const submitUpdateResponse = async (data: any) => {
    const responseParameter = {
      body: data,
    };
    try {
      const response = await patchResponseTrigger(responseParameter)?.unwrap();
      enqueueSnackbar(
        response?.data?.message ?? 'Response Updated Successfully!',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
      closeDrawer();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  useEffect(() => {
    if (
      watch(CANNED_RESPONSES?.AVAILABLE_FOR) === CANNED_RESPONSES?.SELECT_AGENTS
    ) {
      setOpenSelectAgentsModal(true);
    }
  }, [availableForChanged]);
  useEffect(() => {
    reset(addResponseDefaultValues(folderName, editableObj));
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
  };
};
