import { TruncateText } from '@/components/TruncateText';
import { tableCheckbox } from '@/utils/table-checkbox';

export const getAddPurchaseOrderColumns = ({
  setSelected,
  selected,
  associatesOrderList,
}: any) => [
  tableCheckbox({
    selectedList: selected,
    setSelectedList: setSelected,
    tableData: associatesOrderList,
  }),
  {
    accessorFn: (row: any) => row?.orderNumber,
    id: 'orderNumber',
    header: 'Order Number',
    isSortable: true,
    cell: (info: any) => <TruncateText text={info.getValue()?.toLowerCase()} />,
  },
  {
    accessorFn: (row: any) => row?.orderName,
    id: 'orderName',
    isSortable: true,
    header: 'Order Name',
    cell: (info: any) => <TruncateText text={info.getValue()?.toLowerCase()} />,
  },
  {
    accessorFn: (row: any) => row?.subTotal,
    id: 'subTotal',
    isSortable: true,
    header: 'Total Cost (£)',
    cell: (info: any) => info?.getValue(),
  },
];
