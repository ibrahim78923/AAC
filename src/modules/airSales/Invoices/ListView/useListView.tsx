import { useState } from 'react';
import { useRouter } from 'next/router';
import { AIR_SALES } from '@/routesConstants/paths';

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
    router.push(AIR_SALES?.SALES_VIEW_INVOICES);
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
