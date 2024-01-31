import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import StatusBadge from '@/components/StatusBadge';
import { Box, Checkbox } from '@mui/material';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import useJobPosting from './useJobPosting';
import { DATE_FORMAT } from '@/constants';
import RHFSwitchableDatepicker from '@/components/ReactHookForm/RHFSwitchableDatepicker';

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
      name: 'numberOfVacency',
      label: 'Number of Vacancy',
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
export const jobPostingFiltersFields = () => {
  const { jopPostingData } = useJobPosting();
  const createdByOptions = jopPostingData?.data?.jobs?.reduce(
    (uniqueOptions: any, option: any) => {
      const createdById = option?.createdBy?._id;
      if (
        createdById &&
        !uniqueOptions.some((item: any) => item?.value === createdById)
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
        { value: 'OPEN', label: 'Open' },
        { value: 'CLOSE', label: 'Close' },
      ],
      component: RHFSelect,
      md: 12,
    },
  ];
};

export const columns = (
  theme: any,
  selectedRow: any,
  setSelectedRow: any,
  setIsActionsDisabled: (value: boolean) => void,
  setRowId: any,
) => {
  const { handleUpdateStatus } = useJobPosting();
  const handleRowClick = (id: any) => {
    const selectedIndex = selectedRow?.indexOf(id);
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRow, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRow.slice(1));
    } else if (selectedIndex === selectedRow.length - 1) {
      newSelected = newSelected.concat(selectedRow.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRow.slice(0, selectedIndex),
        selectedRow.slice(selectedIndex + 1),
      );
    }
    setSelectedRow(newSelected);
    setIsActionsDisabled(newSelected.length === 0);
    if (newSelected.length === 1) {
      setRowId(newSelected[0]);
    } else {
      setRowId(null);
    }
  };

  // Select All Row
  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    rows: any,
  ) => {
    if (event?.target?.checked) {
      const newSelected = rows?.map((n: any) => n?._id);
      setSelectedRow(newSelected);
      setIsActionsDisabled(false);
      return;
    }
    setSelectedRow([]);
    setIsActionsDisabled(true);
  };

  const isSelected = (id: any) => selectedRow?.indexOf(id) !== -1;
  return [
    {
      accessorFn: (row: any) => row._id,
      id: '_id',
      cell: (info: any) => {
        return (
          <Checkbox
            color="primary"
            checked={isSelected(info?.cell?.row?.original?._id)}
            name={info?.cell?.row?.original?._id}
            onClick={() => {
              handleRowClick(info?.cell?.row?.original?._id);
            }}
          />
        );
      },
      header: (info: any) => {
        const rows = info?.table?.options?.data;
        return (
          <Checkbox
            color="primary"
            indeterminate={
              selectedRow?.length > 0 && selectedRow?.length < rows?.length
            }
            checked={
              rows?.length > 0 &&
              selectedRow?.length === info?.table?.options?.data?.length
            }
            onChange={(event) => handleSelectAllClick(event, rows)}
          />
        );
      },
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
      header: <Box sx={{ textTransform: 'none' }}>No. of Vacancy</Box>,
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
      cell: (info: any) => {
        const formattedDate = dayjs(info?.getValue()).format(DATE_FORMAT.UI);
        return formattedDate;
      },
    },
    {
      accessorFn: (row: any) => row?.status,
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
                label: 'Open',
                value: 'OPEN',
                color: theme?.palette?.custom?.bluish_gray,
              },
              {
                label: 'Close',
                value: 'CLOSE',
                color: theme?.palette?.error?.main,
              },
            ]}
          />
        );
      },
    },
  ];
};
