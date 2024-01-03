import { Checkbox } from '@mui/material';
// import { RHFTextField } from '@/components/ReactHookForm';
// import * as Yup from 'yup';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

// add new role drawer form data starts here

// export const validationSchema = Yup?.object()?.shape({
//   role: Yup?.string()?.required('Field is Required'),
//   description: Yup?.string()?.trim()?.required('Field is Required'),
// });

// export const defaultValues = {
//   role: '',
//   description: '',
// };

// export const dataArray = [
//   {
//     componentProps: {
//       label: 'Role ID',
//       name: 'roleId',
//       placeholder: 'Role ID',
//       fullWidth: true,
//       required: true,
//     },
//     component: RHFTextField,
//     md: 12,
//   },
//   {
//     componentProps: {
//       label: 'Role Name',
//       name: 'name',
//       placeholder: 'Role Name',
//       fullWidth: true,
//       required: true,
//     },
//     component: RHFTextField,
//     md: 12,
//   },
//   {
//     md: 12,
//     component: RHFTextField,
//     componentProps: {
//       name: 'description',
//       label: 'Description',
//       placeholder: 'Type',
//       fullWidth: true,
//       multiline: true,
//       rows: 3,
//     },
//   },
// ];

// add new role drawer form data ends here

// table data starts here
export const columns: any = (columnsProps: any) => {
  const { checkedRows, setCheckedRows } = columnsProps;

  const handleCheckboxChange = (val: any, rowId: string) => {
    val?.target?.checked ? setCheckedRows(rowId) : setCheckedRows();
  };
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          name={info?.getValue()}
          defaultChecked={checkedRows === info?.row?.id}
          onChange={(e: any) => handleCheckboxChange(e, info?.row?.id)}
        />
      ),
      header: <Checkbox disabled color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?._id,
      id: 'roleId',
      cell: (info: any) => info?.getValue(),
      header: 'Role ID',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'roleName',
      isSortable: true,
      header: 'Role Name',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdOn',
      isSortable: true,
      header: 'Created On',
      cell: (info: any) =>
        info?.getValue()
          ? dayjs(info?.getValue()).format(DATE_FORMAT?.UI)
          : 'N/A',
    },
    {
      accessorFn: (row: any) => row?.description,
      id: 'description',
      isSortable: true,
      header: 'Description',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
  ];
};
// table data ends here
export const permissionArr = [
  {
    id: '1',
    mainTitle: 'Deals',
    subModule: [
      {
        subTitle: 'Deals Details',
        mainCheck: 'All',
        fetaures: [
          {
            label: 'Copy Url',
          },
          {
            label: 'Create Dashboard',
          },
          {
            label: 'Update Dashboard',
          },
          {
            label: 'View Dashboard',
          },
          {
            label: 'View Dashboard',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    mainTitle: 'Tasks',
    subModule: [
      {
        subTitle: 'Tasks Details',
        mainCheck: 'All',
        fetaures: [
          {
            label: 'Copy Url',
          },
          {
            label: 'Create Dashboard',
          },
          {
            label: 'Update Dashboard',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    mainTitle: 'Forecast',
    subModule: [
      {
        subTitle: 'Forecast Details',
        mainCheck: 'All',
        fetaures: [
          {
            label: 'Copy Url',
          },
          {
            label: 'Create Dashboard',
          },
          {
            label: 'Update Dashboard',
          },
          {
            label: 'View Dashboard',
          },
          {
            label: 'View Dashboard',
          },
        ],
      },
    ],
  },
  {
    id: '4',
    mainTitle: 'Quotes',
    subModule: [
      {
        subTitle: 'Quotes Details',
        mainCheck: 'All',
        fetaures: [
          {
            label: 'Copy Url',
          },
          {
            label: 'Create Dashboard',
          },
          {
            label: 'Update Dashboard',
          },
          {
            label: 'View Dashboard',
          },
          {
            label: 'View Dashboard',
          },
        ],
      },
    ],
  },
];
