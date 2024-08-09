import { useState } from 'react';
import { createNewKnowledgeBaseDropdownOptionsDynamic } from './KnowledgeBase.data';
import { useRouter } from 'next/router';

export const useKnowledgeBase = () => {
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const router = useRouter();

  const createNewKnowledgeBaseDropdownOptions =
    createNewKnowledgeBaseDropdownOptionsDynamic?.(setIsPortalOpen, router);

  return {
    isPortalOpen,
    setIsPortalOpen,
    createNewKnowledgeBaseDropdownOptions,
  };
};
