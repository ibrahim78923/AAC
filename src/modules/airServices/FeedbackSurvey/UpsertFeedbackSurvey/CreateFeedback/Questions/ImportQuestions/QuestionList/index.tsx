import { Box, Button, Checkbox, Grid, Typography } from '@mui/material';
import { useQuestionList } from './useQuestionList';
import { createElement } from 'react';
import { FEEDBACK_SURVEY_RESPONSE_QUESTION } from './QuestionList.data';
import { FEEDBACK_SURVEY_QUESTION_TYPE } from '@/constants/strings';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import NoData from '@/components/NoData';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';

export const QuestionList = (props: any) => {
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
  } = useQuestionList(props);
  if (isError) return <ApiErrorState />;
  if (isLoading || isFetching) return <SkeletonTable />;
  return (
    <>
      {isSuccess && surveyData?.find((item: any) => !item?._id) ? (
        <NoData message="No question found" />
      ) : (
        surveyData?.map((section: any, index: number) => {
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
                    <Grid item xs={0.5}>
                      <Checkbox
                        icon={<CheckboxIcon />}
                        checkedIcon={<CheckboxCheckedIcon />}
                        onChange={(e: any) => handleCheckboxClick(e, question)}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={11.4}
                      border={'1px solid'}
                      borderColor={'custom.off_white_three'}
                      p={1}
                      my={1}
                      borderRadius={2}
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
        <Button variant="outlined" color="secondary" onClick={handleMoveBack}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleInsert}
          disabled={!!!questionsData?.length}
        >
          Insert
        </Button>
      </Box>
    </>
  );
};
