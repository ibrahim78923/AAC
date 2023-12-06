import { Typography } from '@mui/material';
import {
  RHFDatePicker,
  RHFDropZone,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const AdValidation = Yup.object().shape({
  account: Yup.string().required('Field is Required'),
  fbPage: Yup.string().required('Field is Required'),
  creative: Yup.string().required('Field is Required'),
  websiteUrl: Yup.string().required('Field is Required'),
  image: Yup.string().required('Field is Required'),
  text: Yup.string().required('Field is Required'),
  headline: Yup.string().required('Field is Required'),
  callToAction: Yup.string().required('Field is Required'),
});
export const AdDefaultValues = {
  account: '',
  fbPage: '',
  fbCampaign: '',
  date: null,
  creative: '',
  existingAccount: '',
  websiteUrl: '',
  image: '',
  text: '',
  headline: '',
  callToAction: '',
};
export const AdFormData = [
  {
    componentProps: {
      name: 'account',
      label: 'Ad Account',
      fullWidth: true,
      required: true,
      select: true,
    },
    options: [
      { value: 'geekFam', label: 'Geek Fam Solutions' },
      { value: 'orcalo', label: 'Orcalo Holdings' },
    ],
    component: RHFSelect,
    isNewAdFields: ['existingAd', 'newAd'],
    md: 12,
  },
  {
    componentProps: {
      name: 'fbPage',
      label: 'Facebook Page',
      fullWidth: true,
      required: true,
      select: true,
    },
    options: [
      { value: 'geekFam', label: 'Geek Fam Solutions' },
      { value: 'orcalo', label: 'Orcalo Holdings' },
    ],
    component: RHFSelect,
    isNewAdFields: ['existingAd', 'newAd'],
    md: 12,
  },
  {
    componentProps: {
      varient: 'h6',
      heading: 'Facebook Campaign',
    },
    gridLength: 12,
    component: Typography,
    isNewAdFields: ['existingAd', 'newAd'],
  },
  {
    componentProps: {
      name: 'fbCampaign',
      row: true,
      fullWidth: true,
      options: [
        { value: 'newCampaign', label: 'Create new Campaign' },
        { value: 'existing', label: 'Add to existing' },
      ],
    },
    component: RHFRadioGroup,
    isNewAdFields: ['existingAd', 'newAd'],
    md: 12,
  },
  {
    componentProps: {
      name: 'date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    isNewAdFields: ['existingAd', 'newAd'],
    md: 12,
  },
  {
    componentProps: {
      varient: 'h6',
      heading: 'Ad Creative',
    },
    gridLength: 12,
    component: Typography,
    isNewAdFields: ['existingAd', 'newAd'],
  },
  {
    componentProps: {
      name: 'creative',
      row: true,
      fullWidth: true,
      options: [
        { value: 'existingAd', label: 'Use Existing post' },
        { value: 'newAd', label: 'Create a new ad' },
      ],
    },
    component: RHFRadioGroup,
    isNewAdFields: ['existingAd', 'newAd'],
    md: 12,
  },
  {
    componentProps: {
      name: 'existingAccount',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'geekFam', label: 'Geek Fam Solutions' },
      { value: 'orcalo', label: 'Orcalo Holdings' },
    ],
    component: RHFSelect,
    isNewAdFields: ['existingAd', 'newAd'],
    md: 12,
  },
  {
    componentProps: {
      varient: 'h6',
      heading: 'Website page URL',
    },
    gridLength: 12,
    component: Typography,
    isNewAdFields: ['newAd'],
  },
  {
    componentProps: {
      name: 'websiteURL',
      placeholder: 'Enter URL',
      fullWidth: true,
    },
    component: RHFTextField,
    isNewAdFields: ['newAd'],
    md: 12,
  },
  {
    componentProps: {
      varient: 'h6',
      heading: 'Image/Video',
    },
    gridLength: 12,
    component: Typography,
    isNewAdFields: ['newAd'],
  },
  {
    componentProps: {
      name: 'image',
      required: true,
      fullWidth: true,
    },
    component: RHFDropZone,
    isNewAdFields: ['newAd'],
    md: 12,
  },
  {
    componentProps: {
      name: 'websiteURL',
      label: 'Text/Body copy',
      required: true,
      fullWidth: true,
      placeholder:
        "Write a message that clearly tells people about what you're promoting.",
    },
    component: RHFTextField,
    isNewAdFields: ['newAd'],
    md: 12,
  },
  {
    componentProps: {
      name: 'headline',
      label: 'Headline',
      required: true,
      placeholder:
        'Write a clear and concise headline to capture viewers attention.',
      fullWidth: true,
    },
    component: RHFTextField,
    isNewAdFields: ['newAd'],
    md: 12,
  },
  {
    componentProps: {
      name: 'callToAction',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'geekFam', label: 'Geek Fam Solutions' },
      { value: 'orcalo', label: 'Orcalo Holdings' },
    ],
    component: RHFSelect,
    isNewAdFields: ['newAd'],
    md: 12,
  },
];
