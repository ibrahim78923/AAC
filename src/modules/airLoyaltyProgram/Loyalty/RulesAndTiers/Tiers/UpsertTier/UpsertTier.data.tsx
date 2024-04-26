import {
  RHFAutocomplete,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

export const upsertTierValidationSchema = Yup?.object()?.shape({
  tierName: Yup?.string()?.required('Required'),
  tierDescription: Yup?.string()?.required('Required'),
  addLogo: Yup?.mixed()?.nullable(),
  amount: Yup?.string()?.nullable(),
  points: Yup?.number()?.nullable(),
});

export const upsertTierDefaultValues = {
  tierName: '',
  tierDescription: '',
  addLogo: null,
  amount: '',
  points: null,
};

export const upsertTierDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'tierName',
      label: 'Tier Name',
      placeholder: 'Enter name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'tierDescription',
      label: 'Tier Description',
      placeholder: 'Enter description',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'addLogo',
      label: 'Add Logo',
      fileType: 'PNG or JPG',
      fileName: 'Logo',
    },
    component: RHFDropZone,
  },
  {
    id: 4,
    componentProps: {
      variant: 'h5',
    },
    heading: 'Points Calculation',
    component: Typography,
  },
  {
    id: 5,
    componentProps: {
      name: 'amount',
      label: 'Amount',
      fullWidth: true,
      options: ['1'],
      placeholder: 'Select',
    },
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      borderLeft: '2px solid',
      borderColor: 'grey.700',
      ml: 2,
      my: -2,
      pl: 1,
      py: 2,
      color: 'grey.900',
    },
    heading: 'Currency equivalents to',
    component: Typography,
  },
  {
    id: 7,
    componentProps: {
      name: 'points',
      label: 'Points',
      placeholder: 'Enter',
      type: 'number',
      fullWidth: true,
    },
    component: RHFTextField,
  },
];
