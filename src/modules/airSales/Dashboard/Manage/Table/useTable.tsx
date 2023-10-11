import { useState } from 'react';

const useTable = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };
  return {
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleCloseDeleteModal,
    handleDelete,
  };
};
export default useTable;
