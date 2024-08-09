import { useEffect, useState } from 'react';
import { useGetIsPhoneConnectedQuery } from '@/services/airMarketer/whatsapp-marketing';
import { useTheme } from '@mui/material';

const useWhatsAppMarketing = () => {
  const theme = useTheme();
  const [tabVal, setTabVal] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isMainLayoutSwitch, setIsMainLayoutSwitch] = useState(true);
  const [templateType, setTemplateType] = useState('');

  const handelSwitch = (children: any) => {
    setIsMainLayoutSwitch(children);
  };

  const { data: getIsPhoneConnected, isLoading } = useGetIsPhoneConnectedQuery(
    {},
  );

  useEffect(() => {
    if (getIsPhoneConnected?.data?.phoneNumber) {
      setIsConnected(true);
    }
  }, [getIsPhoneConnected]);

  return {
    tabVal,
    setTabVal,
    theme,
    setIsMainLayoutSwitch,
    isMainLayoutSwitch,
    setTemplateType,
    setIsConnected,
    templateType,
    handelSwitch,
    isConnected,
    isLoading,
    getIsPhoneConnected,
  };
};

export default useWhatsAppMarketing;
