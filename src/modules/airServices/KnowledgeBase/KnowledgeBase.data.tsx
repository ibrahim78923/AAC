import { AIR_SERVICES } from '@/constants';
import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS } from '@/constants/permission-keys';

export const knowledgeBaseTabsData = [
  'Articles',
  'Approvals',
  'Knowledge Insights',
];
export const createNewKnowledgeBaseDropdownOptionsDynamic = (
  setIsPortalOpen: any,
  router: any,
) => [
  {
    id: 1,
    title: 'Article',
    permissionKey: [
      AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS?.CREATE_ARTICLE,
    ],
    handleClick: (closeMenu: any) => {
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
    handleClick: (closeMenu: any) => {
      setIsPortalOpen({ isOpen: true, isUpsertFolder: true });
      closeMenu();
    },
  },
];
