import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { AIR_SERVICES, DATE_FORMAT } from '@/constants';
import { truncateText } from '@/utils/avatarUtils';
import { Checkbox, Typography } from '@mui/material';
import dayjs from 'dayjs';

export const purchaseOrderColumnsFunction = (
  purchaseOrderData: any,
  setPurchaseOrderData: any,
  purchaseData: any = [],
  router: any,
): any => {
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={
            !!purchaseOrderData?.find(
              (item: any) => item?._id === info?.getValue(),
            )
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setPurchaseOrderData([
                  ...purchaseOrderData,
                  purchaseData?.find(
                    (item: any) => item?._id === info?.getValue(),
                  ),
                ])
              : setPurchaseOrderData(
                  purchaseOrderData?.filter((item: any) => {
                    return item?._id !== info?.getValue();
                  }),
                );
          }}
          color="primary"
          name={info?.getValue()}
        />
      ),
      header: (
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={
            purchaseData?.length
              ? purchaseOrderData?.length === purchaseData?.length
              : false
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setPurchaseOrderData([...purchaseData])
              : setPurchaseOrderData([]);
          }}
          color="primary"
          name="_id"
        />
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.orderNumber,
      id: 'orderNumber',
      isSortable: true,
      header: 'Order Number',
      cell: (info: any) => (
        <Typography
          component="span"
          variant="body2"
          textTransform={'capitalize'}
          onClick={() =>
            router?.push({
              pathname: AIR_SERVICES?.ASSETS_PURCHASE_ORDER_DETAIL,
              query: {
                purchaseOrderId: info?.row?.original?._id,
              },
            })
          }
          color="custom.bright"
          sx={{ cursor: 'pointer' }}
        >
          {info?.getValue()?.toLowerCase() ?? '---'}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.orderName,
      id: 'orderName',
      header: 'Order Name',
      isSortable: true,
      cell: (info: any) => (
        <Typography variant="body2" textTransform={'capitalize'}>
          {info?.getValue()?.toLowerCase() ?? '---'}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.vendors,
      id: 'vendorId',
      isSortable: true,
      header: 'Vendor',
      cell: (info: any) => truncateText(info?.getValue()?.name),
    },
    {
      accessorFn: (row: any) => row?.expectedDeliveryDate,
      id: 'expectedDeliveryDate',
      isSortable: true,
      header: 'Expected Delivery Date',
      cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <Typography variant={'body2'} textTransform={'capitalize'}>
          {info?.getValue()?.toLowerCase()?.split('_')?.join(' ') ?? '---'}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.subTotal,
      id: 'subTotal',
      isSortable: true,
      header: 'Total Cost (£)',
      cell: (info: any) => info?.getValue(),
    },
  ];
};
