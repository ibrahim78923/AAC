import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Theme, useTheme } from '@mui/material';
import { useGetIsPhoneConnectedQuery } from '@/services/airMarketer/SmsMarketing';

const useSMSMarketing = () => {
  const theme = useTheme<Theme>();
  const navigate = useRouter();
  const [tabVal, setTabVal] = useState<number>(0);
  const [isNumberConnected, setIsNumberConnected] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const { data: getIsPhoneConnected, isLoading } = useGetIsPhoneConnectedQuery(
    {},
  );

  useEffect(() => {
    if (getIsPhoneConnected?.data?.phoneNumber) {
      setIsConnected(true);
    }
  }, [getIsPhoneConnected]);

  return {
    theme,
    tabVal,
    navigate,
    setTabVal,
    isLoading,
    isConnected,
    setIsConnected,
    isNumberConnected,
    setIsNumberConnected,
  };
};

export default useSMSMarketing;
