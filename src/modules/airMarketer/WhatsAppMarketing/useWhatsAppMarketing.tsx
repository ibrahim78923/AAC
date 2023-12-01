import { useState } from 'react';

const useWhatsAppMarketing = () => {
  const [tabVal, setTabVal] = useState<number>(0);

  return {
    tabVal,
    setTabVal,
  };
};

export default useWhatsAppMarketing;
