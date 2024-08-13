import { AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const getCannedResponseDropdownOptions = (
  setOpenModal: ((isOpen?: boolean) => void) | any,
  response: any,
) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [
      AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.EDIT_DELETE_CUSTOM_FOLDERS,
    ],
    handleClick: (closeMenu: any) => {
      setOpenModal({
        create: true,
        delete: false,
        editData: response,
      });
      closeMenu();
    },
  },
  {
    id: 3,
    title: 'Delete',
    permissionKey: [
      AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.EDIT_DELETE_CUSTOM_FOLDERS,
    ],
    handleClick: (closeMenu: any) => {
      setOpenModal({
        create: false,
        delete: true,
        editData: response,
      });
      closeMenu();
    },
  },
];
