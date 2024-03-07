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
    ?.number()
    ?.positive('Positive number required')
    ?.required('Required')
    ?.typeError('Positive number required')
    ?.max(100, 'maximum value is 100'),
  intermediate: yup
    ?.number()
    ?.positive('Positive number required')
    ?.required('Required')
    ?.typeError('Positive number required')
    ?.max(2500, 'maximum value is 2500'),
  professional: yup
    ?.number()
    ?.positive('Positive number required')
    ?.required('Required')
    ?.typeError('Positive number required')
    ?.max(10000, 'maximum value is 10000'),
  master: yup
    ?.number()
    ?.positive('Positive number required')
    ?.required('Required')
    ?.typeError('Positive number required')
    ?.max(100000, 'maximum value is 100000'),
  expert: yup
    ?.number()
    ?.positive('Positive number required')
    ?.required('Required')
    ?.typeError('Positive number required')
    ?.max(25000, 'maximum value is 25000'),
});

export const agentLevelsFormDefaultValue = (data?: any) => {
  return {
    beginner: data?.beginner ?? 0,
    intermediate: data?.intermediate ?? 0,
    professional: data?.professional ?? 0,
    master: data?.master ?? 0,
    expert: data?.expert ?? 0,
  };
};

export const agentLevelCardData = [
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
