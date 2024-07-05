import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFSelect,
} from '@/components/ReactHookForm';
import {
  useGetDealsListQuery,
  useLazyGetUsersListDropdownQuery,
} from '@/services/airSales/deals';
import useDealTab from '../useDealTab';
import { getSession } from '@/utils';
import { ROLES } from '@/constants/strings';

export const defaultValues = (data: any) => {
  return {
    dealPipelineId: data?.dealPipelineId ? data?.dealPipelineId : null,
    dealName: data?.name ?? null,
    dealOwner: data?.ownerId ? data?.ownerId : null,
    dealStage: data?.dealStageId,
    dateStart:
      typeof data?.dateStart === 'object' ? new Date(data?.dateStart) : null,
    dateEnd: typeof data?.dateEnd === 'object' ? new Date(data?.dateEnd) : null,
  };
};

export const FilterData = (dealPipelineId: any) => {
  const { pipelineListDropdown } = useDealTab();
  const { user }: any = getSession();
  const organizationId: any = user?.organization?._id;

  const UserListData = useLazyGetUsersListDropdownQuery();

  const filteredStages: any = pipelineListDropdown
    ? pipelineListDropdown[1]?.data?.find(
        (pipeline: any) => pipeline?._id === dealPipelineId?._id,
      )?.stages
    : [];

  const { data } = useGetDealsListQuery({});

  return [
    {
      componentProps: {
        name: 'dealPipelineId',
        label: 'Deal Pipeline',
        placeholder: 'Select Pipeline',
        apiQuery: pipelineListDropdown,
        getOptionLabel: (option: any) => option?.name,
        externalParams: { meta: false },
        clearIcon: false,
      },
      component: RHFAutocompleteAsync,
    },

    {
      componentProps: {
        name: 'dealName',
        label: 'Deal Name',
        placeholder: 'Deal Name',
        select: true,
        options: data?.data?.deals?.map((item: any) => item?.name),
      },

      component: RHFAutocomplete,
    },
    {
      title: 'Deal Owner',
      componentProps: {
        name: 'dealOwner',
        label: 'Deal Owner',
        placeholder: 'Select Owner',
        apiQuery: UserListData,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: {
          role: ROLES?.ORG_EMPLOYEE,
          organization: organizationId,
        },
      },
      component: RHFAutocompleteAsync,
    },
    {
      componentProps: {
        label: 'Start Date',
        name: 'dateStart',
        fullWidth: true,
      },
      component: RHFDatePicker,
      md: 12,
    },
    {
      componentProps: {
        label: 'End Date',
        name: 'dateEnd',
        fullWidth: true,
      },
      component: RHFDatePicker,
      md: 12,
    },
    {
      componentProps: {
        name: 'dealStage',
        label: 'Deal Stage',
        select: true,
        disabled: !dealPipelineId,
      },
      options: filteredStages?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
      component: RHFSelect,
    },
  ];
};
