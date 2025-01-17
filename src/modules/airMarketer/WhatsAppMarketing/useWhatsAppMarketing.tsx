import { useEffect, useState } from 'react';
import { useGetIsPhoneConnectedQuery } from '@/services/airMarketer/whatsapp-marketing';
import { useTheme } from '@mui/material';
import { getActiveAccountSession } from '@/utils';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { useRouter } from 'next/router';

const useWhatsAppMarketing = () => {
  const theme = useTheme();
  const navigate = useRouter();
  const [tabVal, setTabVal] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isMainLayoutSwitch, setIsMainLayoutSwitch] = useState(true);
  const [templateType, setTemplateType] = useState('');
  const [connectedChangeDetect, setConnectedChangeDetect] = useState(0);

  const handelSwitch = (children: any) => {
    setIsMainLayoutSwitch(children);
  };

  const { data: getIsPhoneConnected, isLoading } = useGetIsPhoneConnectedQuery(
    {},
    { skip: true },
  );

  const activeAccount = getActiveAccountSession();

  useEffect(() => {
    if (connectedChangeDetect) {
      navigate.push(AIR_MARKETER?.WHATSAPP_MARKETING);
    }
  }, [connectedChangeDetect]);

  useEffect(() => {
    if (activeAccount?.twilioWhatsappNumber) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [activeAccount]);

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
    setConnectedChangeDetect,
  };
};

export default useWhatsAppMarketing;
