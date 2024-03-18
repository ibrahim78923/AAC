import { useRouter } from 'next/router';
import {
  usePostSoftwareMutation,
  useLazyGetUserDropdownQuery,
  useEditSoftwareMutation,
} from '@/services/airServices/assets/software';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  upsertSoftwareFormDefaultValues,
  upsertSoftwareFormValidationSchema,
} from './UpsertSoftware.data';
import { useEffect } from 'react';

export const useUpsertSoftware = (props: any) => {
  const { setIsAddDrawerOpen, data, isLoading, isFetching } = props;
  const router = useRouter();
  const { softwareId } = router?.query;

  const [postSoftwareTrigger, postSoftwareStatus] = usePostSoftwareMutation();

  const [editSoftwareTrigger, editSoftwareStatus] = useEditSoftwareMutation();

  const methods = useForm({
    resolver: yupResolver(upsertSoftwareFormValidationSchema),
    defaultValues: upsertSoftwareFormDefaultValues(),
  });
  const { handleSubmit, reset } = methods;
  const submitUpsertSoftware = async (formData: any) => {
    const modifiedData = {
      name: formData?.name,
      status: formData?.status,
      type: formData?.type,
      details: {
        description: formData?.description,
        category: formData?.category,
        publisher: formData?.publisher,
        managedBy: formData?.managedBy?._id,
      },
    };
    if (!!softwareId) {
      updateSoftware?.(modifiedData);
      return;
    }
    try {
      const response: any = await postSoftwareTrigger(modifiedData);
      successSnackbar(
        response?.data?.message ?? 'Software Created Successfully',
      );
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const updateSoftware = async (formData: any) => {
    const editSoftwareParams = {
      id: softwareId,
      body: formData,
    };
    try {
      const response: any = await editSoftwareTrigger(editSoftwareParams);
      successSnackbar(
        response?.data?.message ?? 'Software Updated Successfully',
      );
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  useEffect(() => {
    reset(() => upsertSoftwareFormDefaultValues(data));
  }, [reset, data]);

  const onClose = () => {
    setIsAddDrawerOpen(false);
    reset();
  };

  const userQuery = useLazyGetUserDropdownQuery();

  return {
    onClose,
    methods,
    handleSubmit,
    postSoftwareStatus,
    userQuery,
    softwareId,
    isLoading,
    isFetching,
    editSoftwareStatus,
    submitUpsertSoftware,
  };
};
