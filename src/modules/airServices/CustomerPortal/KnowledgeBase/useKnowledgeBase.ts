import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';

export const useKnowledgeBase = () => {
  const router = useRouter();
  const handleKnowledgeBase = () => {
    router?.push({
      pathname: AIR_SERVICES?.ADD_ASSOCIATE_ASSET,
    });
  };
  return {
    handleKnowledgeBase,
  };
};
