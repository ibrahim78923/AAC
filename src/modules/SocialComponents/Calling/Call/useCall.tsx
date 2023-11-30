import { useState } from 'react';

const useCall = () => {
  const [callsMode, setCallsMode] = useState('calls');
  const [activeCallsSelectedData, setActiveCallsSelectedData] = useState();
  const [isActiveCalling, setIsActiveCalling] = useState();

  const [activeMessageData, setActiveMessageData] = useState();
  const [isActiveMessage, setIsActiveMessage] = useState();

  return {
    callsMode,
    setCallsMode,
    activeCallsSelectedData,
    setActiveCallsSelectedData,
    isActiveCalling,
    setIsActiveCalling,
    activeMessageData,
    setActiveMessageData,
    isActiveMessage,
    setIsActiveMessage,
  };
};

export default useCall;
