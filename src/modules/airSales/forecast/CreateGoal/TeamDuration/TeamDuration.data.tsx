import {
  RHFAutocompleteAsync,
  RHFRadioGroup,
  RHFSelect,
} from '@/components/ReactHookForm';
import { RADIO_VALUE } from '@/constants';
import { ROLES } from '@/constants/strings';
import { useLazyGetUsersListDropdownQuery } from '@/services/airSales/deals';
import { useLazyGetTeamsListQuery } from '@/services/airSales/settings/teams';
import { getSession } from '@/utils';
import * as Yup from 'yup';

export const teamDurationValidationSchema = Yup.object().shape({
  collaborators: Yup?.mixed()?.nullable()?.required('field is required'),
  selectTeams: Yup?.string(),
  duration: Yup?.string()?.required('field is required'),
  userTeam: Yup?.string(),
});

export const teamDurationDefaultValues = {
  // collaborators: {},
  selectTeams: '',
  duration: '',
  userTeam: 'USER',
};

export const teamDurationArray = (userTeamValue: any) => {
  const { user }: any = getSession();
  const organizationId: any = user?.organization?._id;

  const teamsList = useLazyGetTeamsListQuery();
  const userListData = useLazyGetUsersListDropdownQuery();

  return [
    {
      componentProps: {
        name: 'userTeam',
        fullWidth: true,
        defaultValue: 'USER',
        row: true,
        options: [
          { value: 'USER', label: 'Users' },
          { value: 'TEAM', label: `Teams` },
        ],
      },
      component: RHFRadioGroup,
      md: 12,
    },
    {
      componentProps: {
        name: 'collaborators',
        label: 'collaborators',
        required: true,
        fullWidth: true,
        placeholder:
          userTeamValue === RADIO_VALUE?.USER ? 'Select user' : 'Select team',
        multiple: true,
        apiQuery:
          userTeamValue === RADIO_VALUE?.USER ? userListData : teamsList,
        getOptionLabel: (item: any) =>
          userTeamValue === RADIO_VALUE?.USER
            ? item
              ? `${item?.firstName} ${item?.lastName}`
              : ''
            : item?.name,
        externalParams:
          userTeamValue === RADIO_VALUE?.USER
            ? {
                role: ROLES?.ORG_EMPLOYEE,
                organization: organizationId,
                status: 'ACTIVE',
              }
            : {},

        queryKey: 'role',
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        name: 'duration',
        label: 'Duration',
        fullWidth: true,
        select: true,
        required: true,
      },
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'Yearly', label: 'Yearly' },
        { value: 'custom', label: 'Custom' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'from',
        label: 'From',
        fullWidth: true,
      },
      component: 'RHFDatePicker',
      md: 6,
    },
    {
      componentProps: {
        name: 'to',
        label: 'To',
        fullWidth: true,
      },
      component: 'RHFDatePicker',
      md: 6,
    },
  ];
};
