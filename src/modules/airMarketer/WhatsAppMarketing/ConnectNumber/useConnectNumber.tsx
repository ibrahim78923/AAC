import { useState } from 'react';

const useConnectNumber = () => {
  const [openDialogRegNumber, setOpenDialogRegNumber] = useState(false);
  const [openDialogVerification, setOpenDialogVerification] = useState(false);
  const handleOpenDialogRegNumber = () => {
    setOpenDialogRegNumber(true);
  };
  const handleCloseDialogRegNumber = () => {
    setOpenDialogRegNumber(false);
  };
  const handleAddRegNumSubmit = () => {
    setOpenDialogRegNumber(false);
    setOpenDialogVerification(true);
  };

  const handleOpenDialogVerification = () => {
    setOpenDialogVerification(true);
  };
  const handleCloseDialogVerification = () => {
    setOpenDialogVerification(false);
  };
  const handleVerificationSubmit = () => {
    setOpenDialogVerification(false);
  };

  return {
    openDialogRegNumber,
    handleOpenDialogRegNumber,
    handleCloseDialogRegNumber,
    handleAddRegNumSubmit,
    openDialogVerification,
    handleOpenDialogVerification,
    handleCloseDialogVerification,
    handleVerificationSubmit,
  };
};

export default useConnectNumber;
