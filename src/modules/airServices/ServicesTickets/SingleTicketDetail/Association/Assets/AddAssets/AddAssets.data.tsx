import { TruncateText } from '@/components/TruncateText';
import { CheckboxField } from '@/components/InputFields/CheckboxField';

export const getAddAssetsColumns = ({
  setSelected,
  selected,
  associatesAssetList,
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
          associatesAssetList?.length
            ? selected?.length === associatesAssetList?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelected(associatesAssetList?.map((asset: any) => asset?._id))
            : setSelected([]);
        }}
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.displayName,
    id: 'displayName',
    header: 'Name',
    isSortable: true,
    cell: (info: any) => <TruncateText text={info.getValue()?.toLowerCase()} />,
  },
  {
    accessorFn: (row: any) => row?.assetTypeDetails?.name,
    id: 'assetTypeDetails.name',
    isSortable: true,
    header: 'Asset Type',
    cell: (info: any) => <TruncateText text={info.getValue()?.toLowerCase()} />,
  },
];
