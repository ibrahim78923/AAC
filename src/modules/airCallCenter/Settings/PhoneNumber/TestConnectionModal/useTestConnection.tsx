import { useState } from 'react';

const useTestConnection = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlay, setIsPlay] = useState(false);

  return {
    isRecording,
    setIsRecording,
    isPlay,
    setIsPlay,
  };
};

export default useTestConnection;
