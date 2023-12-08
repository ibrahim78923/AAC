import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const GiftCards = () => {
  const router = useRouter();
  useEffect(() => {
    router?.push(AIR_LOYALTY_PROGRAM?.GIFT_CARDS);
  });
  return <></>;
};
