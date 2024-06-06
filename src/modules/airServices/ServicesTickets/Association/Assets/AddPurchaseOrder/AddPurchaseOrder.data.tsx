import { Checkbox, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { truncateText } from '@/utils/avatarUtils';

export const getAddPurchaseOrderColumns = ({
  theme,
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
    cell: (info: any) => (
      <Typography variant="body4" color={theme?.palette?.custom?.bright}>
        {truncateText(info?.getValue())}
      </Typography>
    ),
    header: 'Order Number',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.orderName,
    id: 'orderName',
    isSortable: true,
    header: 'Order Name',
    cell: (info: any) => truncateText(info?.getValue()),
  },
  {
    accessorFn: (row: any) => row?.subTotal,
    id: 'subTotal',
    isSortable: true,
    header: 'Total Cost (£)',
    cell: (info: any) => info?.getValue(),
  },
];
