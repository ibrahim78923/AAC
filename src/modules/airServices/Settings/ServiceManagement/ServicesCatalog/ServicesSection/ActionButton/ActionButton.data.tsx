import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const getActionButtonMenuData = (
  handleCategory: any,
  handleStatus: any,
  handleVisibility: any,
  handleDelete: any,
) => [
  {
    id: 1,
    permission:
      AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.DELETE_MOVE_CATALOG_SERVICE,
    onClick: handleCategory,
    key: 'moveToCategory',
    label: 'Move To Category',
  },
  {
    id: 2,
    permission:
      AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.CHANGE_STATUS_OF_CATALOG_SERVICES,
    onClick: handleStatus,
    key: 'changeStatus',
    label: 'Change Status',
  },
  {
    id: 3,
    permission:
      AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.SET_VISIBILITY_OF_CATALOG_SERVICES,
    onClick: handleVisibility,
    key: 'visibility',
    label: (
      <>
        Visibility
        <ArrowForwardIosIcon fontSize="small" sx={{ ml: '2.5rem' }} />
      </>
    ),
  },
  {
    id: 4,
    permission:
      AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.DELETE_MOVE_CATALOG_SERVICE,
    onClick: handleDelete,
    key: 'delete',
    label: 'Delete',
  },
];
