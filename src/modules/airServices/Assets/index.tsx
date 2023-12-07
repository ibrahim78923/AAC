import { AIR_SERVICES } from '@/constants';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const Assets = () => {
  const router = useRouter();
  useEffect(() => {
    router?.push(AIR_SERVICES?.ASSETS_INVENTORY);
  });
  return <></>;
};
