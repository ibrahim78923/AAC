import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { styles } from './StepLineItems.style';
import { EditYellowBgIcon, ViewEyeIcon, TrashIcon } from '@/assets/icons';
import { capitalizeFirstLetters } from '@/utils';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import dayjs from 'dayjs';
import { DATE_FORMAT, indexNumbers } from '@/constants';
import useStepLineItems from './useStepLineItems';
import { AIR_SALES } from '@/routesConstants/paths';

export const lineItemsColumns: any = (
  handleAction: any,
  handleDeleteDeals: any,
  handleQuantityChange: any,
) => {
  const { router, producttUpdateType } = useStepLineItems();
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'productName',
      header: 'Product Name',
      isSortable: true,
      cell: (info: any) => capitalizeFirstLetters(info?.getValue()),
    },
    {
      accessorFn: (row: any) => row?.unitPrice ?? 'N/A',
      id: 'unitPrice',
      isSortable: true,
      header: 'Unit Price',
      cell: (info: any) => <>£ {info?.getValue()}</>,
    },
    {
      accessorFn: (row: any) => row?.quantity ?? 'N/A',
      id: 'quantity',
      isSortable: true,
      header: 'Quantity',
      cell: (info: any) => info?.row?.original?.quantity ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.additionalQuantity ?? 'N/A',
      id: 'additionalQuantity',
      isSortable: true,
      header: 'Additional Quantity',
      cell: (info: any) => {
        return (
          <Box>
            <ButtonGroup>
              <Button
                className="small"
                color="inherit"
                variant="outlined"
                onClick={() =>
                  handleQuantityChange(
                    info?.row?.original,
                    producttUpdateType?.decrement_quantity,
                  )
                }
              >
                <RemoveCircleOutline />
              </Button>
              <Button
                className="small"
                color="inherit"
                variant="outlined"
                disabled
              >
                {info?.row?.original?.additionalQuantity ?? 0}
              </Button>
              <Button
                className="small"
                color="inherit"
                variant="outlined"
                onClick={() =>
                  handleQuantityChange(
                    info?.row?.original,
                    producttUpdateType?.increment_quantity,
                  )
                }
              >
                <AddCircleOutline />
              </Button>
            </ButtonGroup>
          </Box>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.unitDiscount ?? 'N/A',
      id: 'unitDiscount',
      isSortable: true,
      header: 'Unit Discount',
      cell: (info: any) => {
        return (
          <Box>
            <ButtonGroup>
              <Button
                className="small"
                color="inherit"
                variant="outlined"
                onClick={() =>
                  handleQuantityChange(
                    info?.row?.original,
                    producttUpdateType?.decrement_discount,
                  )
                }
              >
                <RemoveCircleOutline />
              </Button>
              <Button
                className="small"
                color="inherit"
                variant="outlined"
                disabled
              >
                {info?.row?.original?.unitDiscount ?? 0}
              </Button>
              <Button
                className="small"
                color="inherit"
                variant="outlined"
                onClick={() =>
                  handleQuantityChange(
                    info?.row?.original,
                    producttUpdateType?.increment_discount,
                  )
                }
              >
                <AddCircleOutline />
              </Button>
            </ButtonGroup>
          </Box>
        );
      },
    },
    {
      accessorFn: (row: any) => row,
      id: 'totalPrice',
      isSortable: true,
      header: 'Total Additional Price',
      cell: (info: any) =>
        info?.row?.original?.additionalQuantity !== indexNumbers?.ZERO
          ? `£ ${
              info?.row?.original?.unitPrice *
                info?.row?.original?.additionalQuantity -
              info?.row?.original?.unitDiscount
            }`
          : `£0`,
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) =>
        info?.row?.original?.createdAt
          ? dayjs(info?.getValue()).format(DATE_FORMAT?.UI)
          : 'N/A',
    },
    {
      accessorFn: (row: any) => row?.productId,
      id: 'productId',
      header: 'Actions',
      cell: (info: any) => (
        <Stack direction="row" gap="8px">
          <Box
            sx={styles?.actionBtn}
            onClick={() => {
              handleAction(info?.getValue(), 'view');
            }}
          >
            <ViewEyeIcon />
          </Box>
          <Box
            sx={styles?.actionBtn}
            onClick={() => router?.push(AIR_SALES?.SETTINGS)}
          >
            <EditYellowBgIcon />
          </Box>
          <Box
            sx={styles?.actionBtn}
            onClick={() => handleDeleteDeals(info?.getValue())}
          >
            <TrashIcon />
          </Box>
        </Stack>
      ),
    },
  ];
};

export const discountsData = [
  { id: '1', label: 'Loyalty Discounts', value: '£ 20' },
  { id: '2', label: 'Voucher or gift card', value: '£ 10' },
  { id: '3', label: 'Total Redeemed Discounts', value: '£ 25' },
];
export const rewardsData = [
  { label: 'Cap', pts: '100pts' },
  { label: 'Diary', pts: '200pts' },
  { label: 'Pen', pts: '50pts' },
];
