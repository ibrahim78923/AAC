import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

export const overviewData = (inventoryData: any) => [
  {
    id: inventoryData?._id,
    heading: 'Inventory Details',
    detailsData: [
      {
        name: 'Asset Type',
        detail: inventoryData?.assetTypeDetails?.name ?? '---',
      },
      {
        name: 'Department',
        detail: inventoryData?.departmentDetails?.name ?? '---',
      },
      {
        name: 'End of Life',
        detail:
          dayjs(inventoryData?.assetLifeExpiry)?.format(DATE_FORMAT?.UI) ??
          '---',
      },
      { name: ' Impact', detail: inventoryData?.impact ?? '---' },
      {
        name: 'Discovery Enabled',
        detail: dayjs(inventoryData?.created)?.format(DATE_FORMAT?.UI) ?? '---',
      },
      {
        name: 'Location',
        detail: inventoryData?.locationDetails?.locationName ?? '---',
      },
    ],
  },
];
