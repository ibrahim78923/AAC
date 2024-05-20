import { Box, Typography } from '@mui/material';
import {
  FEEDBACK_SURVEY_QUESTION_TYPE_COMPONENT,
  questionResponsesData,
} from './UserResponsesAnalysis.data';
import { createElement } from 'react';
import NoData from '@/components/NoData';

export const UserResponsesAnalysis = () => {
  return (
    <Box bgcolor={'common.white'} p={1} boxShadow={1} borderRadius={2}>
      {Object?.entries(questionResponsesData ?? {})?.map(
        ([surveyName, surveyQuestions]: any) => (
          <>
            <Typography variant="h4">{surveyName}</Typography>
            <br />
            {!!surveyQuestions?.length ? (
              surveyQuestions?.map((questionResponse: any) => (
                <>
                  {FEEDBACK_SURVEY_QUESTION_TYPE_COMPONENT?.[
                    questionResponse?.type
                  ] &&
                    createElement(
                      FEEDBACK_SURVEY_QUESTION_TYPE_COMPONENT?.[
                        questionResponse?.type
                      ],
                      {
                        question: questionResponse?.question,
                        answers: questionResponse?.answers,
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
        ),
      )}
    </Box>
  );
};
