import { API_STATUS_CODE } from '@/constants/api';
import {
  useAddLoyaltyProgramSettingsGeneralSettingsMutation,
  useLazyGetLoyaltyProgramSettingsGeneralSettingsQuery,
} from '@/services/airLoyaltyProgram/settings';

export const useGetLoyaltySettings = () => {
  const [
    lazyGetLoyaltyProgramSettingsGeneralSettingsTrigger,
    lazyGetLoyaltyProgramSettingsGeneralSettingsStatus,
  ] = useLazyGetLoyaltyProgramSettingsGeneralSettingsQuery();

  const [
    addLoyaltyProgramSettingsGeneralSettingsTrigger,
    addLoyaltyProgramSettingsGeneralSettingsFirstTimeStatus,
  ] = useAddLoyaltyProgramSettingsGeneralSettingsMutation();

  const getLoyaltySettings = async () => {
    try {
      await lazyGetLoyaltyProgramSettingsGeneralSettingsTrigger({})?.unwrap();
    } catch (error: any) {
      if (error?.data?.statusCode === API_STATUS_CODE?.[404]) {
        await submitLoyalty();
      }
    }
  };

  const submitLoyalty = async () => {
    const body = {
      maxPointLimit: '0',
      exchangeRate: '0',
      giftCardMaxAmount: '0',
    };

    const apiDataParameter = {
      body,
    };
    try {
      await addLoyaltyProgramSettingsGeneralSettingsTrigger?.(
        apiDataParameter,
      )?.unwrap();
      getLoyaltySettings?.();
    } catch (error: any) {}
  };

  return {
    getLoyaltySettings,
    lazyGetLoyaltyProgramSettingsGeneralSettingsStatus,
    addLoyaltyProgramSettingsGeneralSettingsFirstTimeStatus,
  };
};
