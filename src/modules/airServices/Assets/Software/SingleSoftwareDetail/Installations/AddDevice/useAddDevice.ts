import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  usePostInstallationMutation,
  useLazyGetAssetsDropdownQuery,
} from '@/services/airServices/assets/software/single-software-detail/installations';

export const useAddDevice = () => {
  const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);
  const addDeviceMethods = useForm<any>({
    defaultValues: { device: null },
    resolver: yupResolver(
      Yup?.object()?.shape({
        device: Yup?.mixed()?.required('Required'),
      }),
    ),
  });
  const searchParams = useRouter();
  const softwareId = searchParams?.query?.softwareId;
  const [postDeviceTrigger, { isLoading }] = usePostInstallationMutation();
  const onAddDeviceSubmit = async (data: any) => {
    const formData = {
      body: { softwareId: softwareId },
      id: data?.device?._id,
    };
    try {
      const response: any = await postDeviceTrigger(formData);
      enqueueSnackbar(response?.data?.message && 'Device Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      addDeviceMethods?.reset();
      setIsAddDeviceModalOpen(false);
    } catch (error: any) {
      enqueueSnackbar(error?.error?.data?.message ?? 'An error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const handleAddDevice = () => {
    setIsAddDeviceModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsAddDeviceModalOpen(false);
    addDeviceMethods?.reset();
  };
  const devicesQuery = useLazyGetAssetsDropdownQuery();
  return {
    handleAddDevice,
    addDeviceMethods,
    isAddDeviceModalOpen,
    handleCloseModal,
    onAddDeviceSubmit,
    devicesQuery,
    isLoading,
  };
};
