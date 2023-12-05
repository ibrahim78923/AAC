import * as Yup from 'yup';

import {
  FacebookSquareIcon,
  LinkedInSquareIcon,
  SearchAdIcon,
} from '@/assets/icons';
import {
  RHFDatePicker,
  RHFRadioGroup,
  RHFSelect,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';

export const createAdTabsData = [
  {
    title: 'Engagement ad',
    description:
      "Drive traffic, build trust, and increase sales by showing a series of three ads, optimized for every stage of the buyer's journey.",
    fbIcon: <FacebookSquareIcon />,
    component: 'engagement-Ad',
  },
  {
    title: 'Website visit ad',
    description:
      "Drive traffic, build trust, and increase sales by showing a series of three ads, optimized for every stage of the buyer's journey.",
    linkedInIcon: <LinkedInSquareIcon />,
    fbIcon: <FacebookSquareIcon />,
    component: 'website-Ad',
  },
  {
    title: 'Lead Generation ad',
    description:
      "Drive traffic, build trust, and increase sales by showing a series of three ads, optimized for every stage of the buyer's journey.",
    linkedInIcon: <LinkedInSquareIcon />,
    fbIcon: <FacebookSquareIcon />,
    component: 'generation-Ad',
  },
  {
    description:
      "Drive traffic, build trust, and increase sales by showing a series of three ads, optimized for every stage of the buyer's journey.",
    fbIcon: <SearchAdIcon />,
    component: 'search-Ad',
  },
];

export const searchAdValidation = Yup.object().shape({
  account: Yup.string().required('Field is Required'),
  network: Yup.string().required('Field is Required'),
});
export const searchAdDefaultValues = {
  account: '',
  network: '',
};
export const searchAdFormData = [
  {
    componentProps: {
      name: 'account',
      label: 'Select Ad Account',
      fullWidth: true,
      required: true,
      select: true,
    },
    options: [
      { value: 'geekFam', label: 'Geek Fam Solutions' },
      { value: 'orcalo', label: 'Orcalo Holdings' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      color: '#7a7a7b',
      varient: 'h6',
      heading: 'Select an ad network',
    },
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'network',
      // heading: 'Select an ad network',
      row: true,
      fullWidth: true,
      defaultValue: 'googleCompaign',
      options: [
        { value: 'googleCompaign', label: 'Create new Google Compaign' },
        { value: 'existing', label: 'Add to existing' },
      ],
    },
    component: RHFRadioGroup,
    md: 12,
  },
  {
    componentProps: {
      name: 'date',
      label: '',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
];
