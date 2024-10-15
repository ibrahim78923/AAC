import { EMAIL_ENUMS, indexNumbers } from '@/constants';

export const actionsOptions = ({ selectedRecords }: any) => {
  const isDisabled = selectedRecords?.length > 1 ? true : false;
  const isArchived =
    selectedRecords[indexNumbers?.ZERO]?.status === EMAIL_ENUMS?.ARCHIVED;
  return [
    {
      label: 'View Details',
      isDisabled: isDisabled,
    },
    {
      label: 'Save Email as Template',
      isDisabled: isDisabled,
    },
    {
      label: 'Move to folder',
      isDisabled: isDisabled,
    },
    {
      label: 'Manage Access',
      isDisabled: isDisabled,
    },
    {
      label: isArchived ? 'Unarchive' : 'Archived',
      isDisabled: isDisabled,
    },
    {
      label: 'Duplicate',
      isDisabled: isDisabled,
    },
    {
      label: 'Delete',
      isDisabled: false,
    },
  ];
};
