import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { KNOWLEDGE_BASE_ACTIONS_CONSTANT } from '../../../Header/Header.data';
import {
  setIsPortalOpen,
  setSelectedArticlesList,
} from '@/redux/slices/airServices/knowledge-base/slice';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '@/redux/store';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { AIR_SERVICES } from '@/constants';

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
    <Box display={'flex'} flexDirection={'column'} gap={1}>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.EDIT_ARTICLE,
        ]}
      >
        <LoadingButton
          variant="contained"
          color="primary"
          onClick={handleEditSubmit}
          fullWidth
        >
          Edit
        </LoadingButton>
      </PermissionsGuard>

      <PermissionsGuard
        permissions={[
          AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.DELETE,
        ]}
      >
        <LoadingButton
          variant="text"
          color="error"
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
    </Box>
  );
};
