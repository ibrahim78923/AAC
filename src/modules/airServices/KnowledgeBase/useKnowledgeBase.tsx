import { useState } from 'react';
import {
  createNewKnowledgeBaseDropdownOptionsDynamic,
  knowledgeBaseTabsDataDynamic,
} from './KnowledgeBase.data';
import { NextRouter, useRouter } from 'next/router';
import {
  ArticlesIsPortalOpenI,
  ChildComponentPropsI,
} from './KnowledgeBase.interface';
import { PermissionTabsArrayI } from '@/components/Tabs/PermissionsTabs/PermissionsTabs.interface';
import { SingleDropdownOptionI } from '@/components/SingleDropdownButton/SingleDropdownButton.interface';

export const useKnowledgeBase = () => {
  const [isPortalOpen, setIsPortalOpen] = useState<ArticlesIsPortalOpenI>({});
  const router: NextRouter = useRouter();

  const createNewKnowledgeBaseDropdownOptions: SingleDropdownOptionI[] =
    createNewKnowledgeBaseDropdownOptionsDynamic?.(setIsPortalOpen, router);

  const childComponentProps: ChildComponentPropsI = {
    isPortalOpen,
    setIsPortalOpen,
  };

  const knowledgeBaseTabsData: PermissionTabsArrayI[] =
    knowledgeBaseTabsDataDynamic?.(childComponentProps);

  return {
    isPortalOpen,
    setIsPortalOpen,
    createNewKnowledgeBaseDropdownOptions,
    knowledgeBaseTabsData,
  };
};
