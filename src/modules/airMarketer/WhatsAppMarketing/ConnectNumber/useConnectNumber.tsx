import { useState } from 'react';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useConnectPhoneNumberMutation } from '@/services/airMarketer/whatsapp-marketing';

const phoneUtil = PhoneNumberUtil.getInstance();
const isValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const useConnectNumber = ({ setIsConnected }: any) => {
  const [openDialogRegNumber, setOpenDialogRegNumber] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const isPhoneValid = isValid(phoneNumber);
  const handlePhoneChange = (phone: any) => {
    setPhoneNumber(phone);
  };

  const [connectPhoneNumber, { isLoading: connectNumberLoading }] =
    useConnectPhoneNumberMutation();

  const handleOpenDialogRegNumber = () => {
    setOpenDialogRegNumber(true);
  };
  const handleCloseDialogRegNumber = () => {
    setOpenDialogRegNumber(false);
  };
  const handleAddRegNumSubmit = async () => {
    if (isPhoneValid) {
      try {
        await connectPhoneNumber({
          body: { phoneNumber: phoneNumber },
        })?.unwrap();
        setIsConnected(true);
        setPhoneNumber('');
        setOpenDialogRegNumber(false);
        enqueueSnackbar('Phone number Connected Successfully', {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
      } catch (error: any) {
        const errMsg = error?.message;
        const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
        enqueueSnackbar(errMessage ?? 'Error occurred', {
          variant: NOTISTACK_VARIANTS?.ERROR,
        });
      }
    }
  };

  return {
    isPhoneValid,
    phoneNumber,
    handlePhoneChange,
    openDialogRegNumber,
    handleOpenDialogRegNumber,
    handleCloseDialogRegNumber,
    handleAddRegNumSubmit,
    connectNumberLoading,
  };
};

export default useConnectNumber;
