import { SingleDropdownButtonCloseMenuI } from '@/components/Buttons/SingleDropdownButton/SingleDropdownButton.interface';
import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { NextRouter } from 'next/router';
import { UpsertFolder } from '../Folder/UpsertFolder';
import { MoveFolder } from '../Folder/MoveFolder';
import FilterArticles from '../Articles/FilterArticles';
import { DeleteArticles } from '../Articles/DeleteArticles';
import { DeleteFolder } from '../Folder/DeleteFolder';
import { KNOWLEDGE_BASE_ACTIONS_CONSTANT } from '@/constants/portal-actions';
import { AIR_SERVICES } from '@/constants/routes';

const {
  ADD_FOLDER,
  EDIT_FOLDER,
  MOVE_FOLDER,
  FILTER_ARTICLES,
  DELETE_ARTICLES,
  DELETE_FOLDER,
} = KNOWLEDGE_BASE_ACTIONS_CONSTANT ?? {};

const { UPSERT_ARTICLE } = AIR_SERVICES ?? {};
const { CREATE_ARTICLE, CREATE_FOLDER } =
  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS ?? {};

export const createNewKnowledgeBaseDropdownOptionsDynamic = (
  setAction?: any,
  router?: NextRouter,
) => [
  {
    id: 1,
    title: 'Article',
    permissionKey: [CREATE_ARTICLE],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      router?.push(UPSERT_ARTICLE);
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'Folder',
    permissionKey: [CREATE_FOLDER],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setAction(ADD_FOLDER);
      closeMenu();
    },
  },
];

export const renderPortalComponent = {
  [ADD_FOLDER]: <UpsertFolder />,
  [EDIT_FOLDER]: <UpsertFolder />,
  [MOVE_FOLDER]: <MoveFolder />,
  [FILTER_ARTICLES]: <FilterArticles />,
  [DELETE_ARTICLES]: <DeleteArticles />,
  [DELETE_FOLDER]: <DeleteFolder />,
};
