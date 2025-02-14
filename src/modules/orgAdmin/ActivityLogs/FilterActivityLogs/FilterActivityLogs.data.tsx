import { RHFAutocompleteAsync, RHFSelect } from '@/components/ReactHookForm';
import { ACTIVITY_LOGS_MODULE } from '@/constants/activity-logs';
import { AVTIVITY_LOGS_ROLE } from '@/constants/strings';

export const FilterArray = (
  orgUsersData,
  user,
  companyAccounts,
  organizations,
  role,
  selectedFiltersValues,
  allOrganizationsUsers,
) => {
  const { organization } = selectedFiltersValues;

  const organizationField = {
    componentProps: {
      label: 'Organisation',
      name: 'organization',
      fullWidth: true,
      placeholder: 'Select company',
      apiQuery: organizations,
      getOptionLabel: (option) => option?.name,
    },
    component: RHFAutocompleteAsync,
    md: 12,
  };

  const companyField = {
    componentProps: {
      label: 'Company',
      name: 'company',
      placeholder: 'Select Company',
      fullWidth: true,
      required: true,
      disabled:
        (role === AVTIVITY_LOGS_ROLE.SUPER_AMDIN && organization) ||
        role !== AVTIVITY_LOGS_ROLE.SUPER_AMDIN
          ? false
          : true,

      apiQuery: companyAccounts,
      getOptionLabel: (option) => option?.accountName,
      externalParams: {
        orgId: organization ? organization._id : user?.organization?._id,
        meta: false,
      },
    },
    component: RHFAutocompleteAsync,
    md: 12,
  };

  const moduleField = {
    componentProps: {
      name: 'module',
      label: 'Module',
      fullWidth: true,
      select: true,
    },
    options: Object.entries(ACTIVITY_LOGS_MODULE).map(([key, value]) => ({
      value: key,
      label: value,
    })),
    component: RHFSelect,
    md: 12,
  };

  //this will work with 100 percent for org admin
  //this will work for super admin if organization is not selected
  const firstUserField = {
    componentProps: {
      placeholder: 'Select user',
      name: 'user',
      label: 'Users',
      apiQuery: allOrganizationsUsers,
      getOptionLabel: (option) => `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
    md: 12,
  };

  const secondUserField = {
    componentProps: {
      placeholder: 'Select user',
      name: 'user',
      label: 'Users',
      apiQuery: orgUsersData,
      getOptionLabel: (option) => `${option?.firstName} ${option?.lastName}`,
      externalParams: {
        id: organization ? organization._id : user?.organization?._id,
        meta: false,
      },
    },
    component: RHFAutocompleteAsync,
    md: 12,
  };

  // Return fields based on the role
  if (role === AVTIVITY_LOGS_ROLE.SUPER_AMDIN) {
    return [
      organizationField,
      companyField,
      moduleField,
      !organization ? firstUserField : secondUserField,
    ];
  } else if (role === AVTIVITY_LOGS_ROLE.ORG_AMDIN || role === undefined) {
    return [companyField, moduleField, firstUserField];
  } else {
    return [moduleField];
  }
};
