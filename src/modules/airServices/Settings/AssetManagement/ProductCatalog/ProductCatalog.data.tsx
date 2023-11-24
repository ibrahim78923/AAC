import { AIR_SERVICES } from '@/constants';
import { Box } from '@mui/material';

export const PRODUCT_LISTS_ACTION_CONSTANTS = {
  IMPORT: 'import',
};

export const productListsData: any = [
  {
    _id: 3,
    name: `Apple`,
    type: 'Laptop',
    manufacturer: 'Apple',
    status: 'In Production',
  },
];

export const productListsColumnDynamic: any = (router?: any) => {
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      isSortable: true,
      header: 'Name',
      cell: (info: any) => (
        <Box
          onClick={() => {
            router?.push({
              pathname: AIR_SERVICES?.SINGLE_PRODUCT_CATALOG,
              query: {
                productCatalogId: info?.getValue(),
              },
            });
          }}
          sx={{ cursor: 'pointer' }}
        >
          {info?.getValue()}
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.type,
      id: 'type',
      isSortable: true,
      header: 'Type',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.manufacturer,
      id: 'manufacturer',
      isSortable: true,
      header: 'Manufacturer',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => info?.getValue(),
    },
  ];
};
