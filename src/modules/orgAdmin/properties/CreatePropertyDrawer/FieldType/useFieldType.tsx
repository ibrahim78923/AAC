import { useState } from 'react';

const useFieldType = () => {
  const [isOpenLoadOptionModal, setIsOpenLoadOptionModal] = useState(false);
  const [isOpenOwnOptionsModal, setIsOpenOwnOptionsModal] = useState(false);
  const [isOpenPropertyModal, setIsOpenPropertyModal] = useState(false);

  const handleOpenOwnOptionsModal = () => {
    setIsOpenOwnOptionsModal(true);
    setIsOpenLoadOptionModal(false);
  };

  const handleCancelOwnOptionsModal = () => {
    setIsOpenOwnOptionsModal(false);
    setIsOpenLoadOptionModal(true);
  };

  const handleOpenPropertyModal = () => {
    setIsOpenPropertyModal(true);
    setIsOpenLoadOptionModal(false);
  };

  const handleCancelPropertyModal = () => {
    setIsOpenPropertyModal(false);
    setIsOpenLoadOptionModal(true);
  };

  return {
    isOpenLoadOptionModal,
    setIsOpenLoadOptionModal,
    isOpenOwnOptionsModal,
    setIsOpenOwnOptionsModal,
    isOpenPropertyModal,
    setIsOpenPropertyModal,
    handleOpenPropertyModal,
    handleOpenOwnOptionsModal,
    handleCancelOwnOptionsModal,
    handleCancelPropertyModal,
  };
};

export default useFieldType;
