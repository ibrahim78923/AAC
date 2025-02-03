import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import { usePostArticleFeedback } from './usePostArticleFeedback';
import { FormGrid } from '@/components/Grids/FormGrid';

export const PostArticleFeedback = (props: any) => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    isLoading,
    articleFeedbackFormFields,
    isHelpful,
    setIsHelpful,
  } = usePostArticleFeedback(props);

  if (!isHelpful)
    return (
      <>
        <Typography color="secondary" variant="body2" mb={1}>
          Sorry we cannot be helpful. Help us improve this article with your
          feedback.
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <FormGrid formFieldsList={articleFeedbackFormFields} />
          <Box
            sx={{
              borderTop: '1px solid',
              borderColor: 'custom.off_white_three',
              display: 'flex',
              gap: 1,
              justifyContent: 'flex-end',
              pt: 2,
            }}
          >
            <LoadingButton
              variant="outlined"
              color="secondary"
              disabled={isLoading}
              onClick={() => setIsHelpful(true)}
              className="small"
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              type="submit"
              className="small"
            >
              Submit
            </LoadingButton>
          </Box>
        </FormProvider>
      </>
    );

  return (
    <>
      <Typography
        color="secondary"
        variant="body2"
        display="flex"
        justifyContent="center"
        mb={3}
      >
        Was this answer helpful?
      </Typography>

      <Box
        sx={{
          borderTop: '1px solid',
          borderColor: 'custom.off_white_three',
          display: 'flex',
          gap: 1,
          justifyContent: 'flex-end',
          pt: 2,
        }}
      >
        <LoadingButton
          variant="outlined"
          color="secondary"
          className="small"
          disabled={isLoading}
          onClick={() => setIsHelpful(false)}
        >
          No
        </LoadingButton>
        <LoadingButton
          variant="contained"
          className="small"
          loading={isLoading}
          onClick={onSubmit}
        >
          Yes
        </LoadingButton>
      </Box>
    </>
  );
};
