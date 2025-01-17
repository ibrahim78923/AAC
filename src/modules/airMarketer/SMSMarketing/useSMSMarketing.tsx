import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Theme, useTheme } from '@mui/material';
import { useGetIsPhoneConnectedForSmsMarketingQuery } from '@/services/airMarketer/SmsMarketing';
import { getActiveAccountSession } from '@/utils';
import { AIR_MARKETER } from '@/routesConstants/paths';

const useSMSMarketing = () => {
  const theme = useTheme<Theme>();
  const navigate = useRouter();
  const [tabVal, setTabVal] = useState<number>(0);
  const [isNumberConnected, setIsNumberConnected] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectedChangeDetect, setConnectedChangeDetect] = useState(0);

  const { data: getIsPhoneConnected, isLoading } =
    useGetIsPhoneConnectedForSmsMarketingQuery({});

  const activeAccount = getActiveAccountSession();

  useEffect(() => {
    if (connectedChangeDetect) {
      navigate.push(AIR_MARKETER?.SMS_MARKETING);
    }
  }, [connectedChangeDetect]);

  useEffect(() => {
    if (activeAccount?.twilioNumber) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [activeAccount]);

  return {
    theme,
    tabVal,
    navigate,
    setTabVal,
    isLoading,
    isConnected,
    setIsConnected,
    isNumberConnected,
    getIsPhoneConnected,
    setIsNumberConnected,
    setConnectedChangeDetect,
  };
};

export default useSMSMarketing;
