import { DATE_FORMAT } from '@/constants';
import { DYNAMIC_FORM_FIELDS_TYPES } from '@/utils/dynamic-forms';
import dayjs from 'dayjs';

export const overviewDataArray = (inventoryData: any) => {
  const predefinedFields = {
    'Asset Type': inventoryData?.assetTypeDetails?.name ?? '---',
    Department: inventoryData?.departmentDetails?.name ?? '---',
    'End of Life':
      dayjs(inventoryData?.assetLifeExpiry)?.format(DATE_FORMAT?.UI) ?? '---',
    Impact: inventoryData?.impact ?? '---',
    Location: inventoryData?.locationDetails?.locationName ?? '---',
  };

  const customFields =
    inventoryData?.customFields &&
    typeof inventoryData?.customFields === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT
      ? Object?.keys(inventoryData?.customFields)?.reduce(
          (acc: any, key: any) => {
            acc[key] = inventoryData?.customFields[key] ?? '---';
            return acc;
          },
          {},
        )
      : {};

  return { ...predefinedFields, ...customFields };
};
