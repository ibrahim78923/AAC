import { Box, Typography } from '@mui/material';
import { usePreviewSurvey } from './usePreviewSurvey';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { createElement } from 'react';
import { FEEDBACK_SURVEY_RESPONSE_QUESTION } from './PreviewSurvey.data';
import { FEEDBACK_SURVEY_QUESTION_TYPE } from '@/constants/strings';
import { FeedbackSurveySectionI } from '@/types/modules/AirServices/FeedbackSurvey';

export const PreviewSurvey: React.FC<{
  data: FeedbackSurveySectionI[];
  setCreateSurvey: React.Dispatch<React.SetStateAction<string>>;
}> = (props) => {
  const { data, handleMoveBack } = usePreviewSurvey(props);
  return (
    <>
      <PageTitledHeader
        title="Feedback Survey-Preview"
        canMovedBack
        moveBack={handleMoveBack}
      />
      {data?.map((section: FeedbackSurveySectionI, index: number) => {
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
                <Box
                  key={question?._id}
                  border={
                    question?.questionType ===
                    FEEDBACK_SURVEY_QUESTION_TYPE?.TEXT
                      ? 'none'
                      : '1px solid'
                  }
                  borderColor={
                    question?.questionType ===
                    FEEDBACK_SURVEY_QUESTION_TYPE?.TEXT
                      ? 'none'
                      : 'custom.off_white_three'
                  }
                  p={
                    question?.questionType ===
                    FEEDBACK_SURVEY_QUESTION_TYPE?.TEXT
                      ? 0.4
                      : 2
                  }
                  my={
                    question?.questionType ===
                    FEEDBACK_SURVEY_QUESTION_TYPE?.TEXT
                      ? 'none'
                      : 2
                  }
                  ml={
                    question?.questionType ===
                    FEEDBACK_SURVEY_QUESTION_TYPE?.TEXT
                      ? 1
                      : 'none'
                  }
                  borderRadius={
                    question?.questionType ===
                    FEEDBACK_SURVEY_QUESTION_TYPE?.TEXT
                      ? 'none'
                      : 2
                  }
                >
                  <Typography
                    variant="h6"
                    mb={
                      question?.questionType ===
                      FEEDBACK_SURVEY_QUESTION_TYPE?.TEXT
                        ? 'none'
                        : 1
                    }
                    color={
                      question?.questionType ===
                      FEEDBACK_SURVEY_QUESTION_TYPE?.TEXT
                        ? 'custom.grayish_blue'
                        : 'none'
                    }
                  >
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
              );
            })}
          </Box>
        );
      })}
    </>
  );
};
