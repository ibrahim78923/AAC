import { DocumentIcon } from '@/assets/icons';
import {
  RHFDatePicker,
  RHFMultiSearchableSelect,
  RHFSelect,
} from '@/components/ReactHookForm';
import { Checkbox } from '@mui/material';
import * as Yup from 'yup';
export const jobApplicationValidationSchema = Yup.object().shape({
  candidates: Yup.array().required('Field is Required'),
  applyDate: Yup.string().trim().required('Field is Required'),
  status: Yup.string().trim().required('Field is Required'),
});

export const jobApplicationDefaultValues = {
  candidates: '',
  applyDate: '',
  status: '',
};

export const jobApplicationFiltersDataArray = [
  {
    componentProps: {
      name: 'candidates',
      label: 'Candidates',
      // select: true,
    },
    options: [
      { value: 'JohnDoe', label: 'John Doe' },
      { value: 'Andrew', label: 'Andrew' },
      { value: 'RichardRobertson', label: 'Richard robertson' },
      { value: 'Franksten', label: 'Franksten' },
    ],
    component: RHFMultiSearchableSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'applyDate',
      label: 'Apply Date',
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
      { value: 'Pending', label: 'Pending' },
      { value: 'ShortListed', labelShort: 'listed' },
      { value: 'Interview Schedule', label: 'Interview Scheduled' },
      { value: 'Interviewed', label: 'Interviewed' },
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
    accessorFn: (row: any) => row.jobTitle,
    id: 'jobTitle',
    cell: (info: any) => info.getValue(),
    header: 'Job Title',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.candidate,
    id: 'candidate',
    isSortable: true,
    header: 'Candidate',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.applyDate,
    id: 'applyDate',
    isSortable: true,
    header: 'Apply Date',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.jobPostedDate,
    id: 'jobPostedDate',
    isSortable: true,
    header: 'Job Posted Date',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.resume,
    id: 'resume',
    isSortable: true,
    header: 'Resume',
    cell: () => <DocumentIcon />,
  },
  {
    accessorFn: (row: any) => row.coverLetter,
    id: 'coverLetter',
    isSortable: true,
    header: 'Cover Letter',
    cell: () => <DocumentIcon />,
  },
  {
    accessorFn: (row: any) => row.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => info.getValue(),
  },
];
