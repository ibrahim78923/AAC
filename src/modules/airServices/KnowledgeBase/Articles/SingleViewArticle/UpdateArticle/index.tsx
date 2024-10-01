import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  setIsPortalOpen,
  setSelectedArticlesList,
} from '@/redux/slices/airServices/knowledge-base/slice';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '@/redux/store';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { AIR_SERVICES } from '@/constants';
import { KNOWLEDGE_BASE_ACTIONS_CONSTANT } from '@/constants/portal-actions';

const { DELETE_ARTICLES } = KNOWLEDGE_BASE_ACTIONS_CONSTANT ?? {};
const { UPSERT_ARTICLE } = AIR_SERVICES ?? {};
const { EDIT_ARTICLE, DELETE } =
  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS ?? {};

export const UpdateArticle = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { articleId } = router?.query;

  const handleEditSubmit = () => {
    router?.push({
      pathname: UPSERT_ARTICLE,
      query: {
        articleId,
      },
    });
  };

  return (
    <Box display={'flex'} flexDirection={'column'} gap={1}>
      <PermissionsGuard permissions={[EDIT_ARTICLE]}>
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

      <PermissionsGuard permissions={[DELETE]}>
        <LoadingButton
          className="small"
          variant="text"
          color="error"
          onClick={() => {
            dispatch(
              setIsPortalOpen<any>({
                isOpen: true,
                action: DELETE_ARTICLES,
              }),
            );
            dispatch(setSelectedArticlesList<any>([{ _id: articleId }]));
          }}
          fullWidth
        >
          Delete
        </LoadingButton>
      </PermissionsGuard>
    </Box>
  );
};
