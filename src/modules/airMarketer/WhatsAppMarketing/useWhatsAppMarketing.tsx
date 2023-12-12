import { useState } from 'react';

const useWhatsAppMarketing = () => {
  const [isNumberConnected, setIsNumberConnected] = useState<boolean>(false);

  return {
    isNumberConnected,
    setIsNumberConnected,
  };
};

export default useWhatsAppMarketing;
