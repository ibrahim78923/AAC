import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { AIR_SERVICES } from '@/constants';
import { Checkbox, Typography } from '@mui/material';

export const purchaseOrderColumnsFunction = (
  purchaseOrderData: any,
  setPurchaseOrderData: any,
  purchaseData: any,
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
          checked={purchaseOrderData?.length === purchaseData?.length}
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
      header: <span>Order Number</span>,
      cell: (info: any) => (
        <Typography
          component="span"
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
          {info?.getValue()}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.orderName,
      id: 'orderName',
      header: <span>Order Name</span>,
      isSortable: true,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.vendorId,
      id: 'vendorId',
      isSortable: true,
      header: <span>Vendor</span>,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.expectedDeliveryDate,
      id: 'expectedDeliveryDate',
      isSortable: true,
      header: <span>Expected Delivery Date</span>,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: <span>Status</span>,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.subTotal,
      id: 'subTotal',
      isSortable: true,
      header: <span>Total Cost (£)</span>,
      cell: (info: any) => info?.getValue(),
    },
  ];
};
