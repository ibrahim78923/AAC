import {
  ChampionBadgeImage,
  MostValuableBadgeImage,
  SpeedRacerBadgeImage,
  WizardBadgeImage,
} from '@/assets/images';
import { RHFTextField } from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import * as yup from 'yup';

export const awardPointsSchema = yup?.object()?.shape({
  fast: yup
    ?.number()
    ?.positive('Positive number required')
    ?.required('Required')
    ?.typeError('Positive number required'),
  onTime: yup
    ?.number()
    ?.positive('Positive number required')
    ?.required('Required')
    ?.typeError('Positive number required'),
  late: yup
    ?.number()
    ?.positive('Positive number required')
    ?.required('Required')
    ?.typeError('Positive number required'),
  firstCallResolution: yup
    ?.number()
    ?.positive('Positive number required')
    ?.required('Required')
    ?.typeError('Positive number required'),
  happyCustomer: yup
    ?.number()
    ?.positive('Positive number required')
    ?.required('Required')
    ?.typeError('Positive number required'),
  unHappyCustomer: yup
    ?.number()
    ?.positive('Positive number required')
    ?.required('Required')
    ?.typeError('Positive number required'),
});

export const awardFormDefaultValue = (data?: any) => {
  return {
    fast: data?.fast ?? 0,
    onTime: data?.onTime ?? 0,
    late: data?.late ?? 0,
    firstCallResolution: data?.firstCallResolution ?? 0,
    happyCustomer: data?.happyCustomer ?? 0,
    unHappyCustomer: data?.unHappyCustomer ?? 0,
  };
};

export const agentResolveTicketData = [
  {
    id: 1,
    component: Typography,
    componentProps: {
      children: 'When agent resolves a ticket:',
      fontWeight: 600,
    },
  },
  {
    id: 2,
    component: RHFTextField,
    md: 3,
    componentProps: {
      fullWidth: true,
      required: true,
      name: 'fast',
      label: 'Fast (Less than 1 hr)',
    },
  },
  {
    id: 3,
    component: RHFTextField,
    md: 3,
    componentProps: {
      fullWidth: true,
      required: true,
      name: 'onTime',
      label: 'on time',
    },
  },
  {
    id: 4,
    component: RHFTextField,
    md: 3,
    componentProps: {
      fullWidth: true,
      required: true,
      name: 'late',
      label: 'Late ( Overdue)',
    },
  },
  {
    id: 5,
    component: Typography,
    componentProps: {
      children: 'Bonus points for:',
      fontWeight: 600,
    },
  },
  {
    id: 6,
    component: RHFTextField,
    md: 3,
    componentProps: {
      fullWidth: true,
      required: true,
      name: 'firstCallResolution',
      label: 'First call resolution',
    },
  },
  {
    id: 7,
    component: RHFTextField,
    md: 3,
    componentProps: {
      fullWidth: true,
      required: true,
      name: 'happyCustomer',
      label: 'Happy customer',
    },
  },
  {
    id: 8,
    component: RHFTextField,
    md: 3,
    componentProps: {
      fullWidth: true,
      required: true,
      name: 'unHappyCustomer',
      label: 'Unhappy customer',
    },
  },
];

export const receivingAwardData = [
  {
    title: 'Most Valuable Player',
    text: 'Agent with the most overall points this month                         ',
    icon: MostValuableBadgeImage,
    borderColor: 'main.primary',
  },
  {
    title: 'Customer Wow Champion',
    text: 'Agent with the maximum Customer satisfaction points this month',
    icon: ChampionBadgeImage,
    borderColor: 'main.primary',
  },
  {
    title: 'Wizard',
    text: ' Agent with the highest First Call Resolution points this month',
    icon: WizardBadgeImage,
    borderColor: 'main.primary',
  },
  {
    title: 'Speed Racer',
    text: 'Agent with the maximum points for fast resolution this month',
    icon: SpeedRacerBadgeImage,
    borderColor: 'main.primary',
  },
];
