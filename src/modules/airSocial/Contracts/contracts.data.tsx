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
