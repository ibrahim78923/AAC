import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addDeviceOptions } from './AddDevice.data';

export const useAddDevice = () => {
  const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);
  const [addDeviceOptionsList] = useState(addDeviceOptions);

  const addDeviceMethods: any = useForm({
    defaultValues: { device: '' },
  });

  const onAddDeviceSubmit = () => {
    setIsAddDeviceModalOpen(false);
  };

  const handleAddDevice = () => {
    setIsAddDeviceModalOpen(true);
  };
  return {
    handleAddDevice,
    addDeviceMethods,
    isAddDeviceModalOpen,
    setIsAddDeviceModalOpen,
    onAddDeviceSubmit,
    addDeviceOptionsList,
  };
};
