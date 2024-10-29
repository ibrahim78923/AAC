import { Box, Button, ButtonGroup } from '@mui/material';

import { DeleteCrossIcon, ViewEyeIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';
import { capitalizeFirstLetter } from '@/utils/api';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

export const columns: any = ({
  setOpenDrawer,
  setIsOpenAlert,
  setSelectedProduct,
  // viewDeal,
  handleQuantityChange,
}: {
  setOpenDrawer: React.Dispatch<React.SetStateAction<string>>;
  setIsOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProduct: any;
  viewDeal: any;
  handleQuantityChange: (productId: number, quantity: number) => void;
}) => {
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'product_name',
      cell: (info: any) => capitalizeFirstLetter(info?.getValue()) ?? 'N/A',
      header: 'Product Name',
      isSortable: true,
    },

    {
      accessorFn: (row: any) => row?.quantity,
      id: 'quantity',
      isSortable: true,
      header: 'Quantity',
      cell: (info: any) => {
        return (
          <Box>
            <ButtonGroup>
              <Button
                className="small"
                color="inherit"
                variant="outlined"
                onClick={() => {
                  handleQuantityChange(
                    info?.row?.original?.productId,
                    info?.getValue() - 1,
                  );
                }}
              >
                <RemoveCircleOutline />
              </Button>
              <Button
                className="small"
                disabled
                color="inherit"
                variant="outlined"
              >
                {info?.getValue()}
              </Button>
              <Button
                className="small"
                color="inherit"
                variant="outlined"
                onClick={() => {
                  handleQuantityChange(
                    info?.row?.original?.productId,
                    info?.getValue() + 1,
                  );
                }}
              >
                <AddCircleOutline />
              </Button>
            </ButtonGroup>
          </Box>
        );
      },
    },

    {
      accessorFn: (row: any) => row?.unitPrice,
      id: 'phonenumber',
      isSortable: true,
      header: 'Amount',
      cell: (info: any) => (info?.getValue() ? `£ ${info?.getValue()}` : 'N/A'),
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
                setOpenDrawer('view'), setSelectedProduct(info?.row?.original);
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
