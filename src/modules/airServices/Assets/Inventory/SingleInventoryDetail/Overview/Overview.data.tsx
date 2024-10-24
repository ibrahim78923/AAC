import { uiDateFormat } from '@/lib/date-time';
import { DYNAMIC_FORM_FIELDS_TYPES } from '@/utils/dynamic-forms';

export const overviewDataArray = (inventoryData: any) => {
  const predefinedFields = {
    'Asset Type': inventoryData?.assetTypeDetails?.name ?? '---',
    Department: inventoryData?.departmentDetails?.name
      ? inventoryData.departmentDetails.name.charAt(0).toUpperCase() +
        inventoryData.departmentDetails.name.slice(1)
      : '---',
    'End of Life': uiDateFormat(inventoryData?.assetLifeExpiry) ?? '---',
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
