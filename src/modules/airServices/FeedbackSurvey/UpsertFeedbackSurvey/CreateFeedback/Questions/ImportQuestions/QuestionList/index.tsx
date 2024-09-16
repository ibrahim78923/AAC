import { Box, Button, Checkbox, Grid, Typography } from '@mui/material';
import { useQuestionList } from './useQuestionList';
import { createElement } from 'react';
import { FEEDBACK_SURVEY_RESPONSE_QUESTION } from './QuestionList.data';
import { FEEDBACK_SURVEY_QUESTION_TYPE } from '@/constants/strings';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import NoData from '@/components/NoData';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { QuestionListI } from './QuestionList.interface';
import { FeedbackSurveySectionI } from '@/types/modules/AirServices/FeedbackSurvey';

export const QuestionList: React.FC<QuestionListI> = (props) => {
  const {
    surveyData,
    handleMoveBack,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    handleCheckboxClick,
    handleInsert,
    questionsData,
    isQuestionSelected,
  } = useQuestionList(props);
  if (isError) return <ApiErrorState />;
  if (isLoading || isFetching) return <SkeletonTable />;
  return (
    <>
      {isSuccess &&
      surveyData?.find((item: FeedbackSurveySectionI) => !item?._id) ? (
        <NoData message="No question found" />
      ) : (
        surveyData?.map((section: FeedbackSurveySectionI, index: number) => {
          return (
            <Box key={section?._id}>
              <Box>
                <Typography color="primary" variant="h4">
                  {index + 1}. {section?.heading}
                </Typography>
                {section?.description && (
                  <Typography color="common.steel_blue_alpha" variant="body2">
                    {section?.description}
                  </Typography>
                )}
              </Box>
              {section?.questions?.map((question: any) => {
                const componentProps: any = {};
                if (
                  question?.questionType === FEEDBACK_SURVEY_QUESTION_TYPE?.TEXT
                ) {
                  componentProps.variant = 'body2';
                  componentProps.color = 'grey.500';
                } else if (
                  question?.questionType ===
                  FEEDBACK_SURVEY_QUESTION_TYPE?.SHORT_ANSWERS
                ) {
                  componentProps.name = question?._id;
                  componentProps.rows = 3;
                  componentProps.multiline = true;
                  componentProps.disabled = true;
                  componentProps.placeholder = 'Your Answer';
                } else {
                  componentProps.name = question?._id;
                  componentProps.options = question?.options?.map(
                    (option: any) => ({
                      value: option?.text,
                      label: option?.text,
                    }),
                  );
                  componentProps.disabled = true;
                }
                return (
                  <Grid container alignItems="center" key={question?._id}>
                    <Grid
                      item
                      md={0.6}
                      xs={12}
                      mt={{ md: 'none', xs: 1 }}
                      textAlign="center"
                    >
                      <Checkbox
                        icon={<CheckboxIcon />}
                        checkedIcon={<CheckboxCheckedIcon />}
                        onChange={(e) => handleCheckboxClick(e, question)}
                      />
                    </Grid>
                    <Grid
                      item
                      md={11.3}
                      xs={12}
                      sx={(theme) => ({
                        border: `1px solid ${
                          isQuestionSelected(question)
                            ? theme?.palette?.primary?.main
                            : theme?.palette?.custom?.off_white_three
                        }`,
                        p: 1,
                        my: { md: 1 },
                        borderRadius: 2,
                      })}
                    >
                      <Typography variant="h6" mb={1}>
                        {question?.questionTitle}
                      </Typography>
                      <>
                        {FEEDBACK_SURVEY_RESPONSE_QUESTION?.[
                          question?.questionType
                        ] &&
                          createElement(
                            FEEDBACK_SURVEY_RESPONSE_QUESTION?.[
                              question?.questionType
                            ],
                            { ...componentProps },
                            question?.description,
                          )}
                      </>
                    </Grid>
                  </Grid>
                );
              })}
            </Box>
          );
        })
      )}
      <br />
      <Box display="flex" justifyContent="end" gap={1}>
        <Button
          variant="outlined"
          color="secondary"
          className="small"
          onClick={handleMoveBack}
        >
          Back
        </Button>
        <Button
          variant="contained"
          className="small"
          onClick={handleInsert}
          disabled={!!!questionsData?.length}
        >
          Insert
        </Button>
      </Box>
    </>
  );
};
