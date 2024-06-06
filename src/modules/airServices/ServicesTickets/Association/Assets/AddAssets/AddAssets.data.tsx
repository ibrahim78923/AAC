import { Checkbox, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { truncateText } from '@/utils/avatarUtils';

export const getAddAssetsColumns = ({
  theme,
  setSelected,
  selected,
  associatesAssetList,
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
          associatesAssetList?.length
            ? selected?.length === associatesAssetList?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelected(associatesAssetList?.map((asset: any) => asset?._id))
            : setSelected([]);
        }}
        disabled={!associatesAssetList?.length}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.displayName,
    id: 'displayName',
    cell: (info: any) => (
      <Typography variant="body4" color={theme?.palette?.custom?.bright}>
        {truncateText(info?.getValue())}
      </Typography>
    ),
    header: 'Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.assetTypeDetails?.name,
    id: 'assetType',
    isSortable: true,
    header: 'Asset Type',
    cell: (info: any) => (
      <Typography variant="body4">{truncateText(info?.getValue())}</Typography>
    ),
  },
];
