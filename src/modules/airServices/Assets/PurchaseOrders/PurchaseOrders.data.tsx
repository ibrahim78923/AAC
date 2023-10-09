import { Checkbox } from '@mui/material';

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
    OrderNumber: 'PO-1',
    OrderName: 'Apple Mouse',
    Vendor: '---',
    ExpectedDeliveryDate: '---',
    Status: '---',
    TotalCost: '---',
  },
];
export const columns = (
  meetingsData: any,
  setMeetingsData: any,
  meetingsMainData: any,
): any => [
  {
    accessorFn: (row: any) => row.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!meetingsData.find((item: any) => item.id === info.getValue())
        }
        onChange={(e: any) => {
          e.target.checked
            ? setMeetingsData([
                ...meetingsData,
                meetingsMainData.find(
                  (item: any) => item.id === info.getValue(),
                ),
              ])
            : setMeetingsData(
                meetingsData.filter((item: any) => {
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
        checked={meetingsData.length === meetingsMainData.length}
        onChange={(e: any) => {
          e.target.checked
            ? setMeetingsData([...meetingsMainData])
            : setMeetingsData([]);
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
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Order Number
      </span>
    ),
    cell: (info: any) => (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 500,
          fontSize: '14px',
          color: '#0AADC7',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorFn: (row: any) => row.OrderName,
    id: 'Order Name',
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Order Name
      </span>
    ),
    isSortable: true,
    cell: (info: any) => (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 500,
          fontSize: '14px',
          color: '#6B7280',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorFn: (row: any) => row.Vendor,
    id: 'Vendor',
    isSortable: true,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Vendor
      </span>
    ),
    cell: (info: any) => (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 500,
          fontSize: '14px',
          color: '#6B7280',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorFn: (row: any) => row.ExpectedDeliveryDate,
    id: 'Expected Delivery Date',
    isSortable: true,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Expected Delivery Date
      </span>
    ),
    cell: (info: any) => (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 500,
          fontSize: '14px',
          color: '#6B7280',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorFn: (row: any) => row.Status,
    id: 'Status',
    isSortable: true,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Status
      </span>
    ),
    cell: (info: any) => (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 500,
          fontSize: '14px',
          color: '#6B7280',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorFn: (row: any) => row.TotalCost,
    id: 'Total Cost (£)',
    isSortable: true,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Total Cost (£)
      </span>
    ),
    cell: (info: any) => (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 500,
          fontSize: '14px',
          color: '#6B7280',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
];
