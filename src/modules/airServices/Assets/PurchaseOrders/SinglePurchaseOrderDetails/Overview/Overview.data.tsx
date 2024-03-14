import { DATE_FORMAT } from '@/constants';
import { PURCHASE_ORDER_STATUS } from '@/constants/strings';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

export const overviewData = (purchaseOrderData: any) => [
  {
    id: purchaseOrderData?._id,
    heading: 'Purchase Details',
    detailsData: [
      {
        name: 'Vendor',
        detail: purchaseOrderData?.vendorDetails?.name ?? '---',
      },
      { name: 'Details', detail: purchaseOrderData?.orderName ?? '---' },
      { name: 'Currency', detail: purchaseOrderData?.currency ?? '---' },
      {
        name: 'Department',
        detail: purchaseOrderData?.departmentDetails?.name ?? '---',
      },
      {
        name: 'Expected delivery date',
        detail:
          dayjs(purchaseOrderData?.expectedDeliveryDate)?.format(
            DATE_FORMAT?.UI,
          ) ?? '---',
      },
      {
        name: 'Location',
        detail: purchaseOrderData?.locationDetails?.locationName ?? '---',
      },
      {
        name: 'Terms and conditions',
        detail:
          `${purchaseOrderData?.termAndCondition?.slice?.(0, 29)} ... ` ??
          '---',
      },
    ],
  },
];

export const overviewTableColumns: any = (
  setOpenOverviewModal: any,
  purchaseOrderDetailData: any,
  itemName: any,
  theme: any,
  orderStatus: string,
) => {
  const columns = [
    {
      accessorFn: (row: any) => row?.itemName,
      id: 'itemName',
      cell: () => (
        <Typography color={theme?.palette?.blue?.dull_blue}>
          {itemName}
        </Typography>
      ),
      header: 'Item Name',
    },
    {
      accessorFn: (row: any) => row?.description,
      id: 'description',
      header: 'Description',
      cell: (info: any) => (
        <Typography>
          {info?.getValue()?.length > 30
            ? `${info?.getValue()?.slice?.(0, 29)} ... `
            : info?.getValue()}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.costPerItem,
      id: 'costPerItem',
      header: 'Cost Per Item',
      cell: (info: any) => info?.getValue(),
    },
  ];
  if (orderStatus === PURCHASE_ORDER_STATUS?.RECEIVED) {
    columns.push(
      {
        accessorFn: (row: any) => row?.receivedVsOrdered,
        id: 'receivedVsOrdered',
        header: 'Received Vs Ordered',
        cell: () => (
          <Typography>
            {`${purchaseOrderDetailData?.map(
              (item: any) => item?.received,
            )}/${purchaseOrderDetailData?.map((item: any) => item?.quantity)}`}
          </Typography>
        ),
      },
      {
        accessorFn: (row: any) => row?.quantity,
        id: 'pending',
        header: 'Pending',
        cell: (info: any) =>
          info?.getValue(
            <Typography>
              {purchaseOrderDetailData?.map((item: any) => item?.quantity)}
            </Typography>,
          ),
      },
    );
  } else {
    columns.push({
      accessorFn: (row: any) => row?.quantity,
      id: 'quantity',
      header: 'Quantity',
      cell: (info: any) => info?.getValue(),
    });
  }
  columns.push(
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
      cell: () => (
        <Typography>
          {purchaseOrderDetailData?.map((item: any) => item?.total)}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.invoice,
      id: 'invoice',
      header: 'Invoice',
      cell: () => (
        <Typography
          sx={{ cursor: 'pointer' }}
          color={theme?.palette?.primary?.main}
          onClick={() => setOpenOverviewModal(true)}
        >
          PDF
        </Typography>
      ),
    },
  );

  return columns;
};
