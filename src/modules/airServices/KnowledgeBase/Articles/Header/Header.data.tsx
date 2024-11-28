import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { KNOWLEDGE_BASE_ACTIONS_CONSTANT } from '@/constants/portal-actions';
import { AIR_SERVICES } from '@/constants/routes';
import { ARRAY_INDEX, SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { errorSnackbar } from '@/lib/snackbar';

export const articlesActionDropdownDynamic = (
  setPortalAction: any,
  router?: any,
  selectedArticlesData?: any,
) => {
  return [
    {
      id: 1,
      title: 'Edit',
      permissionKey: [
        AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.EDIT_ARTICLE,
      ],
      disabled: selectedArticlesData?.length > SELECTED_ARRAY_LENGTH?.ONE,
      handleClick: (closeMenu: any) => {
        router?.push({
          pathname: AIR_SERVICES?.UPSERT_ARTICLE,
          query: { articleId: selectedArticlesData?.[ARRAY_INDEX?.ZERO]?._id },
        });
        closeMenu();
      },
    },
    {
      id: 2,
      title: 'Delete',
      permissionKey: [
        AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.DELETE,
      ],
      handleClick: (closeMenu: any) => {
        setPortalAction(KNOWLEDGE_BASE_ACTIONS_CONSTANT?.DELETE_ARTICLES);
        closeMenu();
      },
    },
    {
      id: 3,
      title: 'Move Folder',
      permissionKey: [
        AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.MOVE_FOLDER,
      ],
      disabled: selectedArticlesData?.length > SELECTED_ARRAY_LENGTH?.ONE,
      handleClick: (closeMenu: any) => {
        if (!!!selectedArticlesData?.[ARRAY_INDEX?.ZERO]?.folder?.name) {
          errorSnackbar('This articles does not have a primary folder');
          closeMenu?.();
          return;
        }
        setPortalAction(KNOWLEDGE_BASE_ACTIONS_CONSTANT?.MOVE_FOLDER);
        closeMenu();
      },
    },
  ];
};
