import { useState } from 'react';

export function useHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [actionPop, setActionPop] = useState<HTMLButtonElement | null>(null);

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionPop(event.currentTarget);
  };
  const handleActionClose = () => {
    setActionPop(null);
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  return {
    setIsDrawerOpen,
    isDrawerOpen,
    handleActionClick,
    actionPop,
    setActionPop,
    handleActionClose,
    deleteModalOpen,
    setDeleteModalOpen,
  };
}
