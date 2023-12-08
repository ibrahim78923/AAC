import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const Loyalty = () => {
  const router = useRouter();
  useEffect(() => {
    router?.push(AIR_LOYALTY_PROGRAM?.REWARDS);
  });
  return <></>;
};
