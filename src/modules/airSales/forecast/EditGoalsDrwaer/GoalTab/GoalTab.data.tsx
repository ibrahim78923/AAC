import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const editGoalValidationSchema = Yup.object().shape({
  name: Yup.string(),
  user: Yup.string(),
  duration: Yup.string(),
  dealPipelines: Yup.string(),
  targetOne: Yup.number(),
});

export const editGoalDefaultValues = {
  name: 'Testers',
  user: 'Admin Services',
  duration: 'Monthly',
  dealPipelines: 'registeringpipeline',
  targetOne: '',
};

export const editGoalArray = [
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'user',
      label: 'User',
      fullWidth: true,
      select: false,
      disabled: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'duration',
      label: 'Duration',
      fullWidth: true,
      select: false,
      disabled: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'dealPipelines',
      label: 'Deal Pipelines',
      fullWidth: true,
      select: true,
      disabled: true,
    },
    options: [
      { value: 'New', label: 'New' },
      { value: 'followUp', label: 'Follow Up' },
      { value: 'underReview', label: 'Under Review' },
      { value: 'registeringpipeline', label: 'registering pipeline' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'targetOne',
      label: '',
      fullWidth: true,
      select: false,
      type: 'number',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'targetTwo',
      label: '',
      fullWidth: true,
      select: false,
      type: 'number',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'targetThree',
      label: '',
      fullWidth: true,
      select: false,
      type: 'number',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'targetFour',
      label: '',
      fullWidth: true,
      select: false,
      type: 'number',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'targetFive',
      label: '',
      fullWidth: true,
      select: false,
      type: 'number',
    },
    component: RHFTextField,
    md: 12,
  },
];
