import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { NextRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants/routes';
import { errorSnackbar } from '@/lib/snackbar';

export const getBusinessHoursOptions = (
  setOpenModal: ((isOpen?: boolean) => void) | any,
  businessHour: any,
  router: NextRouter,
) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [
      AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.EDIT_DELETE_BUSINESS_HOUR,
    ],
    handleClick: (closeMenu: any) => {
      router?.push({
        pathname: AIR_SERVICES?.UPSERT_BUSINESS_HOUR,
        query: { id: businessHour?._id },
      });
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: [
      AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.EDIT_DELETE_BUSINESS_HOUR,
    ],
    handleClick: (closeMenu: () => void) => {
      if (businessHour?.perDefine) {
        errorSnackbar("You can't delete default business hour");
        return;
      }
      setOpenModal({
        delete: true,
        id: businessHour?._id,
      });
      closeMenu();
    },
  },
];
