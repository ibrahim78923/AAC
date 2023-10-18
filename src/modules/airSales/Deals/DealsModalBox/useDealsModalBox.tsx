import { useState } from 'react';

const useDealsModalBox = () => {
  const [handleOpen, setHandleOpen] = useState(false);

  return {
    handleOpen,
    setHandleOpen,
  };
};
export default useDealsModalBox;
