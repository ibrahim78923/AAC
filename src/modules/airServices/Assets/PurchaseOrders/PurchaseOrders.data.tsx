import { Checkbox } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const data: any = [
  {
    id: 1,
    OrderNumber: 'PO-1',
    OrderName: 'Dell Laptop',
    Vendor: 'Dell',
    ExpectedDeliveryDate: '30 Mar, 2023',
    Status: 'Received',
    TotalCost: '1200',
  },
  {
    id: 2,
    OrderNumber: 'PO-2',
    OrderName: 'Apple Mouse',
    Vendor: '---',
    ExpectedDeliveryDate: '---',
    Status: '---',
    TotalCost: '---',
  },
];

export const purchaseOrderColumnsFunction = (
  purchaseOrderData: any,
  setPurchaseOrderData: any,
  meetingsMainData: any,
  router: any,
  handlePurchaseOrderDetail: (orderNumber: string) => void,
): any => {
  const theme = useTheme();
  return [
    {
      accessorFn: (row: any) => row.id,
      id: 'id',
      cell: (info: any) => (
        <Checkbox
          checked={
            !!purchaseOrderData.find((item: any) => item.id === info.getValue())
          }
          onChange={(e: any) => {
            e.target.checked
              ? setPurchaseOrderData([
                  ...purchaseOrderData,
                  meetingsMainData.find(
                    (item: any) => item.id === info.getValue(),
                  ),
                ])
              : setPurchaseOrderData(
                  purchaseOrderData.filter((item: any) => {
                    return item.id !== info.getValue();
                  }),
                );
          }}
          color="primary"
          name={info.getValue()}
        />
      ),
      header: (
        <Checkbox
          checked={purchaseOrderData.length === meetingsMainData.length}
          onChange={(e: any) => {
            e.target.checked
              ? setPurchaseOrderData([...meetingsMainData])
              : setPurchaseOrderData([]);
          }}
          color="primary"
          name="id"
        />
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.OrderNumber,
      id: 'Order Number',
      isSortable: true,
      header: <span>Order Number</span>,
      cell: (info: any) => (
        <span
          onClick={() =>
            router.push({
              pathname:
                'http://localhost:3000/air-services/assets/purchase-orders/detail',
              query: {
                purchaseOrderId: info?.row?.id,
              },
            })
          }
          style={{ color: '#0AADC7', cursor: 'pointer' }}
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorFn: (row: any) => row.OrderName,
      id: 'Order Name',
      header: <span>Order Name</span>,
      isSortable: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.Vendor,
      id: 'Vendor',
      isSortable: true,
      header: <span>Vendor</span>,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.ExpectedDeliveryDate,
      id: 'Expected Delivery Date',
      isSortable: true,
      header: <span>Expected Delivery Date</span>,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.Status,
      id: 'Status',
      isSortable: true,
      header: <span>Status</span>,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.TotalCost,
      id: 'Total Cost (£)',
      isSortable: true,
      header: <span>Total Cost (£)</span>,
      cell: (info: any) => info.getValue(),
    },
  ];
};
