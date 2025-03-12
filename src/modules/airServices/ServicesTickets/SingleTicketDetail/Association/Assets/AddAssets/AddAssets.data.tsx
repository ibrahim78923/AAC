import { TruncateText } from '@/components/TruncateText';
import { tableCheckbox } from '@/utils/table-checkbox';

export const getAddAssetsColumns = ({
  setSelected,
  selected,
  associatesAssetList,
}: any) => [
  tableCheckbox({
    selectedList: selected,
    setSelectedList: setSelected,
    tableData: associatesAssetList,
  }),
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
