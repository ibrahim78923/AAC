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
    ?.positive('Must be greater then 0')
    ?.required('Beginner is required')
    ?.typeError('Must be greater then 0')
    ?.max(100, 'Maximum value is 100'),
  intermediate: yup
    ?.number()
    ?.positive('Must be greater then 0')
    ?.required('Intermediate is required')
    ?.typeError('Must be greater then 0')
    ?.max(2500, 'Maximum value is 2500'),
  professional: yup
    ?.number()
    ?.positive('Must be greater then 0')
    ?.required('Professional is required')
    ?.typeError('Must be greater then 0')
    ?.max(10000, 'Maximum value is 10000'),
  master: yup
    ?.number()
    ?.positive('Must be greater then 0')
    ?.required('Master is required')
    ?.typeError('Must be greater then 0')
    ?.max(100000, 'Maximum value is 100000'),
  expert: yup
    ?.number()
    ?.positive('Must be greater then 0')
    ?.required('Expert is required')
    ?.typeError('Must be greater then 0')
    ?.max(25000, 'Maximum value is 25000'),
});

export const agentLevelsFormDefaultValue = (data?: any) => ({
  beginner: data?.beginner ?? 0,
  intermediate: data?.intermediate ?? 0,
  professional: data?.professional ?? 0,
  master: data?.master ?? 0,
  expert: data?.expert ?? 0,
});

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
