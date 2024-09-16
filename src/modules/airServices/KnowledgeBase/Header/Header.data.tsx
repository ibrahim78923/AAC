import { SingleDropdownButtonCloseMenuI } from '@/components/SingleDropdownButton/SingleDropdownButton.interface';
import { AIR_SERVICES } from '@/constants';
import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { NextRouter } from 'next/router';
import { UpsertFolder } from '../Folder/UpsertFolder';
import { MoveFolder } from '../Folder/MoveFolder';
import FilterArticles from '../Articles/FilterArticles';
import { DeleteArticles } from '../Articles/DeleteArticles';
import { DeleteFolder } from '../Folder/DeleteFolder';

export const KNOWLEDGE_BASE_ACTIONS_CONSTANT = {
  ADD_FOLDER: 'add-folder',
  EDIT_FOLDER: 'edit-folder',
  MOVE_FOLDER: 'move-folder',
  FILTER_ARTICLES: 'filter-articles',
  DELETE_ARTICLES: 'delete-articles',
  DELETE_FOLDER: 'delete-folder',
};

export const createNewKnowledgeBaseDropdownOptionsDynamic = (
  setAction?: any,
  router?: NextRouter,
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
      setAction(KNOWLEDGE_BASE_ACTIONS_CONSTANT?.ADD_FOLDER);
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
