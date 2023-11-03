import { useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';

export const useKnowledgeBase = () => {
  const router = useRouter();
  const handleKnowledgeBaseDetail = () => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE_DETAIL,
    });
  };
  const handleKnowledgeBase = () => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE,
    });
  };
  return {
    handleKnowledgeBase,
    handleKnowledgeBaseDetail,
  };
};
