import { useState } from 'react';

const useDeleteModal = () => {
  const [handleOpen, setHandleOpen] = useState(false);

  return {
    handleOpen,
    setHandleOpen,
  };
};
export default useDeleteModal;
