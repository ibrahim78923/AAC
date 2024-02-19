import { Checkbox, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';

export const drawerTableColumns = (
  selectedAssetToAssociateList: any,
  setSelectedAssetToAssociateList: any,
  associatesAssetList: any,
  theme: any,
): any => [
  {
    accessorFn: (row: any) => row?._id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!selectedAssetToAssociateList?.find(
            (item: any) => item === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedAssetToAssociateList([
                ...selectedAssetToAssociateList,
                info?.getValue(),
              ])
            : setSelectedAssetToAssociateList(
                selectedAssetToAssociateList?.filter(
                  (item: any) => item !== info?.getValue(),
                ),
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
            ? selectedAssetToAssociateList?.length ===
              associatesAssetList?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedAssetToAssociateList(
                associatesAssetList?.map((asset: any) => asset?._id),
              )
            : setSelectedAssetToAssociateList([]);
        }}
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
        {info?.getValue()}
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
      <Typography variant="body4">{info?.getValue()}</Typography>
    ),
  },
];
