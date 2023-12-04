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
  fast: yup.number().positive(),
  onTime: yup.number().positive(),
  late: yup.number().positive(),
  firstCallResolution: yup.number().positive(),
  happyCustomer: yup.number().positive(),
});

export const awardFormDefaultValue = {
  fast: 0,
  onTime: 0,
  late: 0,
  firstCallResolution: 0,
  happyCustomer: 0,
};

export const agentResolveTicketData = [
  {
    component: Typography,
    componentProps: {
      type: 'number',
      children: 'When agent resolves a ticket:',
      fontWeight: 600,
    },
  },
  {
    id: 1,
    component: RHFTextField,
    md: 3,
    componentProps: {
      type: 'number',
      fullWidth: true,
      name: 'fast',
      label: 'Fast (Less than 1 hr)',
    },
  },
  {
    id: 2,
    component: RHFTextField,
    md: 3,
    componentProps: {
      type: 'number',
      fullWidth: true,
      name: 'onTime',
      label: 'on time',
    },
  },
  {
    id: 3,
    component: RHFTextField,
    md: 3,
    componentProps: {
      type: 'number',
      fullWidth: true,
      name: 'late',
      label: 'Late ( Overdue)',
    },
  },
  {
    component: Typography,
    componentProps: {
      type: 'number',
      children: 'Bonus points for:',
      fontWeight: 600,
    },
  },
  {
    id: 1,
    component: RHFTextField,
    md: 3,
    componentProps: {
      type: 'number',
      fullWidth: true,
      name: 'firstCallResolution',
      label: 'First call Resolution',
    },
  },
  {
    id: 2,
    component: RHFTextField,
    md: 3,
    componentProps: {
      type: 'number',
      fullWidth: true,
      name: 'happyCustomer',
      label: 'happy Customer',
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
