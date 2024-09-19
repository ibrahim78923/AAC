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
import { AIR_SERVICES } from '@/constants';
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

export const UpsertArticle = () => {
  const {
    methods,
    upsertArticleSubmit,
    needApprovals,
    theme,
    newArticleFields,
    articleId,
    router,
    postArticleStatus,
    patchArticleStatus,
    isLoading,
    isFetching,
    cancelBtnHandler,
    isError,
    refetch,
  } = useUpsertArticle();

  if (isLoading || isFetching) return <SkeletonForm />;

  if (isError) return <ApiErrorState canRefresh refresh={refetch} />;

  return (
    <PermissionsGuard
      permissions={Permissions?.AIR_SERVICES_KNOWLEDGE_BASE_UPSERT_ARTICLE}
    >
      <FormProvider methods={methods}>
        <Grid container sx={{ borderRadius: '12px' }} spacing={1}>
          <Grid item xs={12} lg={9} pr={{ lg: 2.4 }}>
            <PageTitledHeader
              title={`${
                articleId
                  ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
                  : GENERIC_UPSERT_FORM_CONSTANT?.WRITE
              }
              an article`}
              canMovedBack
              moveBack={() => {
                router?.push(AIR_SERVICES?.KNOWLEDGE_BASE);
              }}
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
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS?.ATTACHMENT,
              ]}
            >
              <RHFDropZone name="attachments" fullWidth />
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
                      ? [
                          AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS?.CREATE_ARTICLE,
                        ]
                      : articleId
                        ? [
                            AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.EDIT_ARTICLE,
                          ]
                        : [
                            AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS?.SAVE_AS_DRAFT,
                          ]
                  }
                >
                  <LoadingButton
                    variant="outlined"
                    type="button"
                    disabled={
                      postArticleStatus?.isLoading ||
                      patchArticleStatus?.isLoading
                    }
                    fullWidth
                    onClick={() =>
                      cancelBtnHandler(
                        needApprovals ? '' : ARTICLE_STATUS?.DRAFT,
                      )
                    }
                  >
                    {needApprovals
                      ? GENERIC_UPSERT_FORM_CONSTANT?.CANCEL
                      : articleId
                        ? GENERIC_UPSERT_FORM_CONSTANT?.SAVE
                        : GENERIC_UPSERT_FORM_CONSTANT?.SAVE_AS_DRAFT}
                  </LoadingButton>
                </PermissionsGuard>
                <PermissionsGuard
                  permissions={
                    needApprovals
                      ? [
                          AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS?.CREATE_ARTICLE,
                        ]
                      : [
                          AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS?.PUBLISH_NOW,
                        ]
                  }
                >
                  <LoadingButton
                    type="button"
                    onClick={() =>
                      methods?.handleSubmit?.(upsertArticleSubmit)(
                        ARTICLE_STATUS?.PUBLISHED,
                      )
                    }
                    fullWidth
                    loading={
                      postArticleStatus?.isLoading ||
                      patchArticleStatus?.isLoading
                    }
                    variant="contained"
                  >
                    {needApprovals
                      ? GENERIC_UPSERT_FORM_CONSTANT?.SEND_FOR_APPROVAL
                      : GENERIC_UPSERT_FORM_CONSTANT?.PUBLISH_NOW}
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
