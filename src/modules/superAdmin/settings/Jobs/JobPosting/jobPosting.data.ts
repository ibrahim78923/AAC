import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const jobPostingValidationSchema = Yup.object().shape({
  jobTitle: Yup.string().trim().required('Field is Required'),
  JobType: Yup.string().trim().required('Field is Required'),
  category: Yup.string().trim().required('Field is Required'),
  experienceLevel: Yup.string().trim().required('Field is Required'),
  numberOfVacency: Yup.string().trim().required('Field is Required'),
  applicationDedlineDates: Yup.string().trim().required('Field is Required'),
  jobDiscription: Yup.string().trim().required('Field is Required'),
});

export const jobPostingDefaultValues = {
  jobTitle: '',
  JobType: '',
  category: '',
  experienceLevel: '',
  numberOfVacency: '',
  applicationDedlineDates: '',
  jobDiscription: '',
};

export const jobPostingDataArray = [
  {
    componentProps: {
      name: 'jobTitle',
      label: 'Job Title',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'JobType',
      label: 'Job Type',
      fullWidth: true,
    },
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'category',
      label: 'Category ',
      fullWidth: true,
    },
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'experienceLevel',
      label: 'Experience Level',
      select: true,
    },
    options: [
      { value: 'Low', label: 'Low' },
      { value: 'Medium', label: 'Medium' },
      { value: 'High', label: 'High' },
      { value: 'Urgent', label: 'Urgent' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'numberOfVacency',
      label: 'Number of Vacency',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '5', label: '5 or more than 5' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'applicationDedlineDates',
      label: 'Application Deadline Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'jobDiscription',
      label: 'Job Discription',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
];
// Filters Data

export const jobPostingFiltersValidationSchema = Yup.object().shape({
  jobTitle: Yup.string().trim().required('Field is Required'),
  JobType: Yup.string().trim().required('Field is Required'),
  dummy: Yup.string().trim().required('Field is Required'),
  experienceLevel: Yup.string().trim().required('Field is Required'),
  numberOfVacency: Yup.string().trim().required('Field is Required'),
  applicationDedlineDates: Yup.string().trim().required('Field is Required'),
  jobDiscription: Yup.string().trim().required('Field is Required'),
});

export const jobPostingFiltersDefaultValues = {
  jobTitle: '',
  JobType: '',
  dummy: '',
  experienceLevel: '',
  numberOfVacency: '',
  applicationDedlineDates: '',
  jobDiscription: '',
};

export const jobPostingFiltersDataArray = [
  {
    componentProps: {
      name: 'category',
      label: 'Category',
      select: true,
    },
    options: [
      { value: 'Sales', label: 'Sales' },
      { value: 'Marketing', label: 'Marketing' },
      { value: 'Service', label: 'Service' },
      { value: 'Operations', label: 'Operations' },
      { value: 'Loyalty Program', label: 'Loyalty Program' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'createdBy',
      label: 'createdBy',
      select: true,
    },
    options: [
      { value: 'John Doe', label: 'John Doe' },
      { value: 'William', label: 'William' },
      { value: 'Andrew', label: 'Andrew' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      select: true,
    },
    options: [
      { value: 'Open', label: 'Open' },
      { value: 'Close', label: 'Close' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
