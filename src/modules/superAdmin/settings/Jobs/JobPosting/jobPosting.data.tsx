import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import StatusBadge from '@/components/StatusBadge';
import { Checkbox } from '@mui/material';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import useJobPosting from './useJobPosting';

export const jobPostingValidationSchema = Yup.object().shape({
  title: Yup.string().trim().required('Field is Required'),
  jobType: Yup.string().trim().required('Field is Required'),
  jobCategory: Yup.string().trim().required('Field is Required'),
  experience: Yup.string().trim().required('Field is Required'),
  numberOfVacancy: Yup.string().trim().required('Field is Required'),
  deadline: Yup.date().required('Field is Required'),
  description: Yup.string().trim().required('Field is Required'),
});

export const jobPostingDefaultValues = {
  title: '',
  jobType: '',
  jobCategory: '',
  experience: '',
  numberOfVacancy: '',
  deadline: null,
  description: '',
};

export const jobPostingDataArray = [
  {
    componentProps: {
      name: 'title',
      label: 'Job Title',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'jobType',
      label: 'Job Type',
      select: true,
      fullWidth: true,
    },
    options: [
      { value: 'FULL_TIME', label: 'Full Time' },
      { value: 'PART_TIME', label: 'Part Time' },
      { value: 'PERMANENT', label: 'Permanent' },
      { value: 'INTERNSHIP', label: 'Internship' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'jobCategory',
      label: 'Category ',
      select: true,
      fullWidth: true,
    },
    options: [
      { value: 'SALES', label: 'Sales' },
      { value: 'MARKETING', label: 'Marketing' },
      { value: 'SERVICES', label: 'Services' },
      { value: 'OPERATIONS', label: 'Operations' },
      { value: 'LOYALTY_PROGRAM', label: 'Loyalty Program' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'experience',
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
      name: 'numberOfVacancy',
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
      name: 'deadline',
      label: 'Application Deadline Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
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

export const jobPostingFiltersFields = () => {
  const { jopPostinData } = useJobPosting();
  const createdByOptions = jopPostinData?.data?.jobs?.reduce(
    (uniqueOptions: any, option: any) => {
      const createdById = option?.createdBy?._id;
      if (
        createdById &&
        !uniqueOptions.some((item: any) => item.value === createdById)
      ) {
        uniqueOptions.push({
          value: createdById,
          label: option?.createdBy?.name,
        });
      }
      return uniqueOptions;
    },
    [],
  );
  return [
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
        name: 'createdBy',
        label: 'Created By',
        select: true,
      },
      options: createdByOptions,
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
};

export const columns = (theme: any) => {
  return [
    {
      accessorFn: (row: any) => row?.id,
      id: 'id',
      cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.title,
      id: 'title',
      cell: (info: any) => info?.getValue(),
      header: 'Job Title',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.description,
      id: 'description',
      isSortable: true,
      header: 'Short Discription',
      cell: (info: any) => {
        const response = info?.getValue().replace(/<[^>]*>/g, '');
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
          info?.getValue() === 'SALES'
            ? 'Sales'
            : info?.getValue() === 'MARKETING'
            ? 'Marketing'
            : info?.getValue() === 'SERVICES'
            ? 'Services'
            : info?.getValue() === 'OPERATIONS'
            ? 'Operations'
            : 'Loyalty Program';
        return <>{category}</>;
      },
    },
    {
      accessorFn: (row: any) => row?.numberOfVacancy,
      id: 'numberOfVacancy',
      isSortable: true,
      header: 'No of Vacency',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.createdBy,
      id: 'createdBy',
      isSortable: true,
      header: 'Created By',
      cell: (info: any) => info?.getValue().name,
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created date',
      cell: (info: any) => dayjs(info?.getValue()).format('MM/DD/YYYY'),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <StatusBadge
          value={info.getValue()}
          // onChange={(e: any) => setUserStatus(e.target.value)}
          options={[
            {
              label: 'Open',
              value: 'OPEN',
              color: theme?.palette?.success?.main,
            },
            {
              label: 'Close',
              value: 'CLOSE',
              color: theme?.palette?.error?.main,
            },
          ]}
        />
      ),
    },
  ];
};
