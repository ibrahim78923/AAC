import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { ROLES } from '@/constants/strings';

export const reAssignTaskDefaultValues = (data: any) => {
  return {
    assignTo: data?.assignTo || null,
  };
};

export const assignModalData = (usersData: any, orgId: string) => {
  return [
    {
      md: 12,
      componentProps: {
        label: 'Assigned to',
        name: 'assignTo',
        placeholder: 'Select option',
        apiQuery: usersData,
        externalParams: {
          organization: orgId,
          role: ROLES?.ORG_EMPLOYEE,
        },
        getOptionLabel: (option: any) =>
          option?.firstName + ' ' + option?.lastName,
      },
      component: RHFAutocompleteAsync,
    },
  ];
};
