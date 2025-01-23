import { Box, Typography } from '@mui/material';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { feedbackCards, feedbackComponent } from './FeedbackSurvey.data';
import { useFeedbackSurvey } from './useFeedbackSurvey';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const FeedbackSurvey = () => {
  const {
    handleClick,
    theme,
    router,
    supportPermissions,
    satisfactionPermissions,
  } = useFeedbackSurvey();
  return (
    <>
      <PageTitledHeader title="Feedback Survey" />
      <Box
        border={`1px solid ${theme?.palette?.grey?.[700]}`}
        borderRadius={4}
        p={2}
      >
        <CustomGrid isContainer spacing={4}>
          {feedbackCards?.map((item) => (
            <PermissionsGuard permissions={item?.permissions} key={item?.id}>
              <CustomGrid
                sm={supportPermissions && satisfactionPermissions ? 6 : 12}
              >
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
                      router?.query?.type === item?.query
                        ? theme?.palette?.primary?.lighter
                        : 'none',
                    border:
                      router?.query?.type === item?.query
                        ? `1px solid ${theme?.palette?.primary?.main}`
                        : `1px solid ${theme?.palette?.grey[700]}}`,
                  }}
                  onClick={() => handleClick(item?.query)}
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
              </CustomGrid>
            </PermissionsGuard>
          ))}
        </CustomGrid>
      </Box>
      <br />
      {feedbackComponent?.[router?.query?.type]}
    </>
  );
};
