import { CustomChips } from '@/components/CustomChips';
import { COLLECTION_NAME, FIELD_TYPE } from '@/constants/strings';
import { fullName } from '@/utils/avatarUtils';
import { Typography } from '@mui/material';

export const TABLE_CELL_DATA_MAP: any = (item: any) => {
  return {
    [COLLECTION_NAME?.ASSET_TYPES]: fullName(item?.name),
    [COLLECTION_NAME?.LOCATION]: fullName(item?.locationName),
    [COLLECTION_NAME?.DEPARTMENT]: fullName(item?.name),
    [COLLECTION_NAME?.VENDORS]: fullName(item?.name),
    [COLLECTION_NAME?.USERS]: fullName(item?.firstName, item?.lastName),
    [COLLECTION_NAME?.SERVICE_CATEGORIES]: fullName(item?.categoryName),
    [COLLECTION_NAME?.DEAL_PIPELINES]: fullName(item?.name),
    [COLLECTION_NAME?.SALES_PIPELINES]: fullName(item?.name),
    [COLLECTION_NAME?.CONTRACT_TYPE]: fullName(item?.name),
    [COLLECTION_NAME?.USERS]: fullName(item?.firstName, item?.lastName),
  };
};

const tableCell = (item: any, column?: any) => {
  const value =
    column?.fieldType === FIELD_TYPE?.OBJECT_ID
      ? TABLE_CELL_DATA_MAP?.(item)?.[column?.collectionName] ?? '---'
      : item;
  if (Array?.isArray(item)) {
    const arrayData = !!item?.length ? (
      <CustomChips
        data={item?.map((item: any, index: number) => {
          return {
            label:
              TABLE_CELL_DATA_MAP?.(item)?.[column?.collectionName] ?? item,
            _id: index + 1,
          };
        })}
      />
    ) : (
      '---'
    );
    return arrayData;
  }
  return !!item ? (
    <Typography variant="body2" textTransform={'capitalize'}>
      {value?.replace?.('_', ' ')?.toLowerCase()}
    </Typography>
  ) : (
    '---'
  );
};

const tableCellData = (info: any, column: any) => {
  if (column?.fieldType === FIELD_TYPE?.OBJECT_ID)
    return tableCell?.(info?.getValue(), column) ?? '---';
  return tableCell?.(info?.getValue());
};

const header = (column: any) => (
  <Typography variant="body2" fontWeight={600} textTransform={'capitalize'}>
    {column?.fieldName}
  </Typography>
);

export const makeDynamicColumn = (tableColumns: any) => {
  return tableColumns?.length
    ? tableColumns?.map((column: any) => ({
        accessorFn: (row: any) => row?.[column?.fieldName],
        id: column?.fieldName,
        header: header?.(column),
        cell: (info: any) => tableCellData?.(info, column),
      }))
    : [];
};
