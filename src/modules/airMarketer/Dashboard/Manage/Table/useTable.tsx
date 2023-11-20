import { useState } from 'react';

const useTable = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isGetRowValues, setIsGetRowValues] = useState('');
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
    isChecked,
    setIsChecked,
    isGetRowValues,
    setIsGetRowValues,
  };
};
export default useTable;
