import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';

export const useTickets = () => {
  const router = useRouter();
  const handleTickets = () => {
    router?.push({
      pathname: AIR_SERVICES?.ADD_ASSOCIATE_ASSET,
    });
  };
  return {
    handleTickets,
  };
};
