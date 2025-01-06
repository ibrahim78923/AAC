import { useState } from 'react';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useTheme } from '@mui/material';
import { useConnectPhoneNumberForSmsMarketingMutation } from '@/services/airMarketer/SmsMarketing';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const phoneUtil = PhoneNumberUtil.getInstance();
const isValid = (phone: string) => {
  try {
    return phoneUtil?.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const useConnectNumber = (setIsConnected: any) => {
  const theme = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const isPhoneValid = isValid(phoneNumber);
  const handlePhoneChange = (phone: any) => {
    setPhoneNumber(phone);
  };

  const [openDialogRegNumber, setOpenDialogRegNumber] = useState(false);
  const [configValue, setConfigValue] = useState('');

  const [connectPhoneNumber, { isLoading: connectNumberLoading }] =
    useConnectPhoneNumberForSmsMarketingMutation();

  const handleOpenDialogRegNumber = () => {
    setOpenDialogRegNumber(true);
  };

  const handleCloseDialogRegNumber = () => {
    setOpenDialogRegNumber(false);
  };

  const handleAddRegNumSubmit = async (phoneValue: any, config: any) => {
    try {
      await connectPhoneNumber({
        body: { phoneNumber: phoneValue, configurationId: config },
      })?.unwrap();
      setIsConnected(true);
      setOpenDialogRegNumber(false);
      enqueueSnackbar('Phone number Connected Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    theme,
    phoneNumber,
    isPhoneValid,
    handlePhoneChange,
    openDialogRegNumber,
    connectNumberLoading,
    handleAddRegNumSubmit,
    handleOpenDialogRegNumber,
    handleCloseDialogRegNumber,
    setPhoneNumber,
    setConfigValue,
    configValue,
  };
};

export default useConnectNumber;
