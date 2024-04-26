import { PURCHASE_ORDER_STATUS } from '@/constants/strings';
import { truncateText } from '@/utils/avatarUtils';
import { Typography } from '@mui/material';

export const overviewTablePdfColumns: any = (
  theme: any,
  orderStatus: string,
) => {
  const columns = [
    {
      accessorFn: (row: any) => row?.name,
      id: 'itemName',
      cell: (info: any) => (
        <Typography color={theme?.palette?.blue?.dull_blue}>
          {info?.getValue()}
        </Typography>
      ),
      header: 'Item Name',
    },
    {
      accessorFn: (row: any) => row?.description,
      id: 'description',
      header: 'Description',
      cell: (info: any) => truncateText(info?.getValue()),
    },
    {
      accessorFn: (row: any) => row?.costPerItem,
      id: 'costPerItem',
      header: 'Cost Per Item',
      cell: (info: any) => info?.getValue(),
    },
  ];
  if (orderStatus === PURCHASE_ORDER_STATUS?.RECEIVED) {
    columns?.push(
      {
        accessorFn: (row: any) => row?.receivedVsOrdered,
        id: 'receivedVsOrdered',
        header: 'Received Vs Ordered',
        cell: (info: any) =>
          `${info?.row?.original?.received} / ${info?.row?.original?.quantity}`,
      },
      {
        accessorFn: (row: any) => row?.quantity,
        id: 'pending',
        header: 'Pending',
        cell: (info: any) => info?.getValue(),
      },
    );
  } else {
    columns?.push({
      accessorFn: (row: any) => row?.quantity,
      id: 'quantity',
      header: 'Quantity',
      cell: (info: any) => info?.getValue(),
    });
  }
  columns?.push(
    {
      accessorFn: (row: any) => row?.taxRate,
      id: 'taxRate',
      header: 'Tax Rate (%)',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.total,
      id: 'total',
      header: 'Total ()',
      cell: (info: any) => info?.getValue(),
    },
  );

  return columns;
};
