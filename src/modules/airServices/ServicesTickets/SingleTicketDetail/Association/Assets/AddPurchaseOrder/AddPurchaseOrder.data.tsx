import { TruncateText } from '@/components/TruncateText';
import { CheckboxField } from '@/components/InputFields/CheckboxField';

export const getAddPurchaseOrderColumns = ({
  setSelected,
  selected,
  associatesOrderList,
}: any) => [
  {
    accessorFn: (row: any) => row?._id,
    id: 'id',
    cell: (info: any) => (
      <CheckboxField
        checked={!!selected?.find((item: any) => item === info?.getValue())}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelected([...selected, info?.getValue()])
            : setSelected(
                selected?.filter((item: any) => item !== info?.getValue()),
              );
        }}
        name={info?.getValue()}
      />
    ),
    header: (
      <CheckboxField
        checked={
          associatesOrderList?.length
            ? selected?.length === associatesOrderList?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelected(associatesOrderList?.map((asset: any) => asset?._id))
            : setSelected([]);
        }}
        name="id"
      />
    ),
    isSortable: false,
  },
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
