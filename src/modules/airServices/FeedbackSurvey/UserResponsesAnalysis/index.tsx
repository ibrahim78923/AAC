import { Box, Typography } from '@mui/material';
import { FEEDBACK_SURVEY_QUESTION_TYPE_COMPONENT } from './UserResponsesAnalysis.data';
import { createElement } from 'react';
import NoData from '@/components/NoData';
import { FEEDBACK_SURVEY_QUESTION_TYPE } from '@/constants/strings';

export const UserResponsesAnalysis = (props: any) => {
  const { data } = props;
  if (!data?.data?.questionsResponses?.length) return <NoData />;
  return (
    <Box bgcolor={'common.white'} p={1} boxShadow={1} borderRadius={2}>
      {data?.data?.questionsResponses?.map((item: any) => (
        <>
          <Typography variant="h4">{item?.sectionTitle}</Typography>
          <br />
          {!!item?.questions?.length ? (
            item?.questions
              ?.filter(
                (question: any) =>
                  question?.questionType !==
                  FEEDBACK_SURVEY_QUESTION_TYPE?.TEXT,
              )
              ?.map((questionResponse: any) => (
                <>
                  {FEEDBACK_SURVEY_QUESTION_TYPE_COMPONENT?.[
                    questionResponse?.questionType
                  ] &&
                    createElement(
                      FEEDBACK_SURVEY_QUESTION_TYPE_COMPONENT?.[
                        questionResponse?.questionType
                      ],
                      {
                        question: questionResponse?.questionTitle,
                        answers:
                          questionResponse?.questionType ===
                          FEEDBACK_SURVEY_QUESTION_TYPE?.SHORT_ANSWERS
                            ? questionResponse?.allAnswers
                            : questionResponse?.answerPercentages,
                        score: questionResponse?.score,
                      },
                    )}
                  <br />
                </>
              ))
          ) : (
            <NoData message="No Questions found" />
          )}
        </>
      ))}
    </Box>
  );
};
