import { FormProvider } from '@/components/ReactHookForm';
import { Box, Theme, Typography } from '@mui/material';
import { usePostArticleFeedback } from './usePostArticleFeedback';
import { FormGrid } from '@/components/Grids/FormGrid';
import { CustomLoadingButton } from '@/components/Buttons/CustomLoadingButton';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';

export const PostArticleFeedback = (props: any) => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    isLoading,
    articleFeedbackFormFields,
    isHelpful,
    setIsHelpful,
    portalStyles,
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
            <CustomLoadingButton
              primary={false}
              disabled={isLoading}
              onClick={() => setIsHelpful(true)}
              customStyles={(theme: Theme) => ({
                borderColor:
                  portalStyles?.btnSecondary ||
                  customizePortalDefaultValues(theme)?.btnSecondary,
                color:
                  portalStyles?.btnSecondary ||
                  customizePortalDefaultValues(theme)?.btnSecondary,
                '&:hover': {
                  borderColor:
                    portalStyles?.btnSecondary ||
                    customizePortalDefaultValues(theme)?.btnSecondary,
                  color:
                    portalStyles?.btnSecondary ||
                    customizePortalDefaultValues(theme)?.btnSecondary,
                },
              })}
            >
              Cancel
            </CustomLoadingButton>
            <CustomLoadingButton
              loading={isLoading}
              type="submit"
              customStyles={(theme: Theme) => ({
                bgcolor:
                  portalStyles?.btnPrimary ||
                  customizePortalDefaultValues(theme)?.btnPrimary,
                color: 'common.white',
                '&:hover': {
                  bgcolor:
                    portalStyles?.btnPrimary ||
                    customizePortalDefaultValues(theme)?.btnPrimary,
                  color: 'common.white',
                },
              })}
            >
              Submit
            </CustomLoadingButton>
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
        <CustomLoadingButton
          primary={false}
          disabled={isLoading}
          onClick={() => setIsHelpful(false)}
          customStyles={(theme: Theme) => ({
            borderColor:
              portalStyles?.btnSecondary ||
              customizePortalDefaultValues(theme)?.btnSecondary,
            color:
              portalStyles?.btnSecondary ||
              customizePortalDefaultValues(theme)?.btnSecondary,
            '&:hover': {
              borderColor:
                portalStyles?.btnSecondary ||
                customizePortalDefaultValues(theme)?.btnSecondary,
              color:
                portalStyles?.btnSecondary ||
                customizePortalDefaultValues(theme)?.btnSecondary,
            },
          })}
        >
          No
        </CustomLoadingButton>
        <CustomLoadingButton
          loading={isLoading}
          onClick={onSubmit}
          customStyles={(theme: Theme) => ({
            bgcolor:
              portalStyles?.btnPrimary ||
              customizePortalDefaultValues(theme)?.btnPrimary,
            color: 'common.white',
            '&:hover': {
              bgcolor:
                portalStyles?.btnPrimary ||
                customizePortalDefaultValues(theme)?.btnPrimary,
              color: 'common.white',
            },
          })}
        >
          Yes
        </CustomLoadingButton>
      </Box>
    </>
  );
};
