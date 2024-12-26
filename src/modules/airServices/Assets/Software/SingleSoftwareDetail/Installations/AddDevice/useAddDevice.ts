import { useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import {
  usePostInstallationMutation,
  useLazyGetAssetsDropdownQuery,
} from '@/services/airServices/assets/software/single-software-detail/installations';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';

export const useAddDevice = () => {
  const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] =
    useState<boolean>(false);

  const useFormValues = {
    validationSchema: Yup?.object()?.shape({
      device: Yup?.mixed()?.required('Required'),
    }),
    defaultValues: { device: null },
  };

  const { reset, methods } = useFormLib(useFormValues);

  const searchParams = useRouter();
  const softwareId = searchParams?.query?.softwareId;
  const [postDeviceTrigger, { isLoading }] = usePostInstallationMutation();
  const onAddDeviceSubmit = async (data: {
    device: {
      _id: string;
      displayName: string;
    };
  }) => {
    const formData = {
      body: { id: data?.device?._id, softwareId: [softwareId] },
      id: data?.device?._id,
    };
    try {
      const response: any = await postDeviceTrigger(formData);
      successSnackbar(response?.data?.message && 'Device Added Successfully');
      reset();
      setIsAddDeviceModalOpen(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message ?? 'An error occurred');
    }
  };
  const handleAddDevice = () => {
    setIsAddDeviceModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsAddDeviceModalOpen(false);
    reset();
  };
  const devicesQuery = useLazyGetAssetsDropdownQuery();
  return {
    handleAddDevice,
    methods,
    isAddDeviceModalOpen,
    handleCloseModal,
    onAddDeviceSubmit,
    devicesQuery,
    isLoading,
  };
};
