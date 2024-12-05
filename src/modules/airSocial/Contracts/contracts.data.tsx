import { RHFDateRangePicker, RHFSelect } from '@/components/ReactHookForm';
import { CONTRACTS_STATUS, CONTRACTS_STATUS_TITLES } from '@/constants';
import * as Yup from 'yup';

export const contractsSideBarData = [
  {
    title: 'Contracts',
    subfolders: [
      {
        title: 'My Contracts',
        subfolders: [
          {
            title: 'contracts 546',
          },
          {
            title: 'contracts 446',
          },
        ],
      },
      {
        title: 'AAC Contracts',
        subfolders: [
          {
            title: 'contracts 542',
          },
        ],
      },
    ],
  },
];

export const addNewFolderValidationSchema = Yup.object().shape({
  name: Yup.string()?.required('Field Required'),
});
export const addNewFolderDefaultValues = {
  name: '',
};

export const renameFolderValidationSchema = Yup.object().shape({
  name: Yup.string()?.required('Field Required'),
});
export const renameFolderDefaultValues = {
  name: '',
};

export const contractsFiltersValidationSchema = Yup.object().shape({
  type: Yup.string(),
  sortBy: Yup.string(),
  date: Yup?.mixed()?.nullable()?.required('dateRange is required'),
});
export const contractsFiltersDefaultValues = {
  name: '',
  sortBy: '',
  date: {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  },
};
export const contractsFilterData = () => [
  {
    id: '01',
    componentProps: {
      name: 'type',
      label: 'Type',
      fullWidth: true,
      required: false,
      select: true,
    },
    options: [
      { value: 'ownedByMe', label: 'Owned by me' },
      { value: 'ownedByOthers', label: 'Owned by others' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    id: '02',
    componentProps: {
      name: 'sortBy',
      label: 'Sortby',
      fullWidth: true,
      required: false,
      select: true,
    },
    options: [
      { value: 'titleAtoZ', label: 'Title A to Z' },
      { value: 'titleZtoA', label: 'Title Z to A' },
      { value: 'oldestToNew', label: 'Oldest to Newest' },
      { value: 'newToOldest', label: 'Newest to Oldest ' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    id: 70,
    componentProps: {
      name: 'date',
      label: 'Created Date',
      placeholder: 'Select created date',
    },
    component: RHFDateRangePicker,
    md: 12,
  },
];

export const tabData = [
  {
    label: CONTRACTS_STATUS_TITLES?.ALL_CONTRACTS,
    value: CONTRACTS_STATUS?.ALL,
  },
  { label: CONTRACTS_STATUS_TITLES?.DRAFT, value: CONTRACTS_STATUS?.DRAFT },
  { label: CONTRACTS_STATUS_TITLES?.PENDING, value: CONTRACTS_STATUS?.PENDING },
  { label: CONTRACTS_STATUS_TITLES?.SIGNED, value: CONTRACTS_STATUS?.SIGNED },
  {
    label: CONTRACTS_STATUS_TITLES?.REJECTED,
    value: CONTRACTS_STATUS?.REJECTED,
  },
];
