import { Checkbox } from '@mui/material';

export const groupsColumns: any = ({
  selectedRec,
  setSelectedRec,
  contactsGroupData,
}: any) => {
  const handleSelectContactGroupById = (checked: boolean, id: string): void => {
    if (checked) {
      const contact = contactsGroupData?.find(
        (contact: any) => contact._id === id,
      );
      setSelectedRec([...selectedRec, contact]);
    } else {
      setSelectedRec(selectedRec?.filter((contact: any) => contact._id !== id));
    }
  };

  const handleSelectAllContactGroups = (checked: boolean): void => {
    setSelectedRec(checked ? contactsGroupData : []);
  };

  return [
    {
      accessorFn: (row: any) => row?._id,
      id: 'Id',
      cell: ({ row: { original } }: any) => (
        <Checkbox
          onChange={({ target }) => {
            handleSelectContactGroupById(target?.checked, original._id);
          }}
          checked={selectedRec?.some(
            (contact: any) => contact._id === original._id,
          )}
          defaultChecked={selectedRec?.map((contact: any) => contact?._id)}
        />
      ),
      header: (
        <Checkbox
          onChange={({ target }) => {
            handleSelectAllContactGroups(target?.checked);
          }}
          checked={
            contactsGroupData?.length &&
            selectedRec?.length === contactsGroupData?.length
          }
        />
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => `${row?.name} (${row?.contacts?.length})`,
      id: 'groupName',
      isSortable: false,
      header: 'Group Name',
      cell: (info: any) => info?.getValue(),
    },
  ];
};
