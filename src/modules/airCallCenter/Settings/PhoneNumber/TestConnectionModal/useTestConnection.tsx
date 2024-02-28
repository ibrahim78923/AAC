import { useState } from 'react';
import { useForm } from 'react-hook-form';

const useTestConnection = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlay, setIsPlay] = useState(false);

  const methods: any = useForm();

  return {
    isRecording,
    setIsRecording,
    isPlay,
    setIsPlay,
    methods,
  };
};

export default useTestConnection;
