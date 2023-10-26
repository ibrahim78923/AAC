import { useState } from 'react';
import { useRouter } from 'next/router';

const useListView = () => {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState(null);
  const [searchBy, setSearchBy] = useState('');
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const handleClose = () => {
    setSelectedValue(null);
  };

  const handleClick = (event: any) => {
    setSelectedValue(event.currentTarget);
  };

  const handleIsViewPage = () => {
    handleClose;
    router.push('/air-sales/invoices/view-invoices');
  };

  const handleDeleteModal = () => {
    handleClose();
    setIsDeleteModal(true);
  };

  return {
    selectedValue,
    searchBy,
    isDeleteModal,
    setSearchBy,
    setSelectedValue,
    setIsDeleteModal,
    handleClose,
    handleClick,
    handleIsViewPage,
    handleDeleteModal,
  };
};

export default useListView;
