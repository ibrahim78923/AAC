import { Checkbox, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { TruncateText } from '@/components/TruncateText';

export const useAddDealsColumns = ({
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
    accessorFn: (row: any) => row?.name,
    id: 'name',
    cell: (info: any) => <TruncateText text={info.getValue()?.toLowerCase()} />,
    header: 'Deal Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.dealOwner?.name,
    id: 'dealOwner.name',
    header: 'Deal Owner',
    isSortable: true,
    cell: (info: any) => <TruncateText text={info.getValue()?.toLowerCase()} />,
  },
  {
    accessorFn: (row: any) => row?.dealPipeline,
    id: 'dealPipeline',
    isSortable: true,
    header: 'Deal Pipeline',
    cell: (info: any) => (
      <Typography variant={'body2'} textTransform={'capitalize'}>
        {info?.getValue()?.toLowerCase() ?? '---'}
      </Typography>
    ),
  },
];
