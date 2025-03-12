import { PURCHASE_ORDER_STATUS } from '@/constants/services';
import { uiDateFormat } from '@/lib/date-time';
import { truncateText } from '@/utils/avatarUtils';
import { DYNAMIC_FORM_FIELDS_TYPES } from '@/utils/dynamic-forms';
import { Typography } from '@mui/material';

export const overviewDataArray = (purchaseOrderData: any) => {
  const predefinedFields = {
    Vendor: purchaseOrderData?.vendorDetails?.name ?? '---',
    Details: purchaseOrderData?.orderName ?? '---',
    Currency: purchaseOrderData?.currency ?? '---',
    Department: purchaseOrderData?.departmentDetails?.name ?? '---',
    'Expected Delivery Date':
      uiDateFormat(purchaseOrderData?.expectedDeliveryDate) ?? '---',
    Location: purchaseOrderData?.locationDetails?.locationName ?? '---',
    'Terms and conditions':
      truncateText(purchaseOrderData?.termAndCondition) ?? '---',
  };

  const customFields =
    purchaseOrderData?.customFields &&
    typeof purchaseOrderData?.customFields === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT
      ? Object?.keys(purchaseOrderData?.customFields)?.reduce(
          (acc: any, key: any) => {
            acc[key] = purchaseOrderData?.customFields[key] ?? '---';
            return acc;
          },
          {},
        )
      : {};
  return { ...predefinedFields, ...customFields };
};

export const overviewTableColumns: any = (
  handleRowClick: any,
  theme: any,
  orderStatus: string,
) => {
  const columns = [
    {
      accessorFn: (row: any) => row?.name ?? '-',
      id: 'name',
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
      accessorFn: (row: any) => row?.costPerItem ?? '-',
      id: 'costPerItem',
      header: 'Cost Per Item',
      cell: (info: any) => info?.getValue(),
    },
  ];
  if (
    orderStatus === PURCHASE_ORDER_STATUS?.RECEIVED ||
    orderStatus === PURCHASE_ORDER_STATUS?.PARTLY_RECEIVED
  ) {
    columns.push(
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
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.invoice,
      id: 'invoice',
      header: 'Invoice',
      cell: () => (
        <Typography
          sx={{ cursor: 'pointer' }}
          color={theme?.palette?.primary?.main}
          onClick={handleRowClick}
        >
          PDF
        </Typography>
      ),
    },
  );

  return columns;
};
