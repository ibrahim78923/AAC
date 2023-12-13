import { useState } from 'react';

const useBroadcastDetails = () => {
  // Delete Modal
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleOpenDelete = () => {
    setOpenModalDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenModalDelete(false);
  };

  return {
    openModalDelete,
    handleOpenDelete,
    handleCloseDelete,
  };
};

export default useBroadcastDetails;
