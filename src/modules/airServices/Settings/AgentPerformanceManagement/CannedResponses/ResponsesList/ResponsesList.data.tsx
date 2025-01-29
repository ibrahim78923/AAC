import { CANNED_RESPONSES, SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const responsesListActionsDynamic = (
  setPortalAction: any,
  selectedData: any,
) => [
  {
    id: 1,
    title: 'Edit',
    disabled: selectedData?.length > SELECTED_ARRAY_LENGTH?.ONE,
    permissionKey: [
      AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.SEARCH_EDIT_DELETE_CANNED_RESPONSES,
    ],
    handleClick: (close: () => void) => {
      setPortalAction(CANNED_RESPONSES?.EDIT);
      close();
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: [
      AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.SEARCH_EDIT_DELETE_CANNED_RESPONSES,
    ],
    handleClick: (close: () => void) => {
      setPortalAction(CANNED_RESPONSES?.DELETE);
      close();
    },
  },
  {
    id: 3,
    title: 'Move',
    permissionKey: [
      AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.SEARCH_EDIT_DELETE_CANNED_RESPONSES,
    ],
    handleClick: (close: () => void) => {
      setPortalAction(CANNED_RESPONSES?.MOVE);
      close();
    },
  },
];
