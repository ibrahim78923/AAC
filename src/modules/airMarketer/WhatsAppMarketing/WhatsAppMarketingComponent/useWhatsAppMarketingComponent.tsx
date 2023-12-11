import { useState } from 'react';

const useWhatsAppMarketingComponent = () => {
  const [tabVal, setTabVal] = useState<number>(0);

  return {
    tabVal,
    setTabVal,
  };
};

export default useWhatsAppMarketingComponent;
