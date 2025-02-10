import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { usePostInstallationMutation } from '@/services/airServices/assets/software/single-software-detail/installations';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';
import { AddDevicesPropsI } from '../Installations.interface';

export const useAddDevice = (props: AddDevicesPropsI) => {
  const { setIsPortalOpen } = props;
  const router = useRouter();
  const softwareId = router?.query?.softwareId;

  const useFormValues = {
    validationSchema: Yup?.object()?.shape({
      device: Yup?.mixed()?.required('Device is required'),
    }),
    defaultValues: { device: null },
  };

  const { reset, methods, handleSubmit } = useFormLib(useFormValues);

  const [postDeviceTrigger, { isLoading }] = usePostInstallationMutation();

  const handleCloseModal = () => {
    reset();
    setIsPortalOpen({ isOpen: false, action: '' });
  };

  const onAddDeviceSubmit = async (data: {
    device: {
      _id: string;
      displayName: string;
    };
  }) => {
    const apiDataParameter = {
      body: { id: data?.device?._id, softwareId: [softwareId] },
      id: data?.device?._id,
    };
    try {
      await postDeviceTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Device added successfully');
      handleCloseModal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    methods,
    handleCloseModal,
    onAddDeviceSubmit,
    isLoading,
    handleSubmit,
  };
};
