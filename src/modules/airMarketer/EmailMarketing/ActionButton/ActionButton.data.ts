export const actionsOptions = ({ selectedRecords }: any) => {
  const isDisabled = selectedRecords?.length > 1 ? true : false;

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
      isDisabled: false,
    },
    {
      label: 'Manage Access',
      isDisabled: false,
    },
    {
      label: 'Archived',
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
