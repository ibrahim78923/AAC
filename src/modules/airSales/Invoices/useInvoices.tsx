import { useState } from 'react';

const useInvoices = () => {
  const [isListView, setIsListView] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return {
    isListView,
    setIsListView,
    isDeleteModal,
    setIsDeleteModal,
    isDrawerOpen,
    setIsDrawerOpen,
  };
};

export default useInvoices;
