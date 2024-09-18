import { Checkbox } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { TruncateText } from '@/components/TruncateText';

export const getAddPurchaseOrderColumns = ({
  setSelected,
  selected,
  associatesOrderList,
}: any) => [
  {
    accessorFn: (row: any) => row?._id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={!!selected?.find((item: any) => item === info?.getValue())}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelected([...selected, info?.getValue()])
            : setSelected(
                selected?.filter((item: any) => item !== info?.getValue()),
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
          associatesOrderList?.length
            ? selected?.length === associatesOrderList?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelected(associatesOrderList?.map((asset: any) => asset?._id))
            : setSelected([]);
        }}
        disabled={!associatesOrderList?.length}
        color="primary"
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
    cell: (info: any) => <TruncateText text={info.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.orderName,
    id: 'orderName',
    isSortable: true,
    header: 'Order Name',
    cell: (info: any) => <TruncateText text={info.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.subTotal,
    id: 'subTotal',
    isSortable: true,
    header: 'Total Cost (£)',
    cell: (info: any) => info?.getValue(),
  },
];
