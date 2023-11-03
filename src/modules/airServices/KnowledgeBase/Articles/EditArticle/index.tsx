import { v4 as uuidv4 } from 'uuid';
import { Box, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider } from '@/components/ReactHookForm';
import CustomDropZone from '@/components/CustomDropZone';
import CustomTextEditor from '@/components/CustomTextEditor';
import { ArrowLeftIcon } from '@/assets/icons';
import {
  editArticleFieldsFunction,
  articleEditorData,
} from './EditArticle.data';
import { useEditArticle } from './useEditArticle';
import { styles } from './EditArticle.style';

export const EditArticle = () => {
  const {
    editArticleMethods: methods,
    editArticleSubmit,
    handlePageBack,
    needApprovals,
    theme,
  } = useEditArticle();
  const {
    flexBetween,
    mainHeading,
    mainWrapper,
    formGridWrapper,
    formBtnWrapper,
  } = styles(theme);
  const newArticleFields = editArticleFieldsFunction?.(needApprovals);

  return (
    <FormProvider
      methods={methods}
      onSubmit={methods?.handleSubmit?.(editArticleSubmit)}
    >
      <Grid
        container
        rowSpacing={1.4}
        columnSpacing={2.4}
        sx={{ ...mainWrapper }}
      >
        <Grid item xs={12} lg={9} pr={2.4}>
          <Box
            sx={{
              ...flexBetween,
              display: 'inline-flex',
              mb: 2.5,
              gap: 1.4,
            }}
          >
            <Box
              onClick={handlePageBack}
              sx={{ ...flexBetween, cursor: 'pointer' }}
            >
              <ArrowLeftIcon />
            </Box>
            <Typography variant="h3" sx={mainHeading}>
              Edit article
            </Typography>
          </Box>
          <Box pb={1.4}>
            <CustomTextEditor
              value={articleEditorData}
              onChange={() => {}}
              style={{ height: '65vh' }}
            />
          </Box>
          <CustomDropZone name="file" />
        </Grid>
        <Grid item xs={12} lg={3} position={'relative'} sx={formGridWrapper}>
          {newArticleFields?.map((form: any) => (
            <Grid item xs={12} md={form?.gridLength} key={uuidv4()}>
              <form.component {...form?.componentProps} size="small">
                {form?.componentProps?.select
                  ? form?.componentProps?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))
                  : null}
              </form.component>
            </Grid>
          ))}
          <Grid item width="100%" xs={12} minHeight={44}>
            <Box sx={{ ...formBtnWrapper }}>
              <LoadingButton
                onClick={() => methods?.reset?.()}
                variant="outlined"
              >
                Save
              </LoadingButton>
              <LoadingButton type="submit" variant="contained">
                Publish Now
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
