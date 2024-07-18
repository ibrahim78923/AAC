import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import { ROLES } from '@/constants/strings';
import {
  useLazyGetAllCampaignsListQuery,
  useLazyGetDealOwnersListQuery,
} from '@/services/common-APIs';
import { getSession } from '@/utils';

export const defaultValues = {
  taskStatus: '',
  assignee: null,
  campaignId: null,
  taskType: '',
};

export const dataArray = () => {
  const { user }: any = getSession();
  const orgId = user?.organization?._id;
  const campaignsList = useLazyGetAllCampaignsListQuery();
  const userListData = useLazyGetDealOwnersListQuery();

  return [
    {
      componentProps: {
        name: 'taskStatus',
        label: 'Task Status',
        fullWidth: true,
        placeholder: 'Select status',
        options: ['All', 'Pending', 'In progress', 'Completed'],
      },
      component: RHFAutocomplete,
      md: 12,
    },
    {
      componentProps: {
        placeholder: 'Select assignee',
        name: 'assignee',
        label: 'Assignee',
        apiQuery: userListData,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: { role: ROLES?.ORG_EMPLOYEE, organization: orgId },
        queryKey: 'role',
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        placeholder: 'Select campaign',
        name: 'campaignId',
        label: 'Campaign',
        apiQuery: campaignsList,
        getOptionLabel: (option: any) => option?.title,
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        name: 'taskType',
        label: 'Task Type',
        fullWidth: true,
        placeholder: 'Select task',
        options: ['email', 'call', 'others'],
      },
      component: RHFAutocomplete,
      md: 12,
    },
  ];
};
