import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { useUpsertSurveyResponse } from './useUpsertSurveyResponse';
import NoData from '@/components/NoData';
import { Box, Button, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { createElement } from 'react';
import { FEEDBACK_SURVEY_RESPONSE_QUESTION } from './UpsertSurveyResponse.data';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import {
  ARRAY_INDEX,
  FEEDBACK_STATUS,
  GENERIC_UPSERT_FORM_CONSTANT,
} from '@/constants/strings';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FeedbackSurveySectionI } from '@/types/modules/AirServices/FeedbackSurvey';

export const UpsertSurveyResponse: React.FC<{
  loggedInUser?: string;
  goBack?: () => void;
}> = (props) => {
  const { loggedInUser, goBack } = props;
  const {
    handleSubmit,
    submitSurveyResponse,
    methods,
    action,
    lazyGetSingleSurveyForResponseStatus,
    patchSingleSurveyDropoutAnswerForResponseStatus,
    patchSingleSurveyQuestionsAnswerForResponseStatus,
    submitSurveyResponseDropout,
  } = useUpsertSurveyResponse(props);

  if (
    lazyGetSingleSurveyForResponseStatus?.isLoading ||
    lazyGetSingleSurveyForResponseStatus?.isFetching
  )
    return <SkeletonForm />;
  if (lazyGetSingleSurveyForResponseStatus?.isError) return <ApiErrorState />;
  if (
    lazyGetSingleSurveyForResponseStatus?.data?.data[ARRAY_INDEX?.ZERO]
      ?.status !== FEEDBACK_STATUS?.PUBLISHED
  )
    return <NoData message="No survey found" />;

  if (patchSingleSurveyQuestionsAnswerForResponseStatus?.isSuccess)
    return (
      <NoData
        image=""
        message={`Thank you for completing the survey! Your responses have been successfully submitted. We appreciate your time and valuable feedback`}
      >
        {!!loggedInUser ? (
          <Button
            variant="contained"
            color="primary"
            className="small"
            onClick={() => goBack?.()}
          >
            {' '}
            Go To Home
          </Button>
        ) : (
          <></>
        )}
      </NoData>
    );

  if (patchSingleSurveyDropoutAnswerForResponseStatus?.isSuccess)
    return (
      <NoData
        height="100vh"
        message={`Survey cancellation successful. If you change your mind, you're welcome to complete it later. Thank you!`}
      />
    );

  return (
    <Box px={4} py={6}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(submitSurveyResponse)}
      >
        <Box>
          <PageTitledHeader
            title={
              lazyGetSingleSurveyForResponseStatus?.data?.data[
                ARRAY_INDEX?.ZERO
              ]?.surveyTitle
            }
          />
        </Box>
        {!!!loggedInUser ? (
          <Grid container>
            <Grid item xs={12} md={6}>
              <RHFTextField
                name="email"
                size="small"
                label="Enter Your Email"
                required
              />
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
        {lazyGetSingleSurveyForResponseStatus?.data?.data[ARRAY_INDEX?.ZERO]
          ?.sections?.length ? (
          lazyGetSingleSurveyForResponseStatus?.data?.data[
            ARRAY_INDEX?.ZERO
          ]?.sections?.map((item: FeedbackSurveySectionI) => (
            <>
              <Typography color="primary" variant="h4">
                {' '}
                {item?.heading}
              </Typography>
              {item?.questions?.length ? (
                item?.questions?.map((item: any) => (
                  <Box
                    key={item?._id}
                    border="1px solid"
                    borderColor="custom.off_white_three"
                    p={2}
                    my={2}
                    borderRadius={2}
                  >
                    <Typography variant="h6" mb={1}>
                      {item?.questionTitle}

                      {item?.isRequired && (
                        <Typography color={'error.main'} component="span">
                          {' '}
                          *
                        </Typography>
                      )}
                    </Typography>
                    <>
                      {FEEDBACK_SURVEY_RESPONSE_QUESTION?.[
                        item?.questionType
                      ] &&
                        createElement(
                          FEEDBACK_SURVEY_RESPONSE_QUESTION?.[
                            item?.questionType
                          ],
                          {
                            options: item?.options?.map((option: any) => ({
                              value: option?.text,
                              label: option?.text,
                            })),
                            name: item?._id,
                            rows: 3,
                            multiline: true,
                            disabled:
                              action === GENERIC_UPSERT_FORM_CONSTANT?.VIEW,
                          },
                          item?.description,
                        )}
                    </>
                  </Box>
                ))
              ) : (
                <NoData
                  image=""
                  height=""
                  message="No questions in this section"
                />
              )}
            </>
          ))
        ) : (
          <NoData message="No survey found" />
        )}
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Box></Box>
          <Box display={'flex'} gap={2} alignItems={'center'}>
            <LoadingButton
              variant="outlined"
              type="button"
              className="small"
              color="secondary"
              loading={
                patchSingleSurveyDropoutAnswerForResponseStatus?.isLoading
              }
              disabled={
                patchSingleSurveyQuestionsAnswerForResponseStatus?.isLoading
              }
              onClick={() => submitSurveyResponseDropout?.()}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              variant="contained"
              type="submit"
              className="small"
              disabled={
                patchSingleSurveyDropoutAnswerForResponseStatus?.isLoading
              }
              loading={
                patchSingleSurveyQuestionsAnswerForResponseStatus?.isLoading
              }
            >
              Save
            </LoadingButton>
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
};
