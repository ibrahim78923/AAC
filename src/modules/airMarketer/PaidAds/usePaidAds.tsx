import { useState } from 'react';

const usePaidAds = () => {
  //states
  const [isFilterDrawer, setIsFilterDrawer] = useState(false);
  //functions

  return {
    isFilterDrawer,
    setIsFilterDrawer,
    //functions
  };
};

export default usePaidAds;
