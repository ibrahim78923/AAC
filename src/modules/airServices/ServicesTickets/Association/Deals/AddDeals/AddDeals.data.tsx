import { Checkbox, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { fullName, truncateText } from '@/utils/avatarUtils';

export const useAddDealsColumns = ({
  theme,
  setSelected,
  selected,
  associatesDealsList,
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
          associatesDealsList?.length
            ? selected?.length === associatesDealsList?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelected(associatesDealsList?.map((asset: any) => asset?._id))
            : setSelected([]);
        }}
        disabled={!associatesDealsList?.length}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.dealName,
    id: 'dealName',
    cell: (info: any) => (
      <Typography variant="body4" color={theme?.palette?.custom?.bright}>
        {truncateText(info?.getValue())}
      </Typography>
    ),
    header: 'Deal Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.dealOwner,
    id: 'dealOwner',
    header: 'Deal Owner',
    isSortable: true,
    cell: (info: any) =>
      fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
  },
  {
    accessorFn: (row: any) => row?.dealPipeline,
    id: 'dealPipeline',
    isSortable: true,
    header: 'Deal Pipeline',
    cell: (info: any) => info?.getValue() ?? '-',
  },
];
