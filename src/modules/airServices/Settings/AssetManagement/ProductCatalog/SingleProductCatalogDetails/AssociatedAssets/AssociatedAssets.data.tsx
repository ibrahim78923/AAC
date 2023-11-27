import { DeleteForever } from '@mui/icons-material';
import dayjs from 'dayjs';

export const associatedAssetsData = [
  {
    _id: 1,
    displayName: "Andrea's laptop",
    usedBy: 'Andrea',
    department: 'IT',
    assetState: 'In Use',
    warrantyExpiryDate: '2023-11-06T10:34:00.891Z',
  },
];

export const getAssociatedAssetsColumns = (setIsDeleteModalOpen: any) => [
  {
    accessorFn: (row: any) => row?.displayName,
    id: 'displayName',
    isSortable: true,
    header: 'Display Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.usedBy,
    id: 'usedBy',
    isSortable: true,
    header: 'Used By',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.department,
    id: 'department',
    isSortable: true,
    header: 'Department',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.assetState,
    id: 'assetState',
    isSortable: true,
    header: 'Asset State',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.warrantyExpiryDate,
    id: 'warrantyExpiryDate',
    isSortable: true,
    header: 'Warranty Expiry Date',
    cell: (info: any) =>
      dayjs(info?.getValue()).format('dddd, MMMM DD, YYYY - HH:mm'),
  },
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    header: 'Action',
    cell: (info: any) => (
      <DeleteForever
        color={'error'}
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          setIsDeleteModalOpen({ open: true, id: info?.getValue() });
        }}
      />
    ),
  },
];
