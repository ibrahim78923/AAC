import { useEffect, useState } from 'react';
import { useGetIsPhoneConnectedQuery } from '@/services/airMarketer/whatsapp-marketing';

const useWhatsAppMarketing = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isMainLayoutSwitch, setIsMainLayoutSwitch] = useState(true);
  const [isCreateTemplate, setIsCreateTemplate] = useState(false);
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
    setIsMainLayoutSwitch,
    setIsCreateTemplate,
    isMainLayoutSwitch,
    isCreateTemplate,
    setTemplateType,
    setIsConnected,
    templateType,
    handelSwitch,
    isConnected,
    isLoading,
  };
};

export default useWhatsAppMarketing;
