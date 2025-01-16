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
import {
  ARTICLE_STATUS,
  GENERIC_UPSERT_FORM_CONSTANT,
} from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS,
  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS,
} from '@/constants/permission-keys';
import { pxToRem } from '@/utils/getFontValue';
import { ArticlesAttachment } from '../ArticlesAttachment';
import { uploadFileMaxSize } from '@/utils/avatarUtils';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { ACCEPT_FILE_EXTENSIONS } from '@/constants/file';

const { ATTACHMENT, CREATE_ARTICLE, SAVE_AS_DRAFT, PUBLISH_NOW } =
  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS ?? {};
const { EDIT_ARTICLE } =
  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS ?? {};
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
    cancelBtnHandler,
    isError,
    refetch,
    moveToHome,
    showLoader,
    apiCallInProgress,
    handleSubmit,
  } = useUpsertArticle();

  return (
    <ApiRequestFlow
      showSkeleton={showLoader}
      hasError={isError}
      refreshApi={refetch}
    >
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
              <RHFDropZone
                name="attachments"
                fullWidth
                label="Attachment"
                fileType={`PNG, JPG and PDF (max ${uploadFileMaxSize} MB)`}
                accept={{
                  'image/png': ACCEPT_FILE_EXTENSIONS?.PNG,
                  'image/jpeg': ACCEPT_FILE_EXTENSIONS?.JPEG,
                  'application/pdf': ACCEPT_FILE_EXTENSIONS?.PDF,
                }}
              />
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
                    disabled={apiCallInProgress}
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
                      handleSubmit?.(upsertArticleSubmit)(PUBLISHED)
                    }
                    fullWidth
                    loading={apiCallInProgress}
                    disabled={showLoader}
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
    </ApiRequestFlow>
  );
};
