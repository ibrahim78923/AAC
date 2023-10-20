import { useRouter } from 'next/router';
import { useState } from 'react';

const useSingleInventoryDetail = () => {
  const { push } = useRouter();

  // inventory action
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleActionClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setAnchorEl(null);
    setIsDeleteModalOpen(false);
  };

  const handleAction = (action: string) => {
    if (action === 'edit') {
      push('/air-services/assets/inventory/add-inventory?type=update');
      return;
    }
    setIsDeleteModalOpen(true);
    setAnchorEl(null);
  };
  return {
    // inventory action
    anchorEl,
    handleClose,
    handleActionClick,
    handleAction,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleDelete,
  };
};
export default useSingleInventoryDetail;
