import { Box, Grid, Typography } from '@mui/material';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { feedbackCards, feedbackComponent } from './FeedbackSurvey.data';
import { useFeedbackSurvey } from './useFeedbackSurvey';

export const FeedbackSurvey = () => {
  const { activeComponent, setActiveComponent, theme } = useFeedbackSurvey();
  return (
    <>
      <PageTitledHeader title="Feedback Survey" />
      <Box
        border={`1px solid ${theme?.palette?.grey?.[700]}`}
        borderRadius={4}
        p={2}
      >
        <Grid container spacing={4}>
          {feedbackCards?.map((item: any) => (
            <Grid item sm={6} xs={12} key={item?.id}>
              <Box
                p={2}
                borderRadius={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                gap={1}
                sx={{
                  cursor: 'pointer',
                  bgcolor:
                    activeComponent === item?.id
                      ? theme?.palette?.primary?.lighter
                      : 'none',
                  border:
                    activeComponent === item?.id
                      ? `1px solid ${theme?.palette?.primary?.main}`
                      : `1px solid ${theme?.palette?.grey[700]}}`,
                }}
                onClick={() => setActiveComponent(item?.id)}
              >
                <item.avatar />
                <Typography variant="body2" fontWeight={600}>
                  {item?.title}
                </Typography>
                <Typography
                  variant="body3"
                  color={theme?.palette?.custom?.main}
                  maxWidth={300}
                >
                  {item?.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <br />
      {feedbackComponent?.[activeComponent]}
    </>
  );
};
