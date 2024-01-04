import {
  BeginnerAwardImage,
  ExpertAwardImage,
  IntermediateAwardImage,
  MasterAwardImage,
  ProfessionalAwardImage,
} from '@/assets/images';

import * as yup from 'yup';

export const agentLevelsPointsSchema = yup?.object()?.shape({
  beginner: yup
    .number()
    .positive('Positive number required')
    .required('Required field')
    .typeError('Positive number required'),
  intermediate: yup
    .number()
    .positive('Positive number required')
    .required('Required field')
    .typeError('Positive number required'),
  professional: yup
    .number()
    .positive('Positive number required')
    .required('Required field')
    .typeError('Positive number required'),
  master: yup
    .number()
    .positive('Positive number required')
    .required('Required field')
    .typeError('Positive number required'),
  expert: yup
    .number()
    .positive('Positive number required')
    .required('Required field')
    .typeError('Positive number required'),
});

export const agentLevelsFormDefaultValue = {
  beginner: 0,
  intermediate: 0,
  professional: 0,
  master: 0,
  expert: 0,
};

export const AgentLevelCardData = [
  {
    icon: BeginnerAwardImage,
    title: 'beginner',
    points: 10,
  },
  {
    icon: IntermediateAwardImage,
    title: 'intermediate',
    points: 20,
  },
  {
    icon: ProfessionalAwardImage,
    title: 'professional',
    points: 50,
  },
  {
    icon: MasterAwardImage,
    title: 'master',
    points: 100,
  },
  {
    icon: ExpertAwardImage,
    title: 'expert',
    points: 1000,
  },
];
