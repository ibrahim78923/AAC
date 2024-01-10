import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  knowledgeBaseTicketEditorData,
  relatedTicketDataArray,
} from './KnowledgeBaseTicketDetail.data';
import { useKnowledgeBaseTicketDetail } from './useKnowledgeBaseTicketDetail';
import { DocumentTextIcon } from '@/assets/icons';
import { LoadingButton } from '@mui/lab';
import { FormProvider } from '@/components/ReactHookForm';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const KnowledgeBaseTicketDetail = () => {
  const {
    theme,
    handlePageBack,
    showFeedbackField,
    setShowFeedbackField,
    feedbackDataArray,
    feedbackSubmit,
    feedbackMethod,
    showOkFeedback,
    setShowOkFeedback,
  } = useKnowledgeBaseTicketDetail();
  return (
    <>
      <Grid container spacing={1} justifyContent={'space-between'}>
        <Grid item xs={12} lg={8.9}>
          <Box
            display="inline-flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2.5}
            gap={1.4}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ cursor: 'pointer' }}
            >
              <ArrowBackIcon onClick={handlePageBack} />
            </Box>
            <Typography variant="h3" color={theme?.palette?.slateBlue?.main}>
              Profiting in Bear and Bull Markets
            </Typography>
          </Box>
          <Box
            dangerouslySetInnerHTML={{ __html: knowledgeBaseTicketEditorData }}
          ></Box>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            borderLeft={{
              lg: `.1rem solid ${theme?.palette?.grey?.[700]}`,
              xs: null,
            }}
            borderTop={{
              lg: null,
              xs: `.1rem solid ${theme?.palette?.grey?.[700]}`,
            }}
            height={'100%'}
            pl={{ lg: 2, xs: 0 }}
          >
            <Grid container flexDirection={'column'} spacing={1.5} mt={1}>
              {!showOkFeedback && !showFeedbackField && (
                <Typography color="secondary" variant="body2">
                  Was this answer helpful??
                </Typography>
              )}
              <Grid item>
                <Typography variant="h4">Related Tickets</Typography>
                <Box
                  height={showFeedbackField ? '14rem' : '33rem'}
                  overflow={'scroll'}
                >
                  {relatedTicketDataArray?.map((item: any) => (
                    <Box
                      display={'flex'}
                      justifyContent={'flex-start'}
                      alignItems={'center'}
                      p={1}
                      borderRadius={1}
                      bgcolor={theme?.palette?.grey?.[100]}
                      mt={0.5}
                      key={item?.id}
                    >
                      <DocumentTextIcon />
                      <Typography color="secondary">
                        {item?.ticketDescription}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              {showFeedbackField ? (
                <Box display={'flex'} flexDirection={'column'} gap={1} p={1}>
                  <Typography color="secondary" variant="body2">
                    Sorry we cannot be helpful. Help us improve this article
                    with your feedback.
                  </Typography>
                  <Typography variant="h6">
                    Your Feedback{' '}
                    <Box component="span" color="red">
                      *
                    </Box>
                  </Typography>
                  <Box>
                    <FormProvider
                      methods={feedbackMethod}
                      onSubmit={feedbackSubmit}
                    >
                      <Grid container>
                        {feedbackDataArray?.map((item: any) => (
                          <Grid item key={item?.id} xs={12}>
                            <item.component {...item?.componentProps} />
                          </Grid>
                        ))}
                      </Grid>
                      <Box
                        display={'flex'}
                        justifyContent={'flex-end'}
                        gap={1}
                        mt={1}
                      >
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => setShowFeedbackField(false)}
                        >
                          Cancel
                        </Button>
                        <LoadingButton variant="contained" type="submit">
                          Submit
                        </LoadingButton>
                      </Box>
                    </FormProvider>
                  </Box>
                </Box>
              ) : (
                <>
                  {!showOkFeedback && (
                    <Typography
                      color="secondary"
                      variant="body2"
                      display={'flex'}
                      justifyContent={'center'}
                    >
                      Was this answer helpful??
                    </Typography>
                  )}
                </>
              )}
              {showOkFeedback && (
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  gap={0.5}
                >
                  <CheckCircleIcon sx={{ color: 'success.main' }} />
                  <Typography color="secondary" variant="body2">
                    Thanks for the feedback. We will improve this article.
                  </Typography>
                </Box>
              )}
              <Divider sx={{ mt: 2 }} />
              {!showOkFeedback && !showFeedbackField && (
                <Grid item display={'flex'} justifyContent={'flex-end'} gap={1}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setShowFeedbackField(true)}
                  >
                    No
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setShowOkFeedback(true)}
                  >
                    Yes
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
