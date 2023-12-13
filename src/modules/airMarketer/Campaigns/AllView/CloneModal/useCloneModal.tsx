import { useState } from 'react';

const useCloneModal = () => {
  const [isOpenSavedView, setIsOpenSavedView] = useState(false);
  return {
    isOpenSavedView,
    setIsOpenSavedView,
  };
};
export default useCloneModal;
