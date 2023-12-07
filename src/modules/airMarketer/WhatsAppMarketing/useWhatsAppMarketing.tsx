import { useState } from 'react';

const useWhatsAppMarketing = () => {
  const [tabVal, setTabVal] = useState<number>(0);
  const [isNumberConnected, setIsNumberConnected] = useState<boolean>(false);

  return {
    tabVal,
    setTabVal,
    isNumberConnected,
    setIsNumberConnected,
  };
};

export default useWhatsAppMarketing;
