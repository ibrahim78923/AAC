import { Box, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  FormProvider,
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { useUpsertArticle } from './useUpsertArticle';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import {
  ARTICLE_STATUS,
  GENERIC_UPSERT_FORM_CONSTANT,
} from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS,
  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS,
} from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';
import ApiErrorState from '@/components/ApiErrorState';
import { pxToRem } from '@/utils/getFontValue';
import { ArticlesAttachment } from '../ArticlesAttachment';

const { ATTACHMENT, CREATE_ARTICLE, SAVE_AS_DRAFT, PUBLISH_NOW } =
  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS ?? {};
const { EDIT_ARTICLE } =
  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS ?? {};
const { AIR_SERVICES_KNOWLEDGE_BASE_UPSERT_ARTICLE } = Permissions ?? {};
const {
  EDIT,
  WRITE,
  CANCEL,
  SAVE,
  SAVE_AS_DRAFT: DRAFT_SAVE,
  SEND_FOR_APPROVAL,
  PUBLISH_NOW: PUBLISH_NOW_DRAWER,
} = GENERIC_UPSERT_FORM_CONSTANT ?? {};
const { PUBLISHED, DRAFT } = ARTICLE_STATUS ?? {};

export const UpsertArticle = () => {
  const {
    methods,
    upsertArticleSubmit,
    needApprovals,
    theme,
    newArticleFields,
    articleId,
    postArticleStatus,
    patchArticleStatus,
    isLoading,
    isFetching,
    cancelBtnHandler,
    isError,
    refetch,
    moveToHome,
  } = useUpsertArticle();

  if (isLoading || isFetching) return <SkeletonForm />;

  if (isError) return <ApiErrorState canRefresh refresh={refetch} />;

  return (
    <PermissionsGuard permissions={AIR_SERVICES_KNOWLEDGE_BASE_UPSERT_ARTICLE}>
      <FormProvider methods={methods}>
        <Grid container sx={{ borderRadius: '12px' }} spacing={1}>
          <Grid item xs={12} lg={9} pr={{ lg: 2.4 }}>
            <PageTitledHeader
              title={`${articleId ? EDIT : WRITE}
              an article`}
              canMovedBack
              moveBack={moveToHome}
            />
            <RHFTextField
              name="title"
              label="Title"
              required
              fullWidth
              placeholder="Enter the title"
              size="small"
            />
            <Box pb={1.4}>
              <RHFEditor
                name="details"
                label="Description"
                placeholder="Write the description"
                style={{ height: pxToRem(500) }}
                required
              />
            </Box>
            <PermissionsGuard permissions={[ATTACHMENT]}>
              <RHFDropZone name="attachments" fullWidth label="Attachment" />
              <ArticlesAttachment />
            </PermissionsGuard>
            <br />
          </Grid>
          <Grid
            item
            xs={12}
            lg={3}
            minHeight={{ xs: 'inherit', lg: '100vh' }}
            sx={{
              borderLeft: { lg: `1px solid ${theme?.palette?.custom?.dark}` },
              padding: { lg: 2 },
            }}
            display={'flex'}
            flexDirection={'column'}
          >
            <Box>
              {newArticleFields?.map((form: any) => (
                <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                  <form.component {...form?.componentProps} size="small" />
                </Grid>
              ))}
            </Box>
            <Box flexGrow={{ lg: 1 }}></Box>
            <Box>
              <Box
                mt={2}
                sx={{
                  height: { lg: '100%' },
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <PermissionsGuard
                  permissions={
                    needApprovals
                      ? [CREATE_ARTICLE]
                      : articleId
                        ? [EDIT_ARTICLE]
                        : [SAVE_AS_DRAFT]
                  }
                >
                  <LoadingButton
                    className="small"
                    variant="outlined"
                    type="button"
                    disabled={
                      postArticleStatus?.isLoading ||
                      patchArticleStatus?.isLoading
                    }
                    fullWidth
                    onClick={() => cancelBtnHandler(needApprovals ? '' : DRAFT)}
                  >
                    {needApprovals ? CANCEL : articleId ? SAVE : DRAFT_SAVE}
                  </LoadingButton>
                </PermissionsGuard>
                <PermissionsGuard
                  permissions={needApprovals ? [CREATE_ARTICLE] : [PUBLISH_NOW]}
                >
                  <LoadingButton
                    className="small"
                    type="button"
                    onClick={() =>
                      methods?.handleSubmit?.(upsertArticleSubmit)(PUBLISHED)
                    }
                    fullWidth
                    loading={
                      postArticleStatus?.isLoading ||
                      patchArticleStatus?.isLoading
                    }
                    variant="contained"
                  >
                    {needApprovals ? SEND_FOR_APPROVAL : PUBLISH_NOW_DRAWER}
                  </LoadingButton>
                </PermissionsGuard>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
    </PermissionsGuard>
  );
};
