import {
  RHFCheckbox,
  RHFDatePicker,
  RHFDropZone,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

export const adValidation = Yup.object().shape({
  account: Yup.string().required('Field is Required'),
  fbPage: Yup.string().required('Field is Required'),
  fbCampaign: Yup.string().required('Field is Required'),
  date: Yup.string().required('Field is Required'),
  creative: Yup.string().required('Field is Required'),
  existingAccount: Yup.string().required('Field is Required'),
  // websiteUrl: Yup.string().required('Field is Required'),
  image: Yup.string().required('Field is Required'),
  text: Yup.string().required('Field is Required'),
  headline: Yup.string().required('Field is Required'),
  callToAction: Yup.string().required('Field is Required'),
});
export const taregtValidation = Yup.object().shape({
  category: Yup.string().required('Field is Required'),
  audience: Yup.string().required('Field is Required'),
  location: Yup.string().required('Field is Required'),
  startAge: Yup.string().required('Field is Required'),
  endAge: Yup.string().required('Field is Required'),
});
export const budgetValidation = Yup.object().shape({
  budget: Yup.string().required('Field is Required'),
  strategy: Yup.string().required('Field is Required'),
  target: Yup.string(),
});
export const autoValidation = Yup.object().shape({
  contactsList: Yup.string().required('Field is Required'),
});

export const adDefaultValues = {
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
export const targetDefaultValues = {
  category: '',
  audience: '',
  location: '',
  startAge: null,
  endAge: '',
};
export const budgetDefaultValues = {
  budget: '',
  strategy: '',
  target: '',
  scheduleStart: null,
  scheduleEnd: null,
  time: null,
};
export const autoDefaultValues = {
  contactsList: '',
};

export const stepperArray = [
  {
    name: 'Ad',
    formFields: [
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
          name: 'text',
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
    ],
  },
  {
    name: 'Targeting',
    formFields: [
      {
        componentProps: {
          name: 'category',
          label: 'Special Ad Category',
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
          varient: 'body1',
          heading: 'Audience',
        },
        gridLength: 12,
        component: Typography,
      },
      {
        componentProps: {
          name: 'audience',
          row: true,
          fullWidth: true,
          options: [
            { value: 'newAudience', label: 'New Audience' },
            { value: 'savedAudience', label: 'Select a saved Audience' },
          ],
        },
        component: RHFRadioGroup,
        md: 12,
      },
      {
        componentProps: {
          varient: 'body1',
          heading: 'Targeting people who match the following criteria',
        },
        gridLength: 12,
        component: Typography,
      },
      {
        componentProps: {
          name: 'location',
          fullWidth: true,
          label: 'Location',
          required: true,
          select: true,
        },
        options: [
          { value: 'lahore', label: 'Lahore' },
          { value: 'rawalpindi', label: 'Rawalpindi' },
        ],
        component: RHFSelect,
        md: 12,
      },
      {
        componentProps: {
          varient: 'body2',
          heading: 'Age Range',
        },
        gridLength: 12,
        component: Typography,
      },
      {
        componentProps: {
          name: 'startAge',
          placeholder: 'Start Age',
        },
        component: RHFTextField,
        md: 6,
      },
      {
        componentProps: {
          name: 'endAge',
          placeholder: 'End Age',
        },
        component: RHFTextField,
        md: 6,
      },
    ],
  },
  {
    name: 'Budget & Schedule',
    formFields: [
      {
        componentProps: {
          name: 'budget',
          label: 'Budget(£)',
          placeholder: 'Enter Here',
          required: true,
          fullWidth: true,
        },
        component: RHFTextField,
        md: 12,
      },
      {
        componentProps: {
          name: 'strategy',
          label: 'Bid Strategy',
          fullWidth: true,
          required: true,
          select: true,
        },
        options: [{ value: 'minimize', label: 'Minimize conversions' }],
        component: RHFSelect,
        md: 12,
      },
      {
        componentProps: {
          name: 'target',
          label: 'Set target cost per action (optional)',
          placeholder: 'Enter Here',
          fullWidth: true,
        },
        component: RHFCheckbox,
        md: 12,
      },
      {
        componentProps: {
          name: 'scheduleStart',
          label: 'Schedule',
          fullWidth: true,
          required: true,
        },
        component: RHFDatePicker,
        md: 6,
      },
      {
        componentProps: {
          name: 'scheduleEnd',
          label: 'End',
          fullWidth: true,
        },
        component: RHFDatePicker,
        md: 6,
      },
      {
        componentProps: {
          name: 'time',
          label: 'Time',
          fullWidth: true,
          select: true,
        },
        component: RHFTimePicker,
        md: 12,
      },
    ],
  },
  {
    name: 'Automation',
    formFields: [
      {
        componentProps: {
          name: 'contactsList',
          label: 'Add contacts to a list',
          placeholder: 'Enter list name',
          required: true,
          fullWidth: true,
          small:
            'When a contact interacts with your ads, add them to an active list so you can market to them later.',
        },
        component: RHFTextField,
        md: 12,
      },
    ],
  },
];
