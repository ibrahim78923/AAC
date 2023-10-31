import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Checkbox } from '@mui/material';
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
  jobCategory: '',
  createdById: '',
  createdAt: '',
  status: '',
};

export const jobPostingFiltersFields = [
  {
    componentProps: {
      name: 'jobCategory',
      label: 'Category',
      select: true,
    },
    options: [
      { value: 'SALES', label: 'Sales' },
      { value: 'MARKETING', label: 'Marketing' },
      { value: 'SERVICES', label: 'Service' },
      { value: 'OPERATIONS', label: 'Operations' },
      { value: 'LOYALTY_PROGRAM', label: 'Loyalty Program' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'createdById',
      label: 'Created By',
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
      name: 'createdAt',
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

export const columns: any = [
  {
    accessorFn: (row: any) => row.id,
    id: 'id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.title,
    id: 'title',
    cell: (info: any) => info.getValue(),
    header: 'Job Title',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.description,
    id: 'description',
    isSortable: true,
    header: 'Short Discription',
    cell: (info: any) => {
      const response = info.getValue().replace(/<[^>]*>/g, '');
      return <>{response}</>;
    },
  },
  {
    accessorFn: (row: any) => row.jobCategory,
    id: 'jobCategory',
    isSortable: true,
    header: 'Category',
    cell: (info: any) => {
      const category =
        info.getValue() === 'SALES'
          ? 'Sales'
          : info.getValue() === 'MARKETING'
          ? 'Marketing'
          : info.getValue() === 'SERVICES'
          ? 'Services'
          : info.getValue() === 'OPERATIONS'
          ? 'Operations'
          : 'Loyalty Program';
      return <>{category}</>;
    },
  },
  {
    accessorFn: (row: any) => row.numberOfVacancy,
    id: 'numberOfVacancy',
    isSortable: true,
    header: 'No of Vacency',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.createdBy,
    id: 'createdBy',
    isSortable: true,
    header: 'Created By',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.createdDate,
    id: 'createdDate',
    isSortable: true,
    header: 'Created date',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => (info.getValue() === 'OPEN' ? 'Open' : 'Close'),
  },
];
