import { v4 as uuidv4 } from 'uuid';
import { Box, Button, Grid, Typography } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';
import CustomDropZone from '@/components/CustomDropZone';

import { ArrowLeftIcon } from '@/assets/icons';

import { newArticleFieldsFunction } from './UpsertArticle.data';
import { useUpsertArticle } from './useUpsertArticle';
import { styles } from './UpsertArticle.style';
import CustomTextEditor from '@/components/CustomTextEditor';

export const UpsertArticle = () => {
  const {
    upsertArticleMethods: methods,
    upsertArticleSubmit,
    handlePageBack,
    needApprovals,
  } = useUpsertArticle();

  const {
    flexBetween,
    mainHeading,
    mainWrapper,
    formGridWrapper,
    formBtnWrapper,
  } = styles();

  const newArticleFields = newArticleFieldsFunction?.(needApprovals);

  return (
    <FormProvider
      methods={methods}
      onSubmit={methods?.handleSubmit?.(upsertArticleSubmit)}
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
              Write an article
            </Typography>
          </Box>
          <Box pb={1.4}>
            <CustomTextEditor
              value=""
              onChange={() => {}}
              style={{ height: '65vh' }}
              placeholder={`Title for article \n Description`}
            />
          </Box>
          <CustomDropZone name="file" />
        </Grid>
        <Grid
          item
          xs={12}
          lg={3}
          position={'relative'}
          sx={{ ...formGridWrapper }}
        >
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
              <Button onClick={() => methods?.reset?.()} variant="outlined">
                Save as Draft
              </Button>
              <Button type="submit" variant="contained">
                {needApprovals ? 'Send For Approval' : 'Publish Now'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
