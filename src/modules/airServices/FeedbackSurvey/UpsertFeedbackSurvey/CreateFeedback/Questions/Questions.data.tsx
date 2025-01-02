import {
  RadioButtonChecked,
  CheckBox,
  LinearScale,
  ShortText,
  AddCircle,
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/system';
import { Box } from '@mui/material';
import { RHFRadioGroup, RHFTextField } from '@/components/ReactHookForm';
import {
  AddSectionIcon,
  AddTitleIcon,
  ImportQuestionIcon,
} from '@/assets/icons';
import { DynamicQuestions } from './DynamicQuestions';
import { UseFormReturn } from 'react-hook-form';

export const tooltipData = (
  appendSection: () => void,
  appendQuestion: () => void,
  appendText: () => void,
  handleImportOpen: () => void,
) => [
  {
    id: 1,
    title: 'Add question',
    onClick: () => appendQuestion(),
    icon: <AddCircle color="primary" fontSize="large" />,
  },
  {
    id: 2,
    title: 'Add title and description',
    onClick: () => appendText(),
    icon: <AddTitleIcon />,
  },
  {
    id: 3,
    title: 'Import questions',
    onClick: handleImportOpen,
    icon: <ImportQuestionIcon />,
  },
  {
    id: 4,
    title: 'Add section',
    onClick: () => appendSection(),
    icon: <AddSectionIcon />,
  },
];

export const questionTypeOptions = [
  {
    id: 1,
    label: 'Multiple Choice',
    value: 'multipleChoice',
    icon: <RadioButtonChecked />,
  },
  {
    id: 2,
    label: 'Check Boxes',
    value: 'checkboxes',
    icon: <CheckBox />,
  },
  {
    id: 3,
    label: 'Short Answers',
    value: 'shortAnswers',
    icon: <ShortText />,
  },
  {
    id: 4,
    label: 'Linear Scale',
    value: 'linearScale',
    icon: <LinearScale />,
  },
];

const linearScaleOptions = [
  {
    label: 'Strongly Agree 😇',
    value: 'Strongly Agree 😇',
  },
  {
    label: 'Agree 😊',
    value: 'Agree 😊',
  },
  {
    label: 'Neutral 😐',
    value: 'Neutral 😐',
  },
  {
    label: 'Disagree 😑',
    value: 'Disagree 😑',
  },
  {
    label: 'Strongly Disagree 😠',
    value: 'Strongly Disagree 😠',
  },
];

export const surveyQuestionComponent: any = (
  sectionIndex: number,
  index: number,
  methods: UseFormReturn<any>,
  watchType: {
    id?: number;
    label: string;
    value: string;
    icon?: JSX.Element;
  },
  sectionCondition: boolean,
) => ({
  checkboxes: (
    <DynamicQuestions
      methods={methods}
      sectionIndex={sectionIndex}
      questionIndex={index}
      watchType={watchType}
      sectionCondition={sectionCondition}
    />
  ),
  multipleChoice: (
    <DynamicQuestions
      methods={methods}
      sectionIndex={sectionIndex}
      questionIndex={index}
      watchType={watchType}
      sectionCondition={sectionCondition}
    />
  ),
  shortAnswers: (
    <RHFTextField
      name={`displayNameText`}
      placeholder="Write answer"
      multiline
      minRows={3}
      size="small"
      disabled
    />
  ),
  linearScale: (
    <RHFRadioGroup
      name={`displayNameRadio`}
      disabled
      options={linearScaleOptions}
    />
  ),
});

export const questionTypeData = {
  writeQuestion: 'Write Question',
  writeTitle: 'Write short title',
  question: 'Question',
  title: 'Title',
  text: 'text',
  saveQuestion: 'saveQuestion',
};

const slideFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimatedBox = styled(Box)(({ fromRight }: any) => ({
  animation: `${fromRight ? slideFromLeft : slideFromRight} 0.5s ease-in-out`,
}));
