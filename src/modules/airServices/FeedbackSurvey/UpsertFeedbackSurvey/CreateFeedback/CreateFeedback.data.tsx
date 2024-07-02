import { CircularProgress } from '@mui/material';

export const sectionDropdownOptions = ({
  fields,
  cloneSection,
  removeSection,
  mergeSection,
  index,
  sectionCondition,
  deleteLoading,
  mergeLoading,
  cloneLoading,
}: any) => [
  {
    id: 1,
    title: cloneLoading ? <CircularProgress size="22px" /> : 'Clone Section',
    handleClick: (setClose: any) => {
      cloneSection(index, setClose);
    },
    disabled: sectionCondition || deleteLoading || mergeLoading,
  },
  {
    id: 2,
    title: deleteLoading ? <CircularProgress size="22px" /> : 'Delete Section',
    handleClick: (setClose: any) => {
      removeSection(index, setClose);
    },
    disabled:
      fields?.length <= 1 || sectionCondition || mergeLoading || cloneLoading,
  },
  {
    id: 3,
    title: mergeLoading ? <CircularProgress size="22px" /> : 'Merge with above',
    handleClick: (setClose: any) => {
      mergeSection(index, setClose);
    },
    disabled:
      fields?.length <= 1 || sectionCondition || deleteLoading || cloneLoading,
  },
];
