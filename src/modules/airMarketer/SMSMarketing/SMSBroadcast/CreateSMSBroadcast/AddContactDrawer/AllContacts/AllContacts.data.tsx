import { Avatar, Checkbox, Stack, Typography, useTheme } from '@mui/material';
import { generateImage } from '@/utils/avatarUtils';

export const allContactsColumns: any = ({
  selectedRec,
  setSelectedRec,
  allContactsData,
}: any) => {
  const theme = useTheme();

  const handleSelectContactById = (checked: boolean, id: string): void => {
    if (checked) {
      const contact = allContactsData?.find(
        (contact: any) => contact._id === id,
      );
      setSelectedRec([...selectedRec, contact]);
    } else {
      setSelectedRec(selectedRec?.filter((contact: any) => contact._id !== id));
    }
  };

  const handleSelectAllContacts = (checked: boolean): void => {
    setSelectedRec(checked ? allContactsData : []);
  };

  return [
    {
      accessorFn: (row: any) => row?._id,
      id: 'Id',
      cell: ({ row: { original } }: any) => (
        <Checkbox
          onChange={({ target }) => {
            handleSelectContactById(target?.checked, original?._id);
          }}
          checked={selectedRec?.some(
            (contact: any) => contact?._id === original?._id,
          )}
        />
      ),
      header: (
        <Checkbox
          onChange={({ target }) => {
            handleSelectAllContacts(target?.checked);
          }}
          checked={
            allContactsData?.length &&
            selectedRec?.length === allContactsData?.length
          }
        />
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) =>
        row?.firstName || row?.lastName
          ? `${row?.firstName || ''} ${row?.lastName || ''}`
          : 'N/A',
      id: 'name',
      isSortable: false,
      header: 'Name',
      cell: (info: any) => (
        <Stack direction="row" gap={1} alignItems="center">
          <Avatar
            alt="user_avatar"
            src={generateImage(
              info?.row?.original?.profilePicture?.url || 'N/A',
            )}
          >
            <Typography
              variant="body1"
              fontWeight={500}
              sx={{
                color: theme?.palette?.custom?.dim_grey,
                textTransform: 'upperCase',
              }}
            >
              {info?.row?.original?.firstName?.charAt(0) ||
                info?.row?.original?.lastName?.charAt(0) ||
                'N/A'}
            </Typography>
          </Avatar>
          <Typography>{info?.getValue() || 'N/A'}</Typography>
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.phoneNumber,
      id: 'phoneNumber',
      isSortable: false,
      header: 'Phone Number',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
  ];
};
