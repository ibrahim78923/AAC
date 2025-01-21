import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import { TIME_PERIODS } from '@/constants/strings';
import { UsersFilterDataI } from './UsersFilter.interface';
import GetSoftwareDepartmentDropdown from '../../../SoftwareFormFieldsDropdowns/GetSoftwareDepartmentDropdown';

export const dropdownOptions = [
  TIME_PERIODS?.NONE,
  TIME_PERIODS?.ALL_TIME,
  TIME_PERIODS?.TODAY,
  TIME_PERIODS?.YESTERDAY,
  TIME_PERIODS?.PREVIOUS_WEEK,
  TIME_PERIODS?.PREVIOUS_MONTH,
];

export const userDefaultValues = (data: UsersFilterDataI) => {
  return {
    name: data?.name ?? '',
    department: data?.department ?? null,
    assignedDate: data?.assignedDate ?? null,
    firstSeen: data?.firstSeen ?? null,
    lastSeen: data?.lastSeen ?? null,
  };
};

export const userDataArray = () => [
  {
    _id: 1,
    componentProps: {
      name: 'name',
      label: 'Name',
      placeholder: 'Enter Name',
    },
    component: RHFTextField,
  },
  {
    _id: 2,
    component: GetSoftwareDepartmentDropdown,
  },
  {
    _id: 3,
    componentProps: {
      name: 'assignedDate',
      label: 'Assigned Date',
      placeholder: 'Select Date',
      options: dropdownOptions,
    },
    component: RHFAutocomplete,
  },

  {
    _id: 4,
    componentProps: {
      name: 'firstSeen',
      label: 'First Seen',
      placeholder: 'Select Date',
      options: dropdownOptions,
    },
    component: RHFAutocomplete,
  },
  {
    _id: 5,
    componentProps: {
      name: 'lastSeen',
      label: 'Last Seen',
      placeholder: 'Select Date',
      options: dropdownOptions,
    },
    component: RHFAutocomplete,
  },
];
