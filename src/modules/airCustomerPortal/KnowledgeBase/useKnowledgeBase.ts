import { useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';

export const useKnowledgeBase = () => {
  const router = useRouter();
  const handleTickets = () => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE_DETAIL,
    });
  };
  return {
    handleTickets,
  };
};
