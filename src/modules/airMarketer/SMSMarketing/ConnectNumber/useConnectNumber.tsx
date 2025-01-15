import { useState } from 'react';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useTheme } from '@mui/material';
import { useConnectPhoneNumberForSmsMarketingMutation } from '@/services/airMarketer/SmsMarketing';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { getActiveAccountSession, setActiveAccountSession } from '@/utils';
import useSMSMarketing from '../useSMSMarketing';

const phoneUtil = PhoneNumberUtil.getInstance();
const isValid = (phone: string) => {
  try {
    return phoneUtil?.isValidNumber(phoneUtil?.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const useConnectNumber = () => {
  const { setConnectedChangeDetect } = useSMSMarketing();

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

  const activeAccount = getActiveAccountSession();
  const handelUpdatedAccountSession = ({ id, phoneValue }: any) => {
    setActiveAccountSession({
      ...activeAccount,
      configurationId: id,
      ...(phoneValue && { twilioNumber: phoneValue }),
    });
  };

  const handleAddRegNumSubmit = async (phoneValue: any, config: any) => {
    try {
      await connectPhoneNumber({
        body: { twilioNumber: phoneValue, configurationId: config },
      })?.unwrap();
      setOpenDialogRegNumber(false);
      enqueueSnackbar('Phone number Connected Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      handelUpdatedAccountSession({ id: config, phoneValue });
      setConnectedChangeDetect((prev: any) => prev + 1);
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
