import { DeleteForever } from '@mui/icons-material';

export const getAssociatedAssetsColumns = (setIsDeleteModalOpen: any) => [
  {
    accessorFn: (row: any) => row?.associatedAssets?.displayName,
    id: 'displayName',
    isSortable: true,
    header: 'Display Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.associatedAssets?.state,
    id: 'state',
    isSortable: true,
    header: 'Asset State',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.associatedAssets?._id,
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
