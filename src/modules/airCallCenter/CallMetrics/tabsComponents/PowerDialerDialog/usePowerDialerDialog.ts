import { successSnackbar } from '@/utils/api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const usePowerDialerDialog = (props: any) => {
  const { powerDialerModal, setPowerDialerModal } = props;
  const [openTransferCallModal, setOpenTransferCallModal] = useState(false);
  const [search, setSearch] = useState('');
  const [startRecording, setStartRecording] = useState(false);
  const [pauseCall, setPauseCall] = useState(false);
  const [micOn, setMicOn] = useState(false);

  const method: any = useForm({
    defaultValues: {
      notes: '',
    },
  });

  const onSubmit = async () => {
    successSnackbar('Submitted successfully');
  };

  // Add any additional custom hooks or functions here

  return {
    openTransferCallModal,
    setOpenTransferCallModal,
    search,
    setSearch,
    startRecording,
    setStartRecording,
    pauseCall,
    setPauseCall,
    micOn,
    setMicOn,
    method,
    onSubmit,
    powerDialerModal,
    setPowerDialerModal,
  };
};
