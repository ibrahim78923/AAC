import dayjs from 'dayjs';
import { DocumentIcon } from '@/assets/icons';
import {
  RHFMultiSearchableSelect,
  RHFSelect,
  RHFSwitchableDatepicker,
} from '@/components/ReactHookForm';
import StatusBadge from '@/components/StatusBadge';
import useJobApplication from './useJobApplication';
import * as Yup from 'yup';
import { DATE_FORMAT } from '@/constants';

export const jobApplicationValidationSchema = Yup.object().shape({
  candidateId: Yup.array().min(1).required('Field is Required'),
  applyDate: Yup.string().trim().required('Field is Required'),
  status: Yup.string().trim().required('Field is Required'),
});

export const jobApplicationDefaultValues = {
  candidateId: '',
  applyDate: '',
  status: '',
};

export const getFiltersDataArray = () => {
  const { dataUniqueCandidate } = useJobApplication();

  const getCandidates = () => {
    const candidatesArray = dataUniqueCandidate?.data;
    return candidatesArray?.map((item: any) => {
      return { value: item?._id, label: item?.name };
    });
  };

  return [
    {
      componentProps: {
        name: 'candidateId',
        label: 'Candidates',
        isCheckBox: true,
      },
      options: getCandidates(),
      component: RHFMultiSearchableSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'applyDate',
        label: 'Apply Date',
        fullWidth: true,
      },
      component: RHFSwitchableDatepicker,
      md: 12,
    },
    {
      componentProps: {
        name: 'status',
        label: 'Status',
        select: true,
      },
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'rejected', label: 'Rejected' },
        { value: 'shortlisted', label: 'Shortlisted' },
        { value: 'interviewed', label: 'Interviewed' },
      ],
      component: RHFSelect,
      md: 12,
    },
  ];
};

export const columns = (theme: any) => {
  const { handleUpdateStatus } = useJobApplication();
  return [
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
      cell: (info: any) => info?.row?.original?.candidate?.name,
    },
    {
      accessorFn: (row: any) => row.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Apply Date',
      cell: (info: any) => {
        const formattedDate = dayjs(info?.getValue()).format(DATE_FORMAT.UI);
        return formattedDate;
      },
    },
    {
      accessorFn: (row: any) => row.jobPostedDate,
      id: 'jobPostedDate',
      isSortable: true,
      header: 'Job Posted Date',
      cell: (info: any) => {
        const formattedDate = dayjs(info?.getValue()).format(DATE_FORMAT.UI);
        return formattedDate;
      },
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
      cell: (info: any) => {
        return (
          <StatusBadge
            key={info?.row?.original?._id}
            value={info?.row?.original?.status}
            onChange={(e: any) => {
              handleUpdateStatus(e?.target?.value, info?.row?.original?._id);
            }}
            options={[
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
                label: 'Shortlisted',
                value: 'shortlisted',
                color: theme?.palette?.error?.main,
              },
              {
                label: 'Interviewed',
                value: 'interviewed',
                color: theme?.palette?.custom.bluish_gray,
              },
            ]}
          />
        );
      },
    },
  ];
};
