import { Box } from '@mui/material';
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
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomLoadingButton } from '@/components/Buttons/CustomLoadingButton';

const { CREATE_ARTICLE, SAVE_AS_DRAFT, PUBLISH_NOW } =
  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS ?? {};
const { EDIT_ARTICLE } =
  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS ?? {};
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
        <ContainerGrid customStyles={{ borderRadius: '12px' }} spacing={1}>
          <CustomGrid lg={9}>
            <Box sx={{ pr: { lg: 2.4 } }}>
              <PageTitledHeader
                title={`${
                  articleId
                    ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
                    : GENERIC_UPSERT_FORM_CONSTANT?.WRITE
                }
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
              <PermissionsGuard
                permissions={[
                  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS?.ATTACHMENT,
                ]}
              >
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
            </Box>
          </CustomGrid>
          <CustomGrid lg={3}>
            <Box
              sx={{
                borderLeft: { lg: `1px solid ${theme?.palette?.custom?.dark}` },
                padding: { lg: 2 },
                minHeight: { xs: 'inherit', lg: '100vh' },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box>
                {newArticleFields?.map((form: any) => (
                  <CustomGrid md={form?.gridLength} key={form?.id}>
                    <form.component {...form?.componentProps} size="small" />
                  </CustomGrid>
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
                    <CustomLoadingButton
                      variant="outlined"
                      disabled={apiCallInProgress}
                      fullWidth
                      onClick={() =>
                        cancelBtnHandler(needApprovals ? '' : DRAFT)
                      }
                    >
                      {needApprovals
                        ? GENERIC_UPSERT_FORM_CONSTANT?.CANCEL
                        : articleId
                          ? GENERIC_UPSERT_FORM_CONSTANT?.SAVE
                          : GENERIC_UPSERT_FORM_CONSTANT?.DRAFT}
                    </CustomLoadingButton>
                  </PermissionsGuard>
                  <PermissionsGuard
                    permissions={
                      needApprovals ? [CREATE_ARTICLE] : [PUBLISH_NOW]
                    }
                  >
                    <CustomLoadingButton
                      onClick={() =>
                        handleSubmit?.(upsertArticleSubmit)(PUBLISHED)
                      }
                      fullWidth
                      loading={apiCallInProgress}
                      disabled={showLoader}
                    >
                      {needApprovals
                        ? GENERIC_UPSERT_FORM_CONSTANT?.SEND_FOR_APPROVAL
                        : GENERIC_UPSERT_FORM_CONSTANT?.PUBLISH_NOW}
                    </CustomLoadingButton>
                  </PermissionsGuard>
                </Box>
              </Box>
            </Box>
          </CustomGrid>
        </ContainerGrid>
      </FormProvider>
    </ApiRequestFlow>
  );
};
