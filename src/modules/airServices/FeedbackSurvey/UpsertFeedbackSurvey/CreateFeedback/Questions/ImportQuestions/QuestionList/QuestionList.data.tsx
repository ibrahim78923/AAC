import {
  RHFMultiCheckbox,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import { FEEDBACK_SURVEY_QUESTION_TYPE } from '@/constants/strings';

export const FEEDBACK_SURVEY_RESPONSE_QUESTION: any = {
  [FEEDBACK_SURVEY_QUESTION_TYPE?.MULTIPLE_CHOICE]: RHFRadioGroup,
  [FEEDBACK_SURVEY_QUESTION_TYPE?.SHORT_ANSWERS]: RHFTextField,
  [FEEDBACK_SURVEY_QUESTION_TYPE?.LINEAR_SCALE]: RHFRadioGroup,
  [FEEDBACK_SURVEY_QUESTION_TYPE?.CHECK_BOXES]: RHFMultiCheckbox,
  [FEEDBACK_SURVEY_QUESTION_TYPE?.TEXT]: Typography,
};
export const questionTypeValues = [
  {
    label: 'Multiple Choice',
    value: 'multipleChoice',
  },
  {
    label: 'Check Boxes',
    value: 'checkboxes',
  },
  {
    label: 'Short Answers',
    value: 'shortAnswers',
  },
  {
    label: 'Linear Scale',
    value: 'linearScale',
  },
  {
    value: 'text',
  },
];
