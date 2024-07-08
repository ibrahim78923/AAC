import {
  RHFMultiCheckbox,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { FEEDBACK_SURVEY_QUESTION_TYPE } from '@/constants/strings';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

export const upsertSurveyResponseValidationSchema = (questionsData: any) => {
  const schema: any = {};
  questionsData?.forEach((question: any, questionId: any) => {
    switch (question?.questionType) {
      case FEEDBACK_SURVEY_QUESTION_TYPE?.MULTIPLE_CHOICE:
        schema[questionId] = question?.isRequired
          ? Yup?.string()?.required('Please select one')
          : Yup?.string();
        break;
      case FEEDBACK_SURVEY_QUESTION_TYPE?.SHORT_ANSWERS:
        schema[questionId] = question?.isRequired
          ? Yup?.string()?.trim()?.required('Answer is required')
          : Yup?.string()?.trim();
        break;
      case FEEDBACK_SURVEY_QUESTION_TYPE?.LINEAR_SCALE:
        schema[questionId] = question?.isRequired
          ? Yup?.string()?.required('Please select one')
          : Yup?.string();
        break;
      case FEEDBACK_SURVEY_QUESTION_TYPE?.CHECK_BOXES:
        schema[questionId] = question?.isRequired
          ? Yup?.array()
              ?.min(1, 'Select at least one option')
              ?.nullable()
              ?.required('Select at least one option')
          : Yup?.array()?.nullable();
        break;
      default:
        schema[questionId] = Yup?.mixed()?.nullable();
        break;
    }
  });
  return Yup?.object()?.shape({
    email: Yup?.string()
      ?.trim()
      ?.email('Must be an email')
      ?.required('Email is required'),
    ...schema,
  });
};

export const FEEDBACK_SURVEY_RESPONSE_QUESTION_ANSWERS: any = {
  [FEEDBACK_SURVEY_QUESTION_TYPE?.MULTIPLE_CHOICE]: 'singleAnswer',
  [FEEDBACK_SURVEY_QUESTION_TYPE?.SHORT_ANSWERS]: 'singleAnswer',
  [FEEDBACK_SURVEY_QUESTION_TYPE?.LINEAR_SCALE]: 'singleAnswer',
  [FEEDBACK_SURVEY_QUESTION_TYPE?.CHECK_BOXES]: 'multiAnswer',
  [FEEDBACK_SURVEY_QUESTION_TYPE?.TEXT]: 'singleAnswer',
};

export const upsertSurveyResponseDefaultValues = (questionsData: any) => {
  const defaultValue: any = {};

  questionsData?.forEach((question: any, questionId: any) => {
    switch (question?.questionType) {
      case FEEDBACK_SURVEY_QUESTION_TYPE?.MULTIPLE_CHOICE:
        defaultValue[questionId] = question?.answer ?? '';
        break;
      case FEEDBACK_SURVEY_QUESTION_TYPE?.SHORT_ANSWERS:
        defaultValue[questionId] = question?.answer ?? '';
        break;
      case FEEDBACK_SURVEY_QUESTION_TYPE?.LINEAR_SCALE:
        defaultValue[questionId] = question?.answer ?? '';
        break;
      case FEEDBACK_SURVEY_QUESTION_TYPE?.CHECK_BOXES:
        defaultValue[questionId] = question?.answer ?? [];
        break;
      default:
        defaultValue[questionId] = '';
        break;
    }
  });
  return defaultValue;
};

export const FEEDBACK_SURVEY_RESPONSE_QUESTION: any = {
  [FEEDBACK_SURVEY_QUESTION_TYPE?.MULTIPLE_CHOICE]: RHFRadioGroup,
  [FEEDBACK_SURVEY_QUESTION_TYPE?.SHORT_ANSWERS]: RHFTextField,
  [FEEDBACK_SURVEY_QUESTION_TYPE?.LINEAR_SCALE]: RHFRadioGroup,
  [FEEDBACK_SURVEY_QUESTION_TYPE?.CHECK_BOXES]: RHFMultiCheckbox,
  [FEEDBACK_SURVEY_QUESTION_TYPE?.TEXT]: Typography,
};
