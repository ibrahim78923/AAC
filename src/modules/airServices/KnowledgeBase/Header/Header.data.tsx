import { SingleDropdownButtonCloseMenuI } from '@/components/Buttons/SingleDropdownButton/SingleDropdownButton.interface';
import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { KNOWLEDGE_BASE_ACTIONS_CONSTANT } from '@/constants/portal-actions';
import dynamic from 'next/dynamic';
import LazyLoadingFlow from '@/components/LazyLoadingFlow';

const UpsertFolder = dynamic(() => import('../Folder/UpsertFolder'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="upsert folder"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});

const MoveFolder = dynamic(() => import('../Folder/MoveFolder'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="move folder"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});

const FilterArticles = dynamic(() => import('../Articles/FilterArticles'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="filter articles"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});

const DeleteArticles = dynamic(() => import('../Articles/DeleteArticles'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="delete articles"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});

const DeleteFolder = dynamic(() => import('../Folder/DeleteFolder'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="delete folder"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});

const { CREATE_ARTICLE, CREATE_FOLDER } =
  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS ?? {};

export const createNewKnowledgeBaseDropdownOptionsDynamic = (
  openUpsertFolderPortal: any,
  moveToUpsertArticle: () => void,
) => [
  {
    id: 1,
    title: 'Article',
    permissionKey: [CREATE_ARTICLE],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      moveToUpsertArticle();
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'Folder',
    permissionKey: [CREATE_FOLDER],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      openUpsertFolderPortal();
      closeMenu();
    },
  },
];

export const renderPortalComponent = {
  [KNOWLEDGE_BASE_ACTIONS_CONSTANT?.ADD_FOLDER]: <UpsertFolder />,
  [KNOWLEDGE_BASE_ACTIONS_CONSTANT?.EDIT_FOLDER]: <UpsertFolder />,
  [KNOWLEDGE_BASE_ACTIONS_CONSTANT?.MOVE_FOLDER]: <MoveFolder />,
  [KNOWLEDGE_BASE_ACTIONS_CONSTANT?.FILTER_ARTICLES]: <FilterArticles />,
  [KNOWLEDGE_BASE_ACTIONS_CONSTANT?.DELETE_ARTICLES]: <DeleteArticles />,
  [KNOWLEDGE_BASE_ACTIONS_CONSTANT?.DELETE_FOLDER]: <DeleteFolder />,
};
