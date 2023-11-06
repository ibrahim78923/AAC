import { useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';

export const useTickets = () => {
  const router = useRouter();
  const handleTickets = () => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.TICKETS,
    });
  };
  const handleSingleTickets = (id: any) => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.SINGLE_TICKETS,
      query: { id },
    });
  };
  return {
    handleTickets,
    handleSingleTickets,
  };
};
