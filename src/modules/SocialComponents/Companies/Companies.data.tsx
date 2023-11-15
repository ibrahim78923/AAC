import { Checkbox } from '@mui/material';

export const companyTabs = ['All Companies', 'My Companies'];

export const columns: any = [
  {
    accessorFn: (row: any) => row?.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.owner,
    id: 'owner',
    cell: (info: any) => info?.getValue(),

    header: 'Company Owner',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    cell: (info: any) => info?.getValue(),

    header: 'Company Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.createdDate,
    id: 'createdDate',
    isSortable: true,
    header: 'Created Date',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.domainName,
    id: 'domainName',
    isSortable: true,
    header: 'Domain Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.crn,
    id: 'crn',
    isSortable: true,
    header: 'CRN',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.phoneNumber,
    id: 'phoneNumber',
    isSortable: true,
    header: 'Phone Number',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.industry,
    id: 'industry',
    isSortable: true,
    header: 'Industry',
    cell: (info: any) => info?.getValue(),
  },
];
