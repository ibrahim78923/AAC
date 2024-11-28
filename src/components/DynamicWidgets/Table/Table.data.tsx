import { CustomArrayTooltipData } from '@/components/CustomArrayTooltipData';
import { BACKEND_COLLECTION_NAME } from '@/constants/api';
import { DATA_TYPES, FIELD_TYPE } from '@/constants/strings';
import { camelCaseToTitleCase } from '@/utils/api';
import { fullName } from '@/utils/avatarUtils';
import { Typography } from '@mui/material';

export const TABLE_CELL_DATA_MAP: any = (item: any) => {
  return {
    [BACKEND_COLLECTION_NAME?.ASSET_TYPES]: fullName(item?.name),
    [BACKEND_COLLECTION_NAME?.LOCATION]: fullName(item?.locationName),
    [BACKEND_COLLECTION_NAME?.DEPARTMENT]: fullName(item?.name),
    [BACKEND_COLLECTION_NAME?.VENDORS]: fullName(item?.name),
    [BACKEND_COLLECTION_NAME?.USERS]: fullName(item?.firstName, item?.lastName),
    [BACKEND_COLLECTION_NAME?.SERVICE_CATEGORIES]: fullName(item?.categoryName),
    [BACKEND_COLLECTION_NAME?.DEAL_PIPELINES]: fullName(item?.name),
    [BACKEND_COLLECTION_NAME?.FORECAST_PIPELINES]: fullName(item?.name),
    [BACKEND_COLLECTION_NAME?.CONTRACT_TYPE]: fullName(item?.name),
  };
};

const tableCell = (item: any, column?: any) => {
  const value =
    column?.fieldType === FIELD_TYPE?.OBJECT_ID
      ? TABLE_CELL_DATA_MAP?.(item)?.[column?.collectionName] ?? '---'
      : item;
  if (Array?.isArray(item)) {
    const arrayData = !!item?.length ? (
      <CustomArrayTooltipData
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
      {typeof value === DATA_TYPES?.STRING
        ? value?.replace?.('_', ' ')?.toLowerCase()
        : value}
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
  <Typography
    variant="body2"
    fontWeight={'fontWeightMedium'}
    textTransform={'capitalize'}
  >
    {camelCaseToTitleCase(column?.fieldName, 'Id')}
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
