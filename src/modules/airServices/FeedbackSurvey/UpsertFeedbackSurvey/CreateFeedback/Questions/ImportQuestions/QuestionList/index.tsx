import { Box, Typography } from '@mui/material';
import { useQuestionList } from './useQuestionList';
import { createElement } from 'react';
import { FEEDBACK_SURVEY_RESPONSE_QUESTION } from './QuestionList.data';
import { FEEDBACK_SURVEY_QUESTION_TYPE } from '@/constants/strings';
import { QuestionListI } from './QuestionList.interface';
import { FeedbackSurveySectionI } from '@/types/modules/AirServices/FeedbackSurvey';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CheckboxField } from '@/components/InputFields/CheckboxField';

export const QuestionList: React.FC<QuestionListI> = (props) => {
  const {
    surveySectionsData,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    handleCheckboxClick,
    isQuestionSelected,
    refetch,
    theme,
  } = useQuestionList(props);
  return (
    <ApiRequestFlow
      showSkeleton={isLoading || isFetching}
      hasError={isError}
      hasNoData={
        isSuccess &&
        surveySectionsData?.find((item: FeedbackSurveySectionI) => !item?._id)
      }
      refreshApi={refetch}
      skeletonType={SKELETON_TYPES?.BARS}
      noDataMessage={'No question found'}
    >
      {surveySectionsData?.map(
        (section: FeedbackSurveySectionI, index: number) => {
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
                  <ContainerGrid
                    spacing={0}
                    customStyles={{ alignItems: 'center' }}
                    key={question?._id}
                  >
                    <CustomGrid md={0.6}>
                      <Box sx={{ textAlign: { xs: ' center', md: 'left' } }}>
                        <CheckboxField
                          onChange={(e) => handleCheckboxClick(e, question)}
                        />
                      </Box>
                    </CustomGrid>
                    <CustomGrid md={11.3}>
                      <Box
                        sx={{
                          border: `1px solid ${
                            isQuestionSelected(question)
                              ? theme?.palette?.primary?.main
                              : theme?.palette?.custom?.off_white_three
                          }`,
                          p: 1,
                          my: { md: 1 },
                          borderRadius: 2,
                        }}
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
                      </Box>
                    </CustomGrid>
                  </ContainerGrid>
                );
              })}
            </Box>
          );
        },
      )}
    </ApiRequestFlow>
  );
};
