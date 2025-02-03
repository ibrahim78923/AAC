import { ARRAY_INDEX, SELECTED_ARRAY_LENGTH } from '@/constants/strings';

export const filteredArrayDummyDataByKey = (
  array: any = [],
  checkKey: any = '',
  includeData: any = [],
) => {
  const includeSet = new Set(includeData);
  return array?.filter(
    (item: any) =>
      item &&
      item?.[checkKey] !== undefined &&
      item?.[checkKey] !== null &&
      item?.[checkKey] !== '' &&
      (includeData?.length === 0 || includeSet?.has(item?.[checkKey])),
  );
};

export const groupArrayByKey = (
  array: any = [],
  groupByKey: any = '',
  canFilterArray: any = { filter: true, includeData: [] },
) => {
  const filteredArray = canFilterArray?.filter
    ? filteredArrayDummyDataByKey?.(
        array,
        groupByKey,
        canFilterArray?.includeData,
      )
    : array;

  return filteredArray?.reduce((accumulator: any, currentItem: any) => {
    const key = currentItem?.[groupByKey];
    if (!accumulator?.[key]) {
      accumulator[key] = [];
    }
    accumulator[key]?.push(currentItem);
    return accumulator;
  }, {});
};

export const checkPermissions = (
  currentPermissions: string[],
  modulePermissions: string[],
): boolean => {
  if (!modulePermissions?.length) return false;
  if (modulePermissions?.length === SELECTED_ARRAY_LENGTH?.ONE) {
    return currentPermissions?.includes(modulePermissions?.[ARRAY_INDEX?.ZERO]);
  }
  const permissionsSet = new Set(modulePermissions);
  return currentPermissions?.some(
    (permission) => permissionsSet?.has(permission),
  );
};
