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
  } = useUpsertArticle();

  if (isLoading || isFetching) return <SkeletonForm />;
  return (
    <FormProvider methods={methods}>
      <Grid
        container
        rowSpacing={1.4}
        columnSpacing={2.4}
        sx={{ borderRadius: '12px' }}
      >
        <Grid item xs={12} lg={9} pr={2.4}>
          <PageTitledHeader
            title={articleId ? 'Edit article' : 'Write an article'}
            canMovedBack
            moveBack={() => {
              router?.push(AIR_SERVICES?.KNOWLEDGE_BASE);
            }}
          />
          <RHFTextField name="title" label="Title" required fullWidth />
          <Box pb={1.4}>
            <RHFEditor name="details" style={{ height: 500 }} required />
          </Box>
          <RHFDropZone name="file" fileType="" />
        </Grid>
        <Grid
          item
          xs={12}
          lg={3}
          position={'relative'}
          sx={{
            borderLeft: `1px solid ${theme?.palette?.custom?.dark}`,
            position: 'relative',
            padding: 2.4,
          }}
        >
          {newArticleFields?.map((form: any) => (
            <Grid item xs={12} md={form?.gridLength} key={form?.id}>
              <form.component {...form?.componentProps} size="small" />
            </Grid>
          ))}
          <Grid item width="100%" xs={12} minHeight={44}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
            >
              <LoadingButton
                variant="outlined"
                type="button"
                disabled={
                  postArticleStatus?.isLoading || patchArticleStatus?.isLoading
                }
              >
                {needApprovals
                  ? 'Cancel'
                  : articleId
                  ? 'Save'
                  : 'Save as Draft'}
              </LoadingButton>
              <LoadingButton
                type="button"
                onClick={methods?.handleSubmit?.(upsertArticleSubmit)}
                loading={
                  postArticleStatus?.isLoading || patchArticleStatus?.isLoading
                }
                variant="contained"
              >
                {needApprovals ? 'Send For Approval' : 'Publish Now'}
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
