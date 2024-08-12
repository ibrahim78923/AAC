import { ImportTab } from './ImportTab';
import { ExportTab } from './ExportTab';
import {
  AIR_OPERATIONS_DATA_MANAGEMENT_EXPORT_LIST_PERMISSIONS,
  AIR_OPERATIONS_DATA_MANAGEMENT_IMPORT_LIST_PERMISSIONS,
} from '@/constants/permission-keys';

export const dataManagementListTabs = () => {
  return [
    {
      _id: 1,
      name: 'Import',
      id: 'import',
      tabPermissions: [
        AIR_OPERATIONS_DATA_MANAGEMENT_IMPORT_LIST_PERMISSIONS?.FILTER_RECORD,
        AIR_OPERATIONS_DATA_MANAGEMENT_IMPORT_LIST_PERMISSIONS?.DOWNLOAD_RECORD,
        AIR_OPERATIONS_DATA_MANAGEMENT_IMPORT_LIST_PERMISSIONS?.SEARCH_RECORD,
      ],
      component: ImportTab,
      componentProps: {},
    },
    {
      _id: 2,
      name: 'Export',
      id: 'export',
      tabPermissions: [
        AIR_OPERATIONS_DATA_MANAGEMENT_EXPORT_LIST_PERMISSIONS?.SEARCH_RECORD,
        AIR_OPERATIONS_DATA_MANAGEMENT_EXPORT_LIST_PERMISSIONS?.DOWNLOAD_RECORD,
        AIR_OPERATIONS_DATA_MANAGEMENT_EXPORT_LIST_PERMISSIONS?.FILTER_RECORD,
      ],
      component: ExportTab,
      componentProps: {},
    },
  ];
};
