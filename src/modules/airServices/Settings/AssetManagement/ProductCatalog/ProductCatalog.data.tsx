import { AIR_SERVICES } from '@/constants';
import {
  ASSET_TYPE,
  MODE_OF_PROCUREMENT,
  PRODUCT_CATALOG_STATUS,
} from '@/constants/strings';
import { Box, Typography } from '@mui/material';

export const productAssetTypeOption = [
  ASSET_TYPE?.HARDWARE,
  ASSET_TYPE?.SOFTWARE,
];

export const productCatalogStatusOption = [
  PRODUCT_CATALOG_STATUS?.PIPELINE,
  PRODUCT_CATALOG_STATUS?.IN_PRODUCTION,
  PRODUCT_CATALOG_STATUS?.RETIRED,
];

export const modeOfProcurementOption = [
  MODE_OF_PROCUREMENT?.BUY,
  MODE_OF_PROCUREMENT?.LEASE,
  MODE_OF_PROCUREMENT?.BOTH,
];

export const PRODUCT_LISTS_ACTION_CONSTANTS = {
  IMPORT: 'import',
};

export const productListsColumnDynamic: any = (router?: any) => {
  return [
    {
      accessorFn: (row: { name: string }) => row?.name,
      id: 'name',
      isSortable: true,
      header: 'Name',
      cell: (info: any) => (
        <Box
          onClick={() => {
            router?.push({
              pathname: AIR_SERVICES?.SINGLE_PRODUCT_CATALOG,
              query: {
                productCatalogId: info?.row?.original?._id,
              },
            });
          }}
          sx={{ cursor: 'pointer' }}
          color="custom.bright"
        >
          <Typography variant="body2" textTransform={'capitalize'}>
            {info?.getValue()?.toLowerCase() ?? '---'}
          </Typography>
        </Box>
      ),
    },
    {
      accessorFn: (row: { assetTypeName: string }) => row?.assetTypeName,
      id: 'assetTypeName',
      isSortable: true,
      header: 'Type',
      cell: (info: any) => (
        <Typography variant="body2" textTransform={'capitalize'}>
          {info?.getValue()?.toLowerCase() ?? '---'}
        </Typography>
      ),
    },
    {
      accessorFn: (row: { manufacturer: string }) => row?.manufacturer,
      id: 'manufacturer',
      isSortable: true,
      header: 'Manufacturer',
      cell: (info: any) => (
        <Typography variant="body2" textTransform={'capitalize'}>
          {info?.getValue()?.toLowerCase() ?? '---'}
        </Typography>
      ),
    },
    {
      accessorFn: (row: { status: string }) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => info?.getValue()?.replaceAll('_', ' '),
    },
  ];
};
