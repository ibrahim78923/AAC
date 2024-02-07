import { Box, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFEditor } from '@/components/ReactHookForm';
import CustomDropZone from '@/components/CustomDropZone';
import { ArrowLeftIcon } from '@/assets/icons';
import { useUpsertArticle } from './useUpsertArticle';

export const UpsertArticle = () => {
  const {
    editArticleMethods: methods,
    editArticleSubmit,
    handlePageBack,
    needApprovals,
    theme,
    newArticleFields,
  } = useUpsertArticle();

  return (
    <FormProvider
      methods={methods}
      onSubmit={methods?.handleSubmit?.(editArticleSubmit)}
    >
      <Grid
        container
        rowSpacing={1.4}
        columnSpacing={2.4}
        sx={{ borderRadius: '12px' }}
      >
        <Grid item xs={12} lg={9} pr={2.4}>
          <Box
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              display: 'inline-flex',
              mb: 2.5,
              gap: 1.4,
            }}
          >
            <Box
              onClick={handlePageBack}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <ArrowLeftIcon />
            </Box>
            <Typography variant="h3" color="slateBlue.main">
              Edit article
            </Typography>
          </Box>
          <Box pb={1.4}>
            <RHFEditor name="details" style={{ minHeight: 500 }} />
          </Box>
          <CustomDropZone name="file" />
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
                onClick={() => methods?.reset?.()}
                variant="outlined"
              >
                Save
              </LoadingButton>
              <LoadingButton type="submit" variant="contained">
                {needApprovals ? 'Send For Approval' : 'Publish Now'}
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
