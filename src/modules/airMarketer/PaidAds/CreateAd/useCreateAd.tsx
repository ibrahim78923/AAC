import { useState } from 'react';

const useCreateAd = () => {
  const [isActiveAd, setIsActiveAd] = useState('engagement-Ad');

  return {
    isActiveAd,
    setIsActiveAd,
  };
};

export default useCreateAd;
