import { useState } from 'react';
import {
  createNewKnowledgeBaseDropdownOptionsDynamic,
  knowledgeBaseTabsDataDynamic,
} from './KnowledgeBase.data';
import { useRouter } from 'next/router';
import { ChildComponentPropsI } from './KnowledgeBase.interface';

export const useKnowledgeBase = () => {
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const router = useRouter();

  const createNewKnowledgeBaseDropdownOptions =
    createNewKnowledgeBaseDropdownOptionsDynamic?.(setIsPortalOpen, router);

  const childComponentProps: ChildComponentPropsI = {
    isPortalOpen,
    setIsPortalOpen,
  };

  const knowledgeBaseTabsData =
    knowledgeBaseTabsDataDynamic?.(childComponentProps);

  return {
    isPortalOpen,
    setIsPortalOpen,
    createNewKnowledgeBaseDropdownOptions,
    knowledgeBaseTabsData,
  };
};
