import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  setIsPortalOpen,
  setSelectedArticlesList,
} from '@/redux/slices/airServices/knowledge-base/slice';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '@/redux/store';
import { useRouter } from 'next/router';
import { KNOWLEDGE_BASE_ACTIONS_CONSTANT } from '@/constants/portal-actions';
import { AIR_SERVICES } from '@/constants/routes';

export const UpdateArticle = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { articleId } = router?.query;

  const handleEditSubmit = () => {
    router?.push({
      pathname: AIR_SERVICES?.UPSERT_ARTICLE,
      query: {
        articleId,
      },
    });
  };

  return (
    <>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.EDIT_ARTICLE,
        ]}
      >
        <LoadingButton
          className="small"
          variant="contained"
          color="primary"
          onClick={handleEditSubmit}
          fullWidth
        >
          Edit
        </LoadingButton>
      </PermissionsGuard>
      <br />
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.DELETE,
        ]}
      >
        <LoadingButton
          className="small"
          variant="text"
          color="error"
          sx={{ my: 1 }}
          onClick={() => {
            dispatch(
              setIsPortalOpen<any>({
                isOpen: true,
                action: KNOWLEDGE_BASE_ACTIONS_CONSTANT?.DELETE_ARTICLES,
              }),
            );
            dispatch(setSelectedArticlesList<any>([{ _id: articleId }]));
          }}
          fullWidth
        >
          Delete
        </LoadingButton>
      </PermissionsGuard>
    </>
  );
};
