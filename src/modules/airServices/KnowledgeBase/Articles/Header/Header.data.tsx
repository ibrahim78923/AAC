import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { KNOWLEDGE_BASE_ACTIONS_CONSTANT } from '@/constants/portal-actions';
import { AIR_SERVICES } from '@/constants/routes';
import { ARRAY_INDEX, SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { errorSnackbar } from '@/lib/snackbar';

const { MOVE_FOLDER, DELETE_ARTICLES } = KNOWLEDGE_BASE_ACTIONS_CONSTANT ?? {};
const {
  EDIT_ARTICLE,
  DELETE,
  MOVE_FOLDER: MOVE_FOLDER_PERMISSION,
} = AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS ?? {};
const { ZERO } = ARRAY_INDEX ?? {};
const { ONE } = SELECTED_ARRAY_LENGTH ?? {};

export const articlesActionDropdownDynamic = (
  setPortalAction: any,
  router?: any,
  selectedArticlesData?: any,
) => {
  return [
    {
      id: 1,
      title: 'Edit',
      permissionKey: [EDIT_ARTICLE],
      handleClick: (closeMenu: any) => {
        if (selectedArticlesData?.length > ONE) {
          errorSnackbar('Please select only one');
          closeMenu?.();
          return;
        }
        router?.push({
          pathname: AIR_SERVICES?.UPSERT_ARTICLE,
          query: { articleId: selectedArticlesData?.[ZERO]?._id },
        });
        closeMenu();
      },
    },
    {
      id: 2,
      title: 'Delete',
      permissionKey: [DELETE],
      handleClick: (closeMenu: any) => {
        setPortalAction(DELETE_ARTICLES);
        closeMenu();
      },
    },
    {
      id: 3,
      title: 'Move Folder',
      permissionKey: [MOVE_FOLDER_PERMISSION],
      handleClick: (closeMenu: any) => {
        if (selectedArticlesData?.length > ONE) {
          errorSnackbar('Please select only one');
          closeMenu?.();
          return;
        }
        if (!!!selectedArticlesData?.[ZERO]?.folder?.name) {
          errorSnackbar('This articles does not have a primary folder');
          closeMenu?.();
          return;
        }
        setPortalAction(MOVE_FOLDER);
        closeMenu();
      },
    },
  ];
};
