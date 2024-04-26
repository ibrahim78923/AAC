import { Checkbox } from '@mui/material';

export const data = [
  {
    id: 1,
    viewName: `Iphone import from Uk`,
    campaignOwner: 'Darlene Robertson',
    accessType: 'Everyone',
    campaignNotes: 'Marketing Campaigns',
  },
  {
    id: 2,
    viewName: `Laptop purchase deal`,
    campaignOwner: 'Cody Fisher',
    accessType: 'Private',
    campaignNotes: 'Marketing Campaigns',
  },
  {
    id: 3,
    viewName: `Mobile accessories`,
    campaignOwner: 'Darlene Robertson',
    accessType: 'Everyone',
    campaignNotes: 'Marketing Campaigns',
  },
  {
    id: 4,
    viewName: `Iphone import from Uk`,
    campaignOwner: 'Darlene Robertson',
    accessType: 'Everyone',
    campaignNotes: 'Marketing Campaigns',
  },
  {
    id: 5,
    viewName: `Laptop purchase deal`,
    campaignOwner: 'Darlene Robertson',
    accessType: 'Everyone',
    campaignNotes: 'Marketing Campaigns',
  },
];

export const columns = [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
    header: <Checkbox color="primary" name="id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.viewName,
    id: 'viewName',
    cell: (info: any) => info?.getValue(),
    header: 'View Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.campaignOwner,
    id: 'campaignOwner',
    isSortable: true,
    header: 'Campaign Owner',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.accessType,
    id: 'accessType',
    isSortable: true,
    header: 'Access Type',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.campaignNotes,
    id: 'campaignNotes',
    isSortable: true,
    header: 'Campaign Notes',
    cell: (info: any) => info?.getValue(),
  },
];
