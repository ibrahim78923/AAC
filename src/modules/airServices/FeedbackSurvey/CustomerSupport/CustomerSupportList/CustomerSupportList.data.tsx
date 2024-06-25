import { Checkbox, Chip, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { capitalizeFirstLetter, errorSnackbar } from '@/utils/api';

const statusColor = (status: string) => {
  switch (status) {
    case 'published':
      return 'secondary';
    case 'draft':
      return 'default';
    case 'inactive':
      return 'warning';
  }
};
const surveyType: any = {
  customerSupport: 'Customer Support',
  customerSatisfaction: 'Customer Satisfaction',
};
export const customerSupportListColumn = (
  activeCheck: any,
  setActiveCheck: any,
  feedbackTableData: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={
            !!activeCheck?.find((item: any) => item?._id === info?.getValue())
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setActiveCheck([
                  ...activeCheck,
                  feedbackTableData?.find(
                    (item: any) => item?._id === info?.getValue(),
                  ),
                ])
              : setActiveCheck(
                  activeCheck?.filter((item: any) => {
                    return item?._id !== info?.getValue();
                  }),
                );
          }}
          color="primary"
          name={info?.getValue()}
        />
      ),
      header: (
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={
            feedbackTableData?.length
              ? activeCheck?.length === feedbackTableData?.length
              : false
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setActiveCheck([...feedbackTableData])
              : setActiveCheck([]);
          }}
          color="primary"
          name="_id"
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.surveyTitle,
      id: 'surveyTitle',
      isSortable: true,
      header: 'Survey',
      cell: (info: any) => (
        <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
          {info?.getValue()}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <Chip
          color={statusColor(info?.getValue())}
          label={capitalizeFirstLetter(info?.getValue())}
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.surveyType,
      id: 'surveyType',
      isSortable: true,
      header: 'Survey Type',
      cell: (info: any) => surveyType[info?.getValue()],
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Creation Date',
      cell: (info: any) => info?.getValue(),
    },
  ];
};
export const feedbackDropdown = (activeCheck: any, setOpenModal: any) => [
  {
    id: 1,
    title: 'Inactive',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    id: 2,
    title: 'Clone',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    id: 3,
    title: 'Edit Survey',
    handleClick: (closeMenu: any) => {
      if (activeCheck?.length > 1) {
        errorSnackbar('Please select only one survey to edit');
        closeMenu?.();
        return;
      }
      closeMenu?.();
    },
  },
  {
    id: 4,
    title: 'Delete',
    handleClick: (closeMenu: any) => {
      setOpenModal(true);
      closeMenu?.();
    },
  },
];
