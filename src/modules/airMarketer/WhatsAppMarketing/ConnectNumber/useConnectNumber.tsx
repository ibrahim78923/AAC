import { useState } from 'react';
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();
const isValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const useConnectNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const isPhoneValid = isValid(phoneNumber);
  const handlePhoneChange = (phone: any) => {
    setPhoneNumber(phone);
  };

  const [openDialogRegNumber, setOpenDialogRegNumber] = useState(false);
  const [openDialogVerification, setOpenDialogVerification] = useState(false);
  const handleOpenDialogRegNumber = () => {
    setOpenDialogRegNumber(true);
  };
  const handleCloseDialogRegNumber = () => {
    setOpenDialogRegNumber(false);
  };
  const handleAddRegNumSubmit = () => {
    if (!isPhoneValid) {
      return true;
    }
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
    isPhoneValid,
    phoneNumber,
    handlePhoneChange,
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
