import { useState } from 'react';

const useWhatsAppMarketing = () => {
  const [isNumberConnected, setIsNumberConnected] = useState<boolean>(true);

  return {
    isNumberConnected,
    setIsNumberConnected,
  };
};

export default useWhatsAppMarketing;
