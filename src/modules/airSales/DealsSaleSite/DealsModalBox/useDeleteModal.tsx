import { useState } from 'react';

const UseDeleteModal = () => {
  const [handleOpen, setHandleOpen] = useState(false);

  return {
    handleOpen,
    setHandleOpen,
  };
};
export default UseDeleteModal;
