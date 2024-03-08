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
import { ARTICLE_STATUS } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS,
  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS,
} from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';

export const UpsertArticle = () => {
  const {
    editArticleMethods: methods,
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
  } = useUpsertArticle();

  if (isLoading || isFetching) return <SkeletonForm />;
  return (
    <PermissionsGuard
      permissions={Permissions?.AIR_SERVICES_KNOWLEDGE_BASE_UPSERT_ARTICLE}
    >
      <FormProvider methods={methods}>
        <Grid container sx={{ borderRadius: '12px' }}>
          <Grid item xs={12} lg={9} pr={{ lg: 2.4 }}>
            <PageTitledHeader
              title={articleId ? 'Edit article' : 'Write an article'}
              canMovedBack
              moveBack={() => {
                router?.push(AIR_SERVICES?.KNOWLEDGE_BASE);
              }}
            />
            <RHFTextField name="title" label="Title" required fullWidth />
            <Box pb={1.4}>
              <RHFEditor
                name="details"
                label="Description"
                style={{ height: 500 }}
                required
              />
            </Box>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS?.ATTACHMENT,
              ]}
            >
              <RHFDropZone
                name="attachments"
                fileType="PNG or JPG  (max 2.44 MB)"
                maxSize={1024 * 1024 * 2.44}
                accept={{
                  'image/*': ['.png', '.jpg'],
                }}
              />
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
                    onClick={() =>
                      cancelBtnHandler(
                        needApprovals ? '' : ARTICLE_STATUS?.DRAFT,
                      )
                    }
                  >
                    {needApprovals
                      ? 'Cancel'
                      : articleId
                      ? 'Save'
                      : 'Save as Draft'}
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
                    loading={
                      postArticleStatus?.isLoading ||
                      patchArticleStatus?.isLoading
                    }
                    variant="contained"
                  >
                    {needApprovals ? 'Send For Approval' : 'Publish Now'}
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
