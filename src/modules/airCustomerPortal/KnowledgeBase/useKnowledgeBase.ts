import { useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';

export const useKnowledgeBase = () => {
  const router = useRouter();
  const handleKnowledgeBaseDetail = (id: any) => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE_DETAIL,
      query: { id },
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
