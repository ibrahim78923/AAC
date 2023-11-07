import { Checkbox } from '@mui/material';

export const companyTabs = ['All Companies', 'My Companies'];

export const columns: any = [
  {
    accessorFn: (row: any) => row.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.name,
    id: 'name',
    cell: (info: any) => info.getValue(),

    header: 'Company Owner',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.name,
    id: 'name',
    cell: (info: any) => info.getValue(),

    header: 'Company Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.createdBy,
    id: 'createdBy',
    isSortable: true,
    header: 'Created Date',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.createdBy,
    id: 'createdBy',
    isSortable: true,
    header: 'Domain Name',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.sharedLinks,
    id: 'sharedLinks',
    isSortable: true,
    header: 'CRN',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.reads,
    id: 'reads',
    isSortable: true,
    header: 'Phone Number',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.createdBy,
    id: 'createdBy',
    isSortable: true,
    header: 'Industry',
    cell: (info: any) => info.getValue(),
  },
];

export const companiesTableData = [
  {
    Id: 1,
    // img: PdfAvatarImage,
    name: 'My File.pdf',
    sharedLinks: '10',
    reads: '11',
    createdBy: 'John Doe',
  },
  {
    Id: 2,
    // img: PdfAvatarImage,
    name: 'World file',
    sharedLinks: '15',
    reads: '12',
    createdBy: 'John Doe',
  },
  {
    Id: 3,
    // img: PdfAvatarImage,
    name: 'File',
    sharedLinks: '20',
    reads: '12',
    createdBy: 'John Doe',
  },
  {
    Id: 4,
    // img: PdfAvatarImage,
    name: 'My Apps',
    sharedLinks: '22',
    reads: '14',
    createdBy: 'John Doe',
  },
  {
    Id: 5,
    // img: PdfAvatarImage,
    name: 'View',
    sharedLinks: '09',
    reads: '20',
    createdBy: 'John Doe',
  },
  {
    Id: 6,
    // img: PdfAvatarImage,
    name: 'Document',
    sharedLinks: '07',
    reads: '25',
    createdBy: 'John Doe',
  },
];
