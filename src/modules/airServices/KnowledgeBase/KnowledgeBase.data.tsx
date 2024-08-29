import { AIR_SERVICES } from '@/constants';
import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';
import { Articles } from './Articles';
import { Approvals } from './Approvals';
import { KnowledgeInsights } from './KnowledgeInsights';
import { NextRouter } from 'next/router';
import {
  ArticlesIsPortalOpenI,
  ChildComponentPropsI,
} from './KnowledgeBase.interface';
import { Dispatch, SetStateAction } from 'react';
import { SingleDropdownButtonCloseMenuI } from '@/components/SingleDropdownButton/SingleDropdownButton.interface';

export const createNewKnowledgeBaseDropdownOptionsDynamic = (
  setIsPortalOpen: Dispatch<SetStateAction<ArticlesIsPortalOpenI>>,
  router: NextRouter,
) => [
  {
    id: 1,
    title: 'Article',
    permissionKey: [
      AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS?.CREATE_ARTICLE,
    ],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      router?.push(AIR_SERVICES?.UPSERT_ARTICLE);
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'Folder',
    permissionKey: [
      AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS?.CREATE_FOLDER,
    ],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setIsPortalOpen({ isOpen: true, isUpsertFolder: true });
      closeMenu();
    },
  },
];

export const knowledgeBaseTabsDataDynamic = (props: ChildComponentPropsI) => {
  return [
    {
      _id: 1,
      name: 'Articles',
      id: 'articles',
      tabPermissions: Permissions?.AIR_SERVICES_KNOWLEDGE_BASE_TABS,
      component: Articles,
      componentProps: { ...props },
    },
    {
      _id: 2,
      name: 'Approvals',
      id: 'approvals',
      tabPermissions: Permissions?.AIR_SERVICES_KNOWLEDGE_BASE_TABS,
      component: Approvals,
      componentProps: {},
    },
    {
      _id: 3,
      name: 'Knowledge Insights',
      id: 'knowledge_insights',
      tabPermissions: Permissions?.AIR_SERVICES_KNOWLEDGE_BASE_TABS,
      component: KnowledgeInsights,
      componentProps: {},
    },
  ];
};
