import { useState } from 'react';
import { useInstallationI } from './Installation.interface';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { addDeviceOptions } from './Installations.data';

export const useInstallation = (): useInstallationI => {
  const [activeCheck, setActiveCheck] = useState<any>([]);
  const [exportPop, setExportPop] = useState<HTMLButtonElement | null>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);
  const [addDeviceOptionsList] = useState(addDeviceOptions);

  const addDeviceMethods: any = useForm({
    defaultValues: { device: '' },
  });

  const onAddDeviceSubmit = (data: any) => {
    alert(data);
    setIsAddDeviceModalOpen(false);
  };

  const handleAddDevice = () => {
    setIsAddDeviceModalOpen(true);
  };

  const handleExportClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setExportPop(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportPop(null);
  };

  const openExport = Boolean(exportPop);
  const handleMenuExport = () => {
    enqueueSnackbar('File export successfully', {
      variant: 'success',
    });
    setExportPop(null);
  };

  const submitDeleteModel = async () => {
    enqueueSnackbar('Device Removed Successfully', {
      variant: 'success',
    });
    setDeleteModal(false);
  };

  return {
    activeCheck,
    setActiveCheck,
    exportPop,
    setExportPop,
    handleExportClick,
    handleExportClose,
    openExport,
    handleMenuExport,
    deleteModal,
    setDeleteModal,
    submitDeleteModel,
    isAddDeviceModalOpen,
    setIsAddDeviceModalOpen,
    addDeviceMethods,
    handleAddDevice,
    onAddDeviceSubmit,
    addDeviceOptionsList,
  };
};
