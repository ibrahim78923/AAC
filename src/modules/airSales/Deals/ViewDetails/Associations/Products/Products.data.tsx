import { Box } from '@mui/material';

import { DeleteCrossIcon, ViewEyeIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';
export const columns: any = ({
  setOpenDrawer,
  setIsOpenAlert,
  setSelectedProduct,
  viewDeal,
}: {
  setOpenDrawer: React.Dispatch<React.SetStateAction<string>>;
  setIsOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProduct: any;
  viewDeal: any;
}) => {
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'product_name',
      cell: (info: any) => info?.getValue() ?? 'N/A',
      header: 'Product Name',
      isSortable: true,
    },

    {
      accessorFn: (row: any) => row?.quantity,
      id: 'quantity',
      isSortable: true,
      header: 'Quantity',
      cell: () => '01',
    },

    {
      accessorFn: (row: any) => row,
      id: 'phonenumber',
      isSortable: true,
      header: 'Amount',
      cell: () => viewDeal?.amount ?? 'N/A',
    },

    {
      accessorFn: (row: any) => row?.assignedTo,
      id: 'assignedTo',
      isSortable: false,
      header: 'Actions',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <PermissionsGuard
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_VIEW_PRODUCT]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setOpenDrawer('View'), setSelectedProduct(info?.row?.original);
              }}
            >
              <ViewEyeIcon />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_REMOVE_PRODUCT]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setIsOpenAlert(true), setSelectedProduct(info?.row?.original);
              }}
            >
              <DeleteCrossIcon />
            </Box>
          </PermissionsGuard>
        </Box>
      ),
    },
  ];
};
