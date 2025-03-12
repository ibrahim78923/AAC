import { TruncateText } from '@/components/TruncateText';
import { AIR_SERVICES } from '@/constants/routes';
import { uiDateFormat } from '@/lib/date-time';
import { tableCheckbox } from '@/utils/table-checkbox';

export const purchaseOrderColumnsFunction = (
  purchaseOrderData: any,
  setPurchaseOrderData: any,
  purchaseData: any = [],
  router: any,
): any => {
  return [
    tableCheckbox({
      selectedList: purchaseOrderData,
      setSelectedList: setPurchaseOrderData,
      tableData: purchaseData,
    }),
    {
      accessorFn: (row: any) => row?.orderNumber,
      id: 'orderNumber',
      isSortable: true,
      header: 'Order Number',
      cell: (info: any) => (
        <TruncateText
          text={info.getValue()?.toLowerCase()}
          boxProps={{
            sx: { cursor: 'pointer' },
            color: 'custom.bright',
            onClick: () =>
              router?.push({
                pathname: AIR_SERVICES?.ASSETS_PURCHASE_ORDER_DETAIL,
                query: {
                  purchaseOrderId: info?.row?.original?._id,
                },
              }),
          }}
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.orderName,
      id: 'orderName',
      header: 'Order Name',
      isSortable: true,
      cell: (info: any) => (
        <TruncateText text={info.getValue()?.toLowerCase()} />
      ),
    },
    {
      accessorFn: (row: any) => row?.vendors,
      id: 'vendorId',
      isSortable: true,
      header: 'Vendor',
      cell: (info: any) => (
        <TruncateText text={info.getValue()?.name?.toLowerCase()} />
      ),
    },
    {
      accessorFn: (row: any) => row?.expectedDeliveryDate,
      id: 'expectedDeliveryDate',
      isSortable: true,
      header: 'Expected Delivery Date',
      cell: (info: any) => uiDateFormat(info?.getValue()),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <TruncateText
          text={info?.getValue()?.toLowerCase()?.split('_')?.join(' ')}
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.subTotal,
      id: 'subTotal',
      isSortable: true,
      header: 'Total Cost (£)',
      cell: (info: any) => info?.getValue()?.toFixed(2),
    },
  ];
};
