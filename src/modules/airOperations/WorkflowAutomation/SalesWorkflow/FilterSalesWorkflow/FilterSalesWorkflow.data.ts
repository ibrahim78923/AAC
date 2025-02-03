import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { ROLES } from '@/constants/strings';
import { fullName } from '@/utils/avatarUtils';

export const salesWorkflowsFilterValues = {
  status: '',
  createdBy: null,
  type: '',
};
const statusOption = ['ACTIVE', 'INACTIVE', 'DRAFT'];
const typeOptions = ['EVENT_BASE', 'SCHEDULED'];

export const salesWorkflowFilterFields = (
  userDropdown: any,
  sessionUserData: any,
) => [
  {
    _id: 1,
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      placeholder: 'Select',
      options: statusOption,
    },
    component: RHFAutocomplete,
  },
  {
    _id: 2,
    componentProps: {
      name: 'createdBy',
      label: 'Created By',
      fullWidth: true,

      getOptionLabel: (option: any) =>
        fullName(option?.firstName, option?.lastName),
      externalParams: {
        role: ROLES?.ORG_EMPLOYEE,
        organization: sessionUserData?.organization?._id,
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
      },
      apiQuery: userDropdown,
      placeholder: 'Select User',
    },
    component: RHFAutocompleteAsync,
  },
  {
    _id: 3,
    componentProps: {
      name: 'type',
      label: 'Type',
      fullWidth: true,
      placeholder: 'Select',
      options: typeOptions,
    },
    component: RHFAutocomplete,
  },
];
