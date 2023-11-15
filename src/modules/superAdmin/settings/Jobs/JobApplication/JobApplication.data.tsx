import AppAvatarGroup from '@/components/AvatarGroup';

import { DocumentIcon } from '@/assets/icons';

import {
  RHFDatePicker,
  RHFMultiSearchableSelect,
  RHFSelect,
} from '@/components/ReactHookForm';
import { Checkbox } from '@mui/material';
import * as Yup from 'yup';
import StatusBadge from '@/components/StatusBadge';
export const jobApplicationValidationSchema = Yup.object().shape({
  candidates: Yup.array().min(1).required('Field is Required'),
  applyDate: Yup.string().trim().required('Field is Required'),
  status: Yup.string().trim().required('Field is Required'),
});

export const jobApplicationDefaultValues = {
  candidates: [],
  applyDate: '',
  status: '',
};

export const jobApplicationFiltersDataArray = [
  {
    componentProps: {
      name: 'candidates',
      label: 'Candidates',
      isCheckBox: true,
    },
    options: [
      { value: '155315', label: 'John Doe ' },
      { value: '785978', label: 'Andrew' },
      { value: '456456', label: 'Richard robertson' },
      { value: '518686', label: 'Franksten' },
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

export const columns = (theme: any) => {
  return [
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
      cell: (info: any) => <AppAvatarGroup data={info.getValue()} />,
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
      cell: (info: any) => (
        <StatusBadge
          value={info.getValue()}
          // onChange={(e: any) => setUserStatus(e.target.value)}
          options={[
            {
              label: 'Interviewed',
              value: 'interviewed',
              color: theme?.palette?.custom.bluish_gray,
            },
            {
              label: 'Interview Scheduled',
              value: 'interviewScheduled',
              color: theme?.palette?.error?.main,
            },
            {
              label: 'Shortlisted',
              value: 'shortlisted',
              color: theme?.palette?.error?.main,
            },
            {
              label: 'Pending',
              value: 'pending',
              color: theme?.palette?.custom.bluish_gray,
            },
            {
              label: 'Rejected',
              value: 'rejected',
              color: theme?.palette?.error.main,
            },
            {
              label: 'Hired',
              value: 'hired',
              color: theme?.palette?.success.main,
            },
          ]}
        />
      ),
    },
  ];
};
