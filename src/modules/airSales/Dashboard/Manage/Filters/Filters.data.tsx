import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import { PRODUCT_USER_STATUS, ROLES } from '@/constants/strings';
import { useLazyGetUsersListDropdownQuery } from '@/services/airSales/deals';
import { getSession } from '@/utils';

export const dataArray = () => {
  const { user }: any = getSession();
  const organizationId: any = user?.organization?._id;
  const UserListData = useLazyGetUsersListDropdownQuery();
  return [
    {
      componentProps: {
        name: 'owner',
        label: 'Owner',
        placeholder: 'Select Owner',
        apiQuery: UserListData,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: {
          role: ROLES?.ORG_EMPLOYEE,
          organization: organizationId,
          status: PRODUCT_USER_STATUS?.ACTIVE,
        },
      },
      component: RHFAutocompleteAsync,
    },
    {
      componentProps: {
        name: 'accessRights',
        label: 'Access Rights',
        placeholder: 'Select access rights',
        fullWidth: true,
        options: [
          'Private to owner',
          'Everyone (View and edit)',
          'Everyone (View)',
          'SpecialUser',
        ],
      },
      component: RHFAutocomplete,
      md: 12,
    },
  ];
};
