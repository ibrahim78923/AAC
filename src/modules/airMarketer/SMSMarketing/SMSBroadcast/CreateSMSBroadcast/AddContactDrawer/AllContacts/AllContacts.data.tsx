import { Avatar, Checkbox, Stack, Typography, useTheme } from '@mui/material';
// import { AvatarImage } from '@/assets/images';
import { generateImage } from '@/utils/avatarUtils';

export const allContactsData: any = [
  {
    Id: 1,
    Name: 'Kristin Waston',
    PhoneNumber: '(219)555-0114',
  },
  {
    Id: 2,
    Name: 'Esther Howard',
    PhoneNumber: '(201)555-0124',
  },
  {
    Id: 3,
    Name: 'Cody Fisher',
    PhoneNumber: '(219)555-0114',
  },
  {
    Id: 4,
    Name: 'Wade Warren',
    PhoneNumber: '(201)555-0124',
  },
  {
    Id: 5,
    Name: 'Brooklyn Simmons',
    PhoneNumber: '(219)555-0114',
  },
  {
    Id: 6,
    Name: 'Albert Flores',
    PhoneNumber: '(201)555-0124',
  },
];

export const allContactsColumns: any = ({
  selected,
  setSelected,
  data,
}: any) => {
  const theme = useTheme();

  const handleSelectContactById = (checked: boolean, id: string): void => {
    if (checked) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected?.filter((_id: any) => _id !== id));
    }
  };

  const handleSelectAllContacts = (checked: boolean): void => {
    setSelected(checked ? data?.map(({ _id }: any) => _id) : []);
  };
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: 'Id',
      cell: ({ row: { original } }: any) => (
        <Checkbox
          checked={selected?.includes(original?._id)}
          onChange={({ target }) => {
            handleSelectContactById(target?.checked, original?._id);
          }}
        />
      ),
      header: (
        <Checkbox
          onChange={({ target }) => {
            handleSelectAllContacts(target?.checked);
          }}
          checked={data?.length && selected?.length === data?.length}
        />
      ),
      isSortable: false,
    },

    // {
    //   accessorFn: (row: any) => row?.Id,
    //   id: 'Id',
    //   cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    //   header: <Checkbox color="primary" name="Id" />,
    //   isSortable: false,
    // },
    {
      accessorFn: (row: any) => `${row?.firstName} ${row?.lastName}`,
      id: 'name',
      isSortable: false,
      header: 'Name',
      cell: (info: any) => (
        <Stack direction="row" gap={1} alignItems="center">
          {/* <Avatar alt="Remy Sharp" src={AvatarImage.src} /> */}
          <Avatar
            alt="user_avatar"
            src={generateImage(info?.row?.original?.profilePicture?.url)}
          >
            <Typography
              variant="body1"
              fontWeight={500}
              sx={{
                color: theme?.palette?.custom?.dim_grey,
                textTransform: 'upperCase',
              }}
            >
              {info?.row?.original?.firstName.charAt(0)}
              {info?.row?.original?.lastName.charAt(0)}
            </Typography>
          </Avatar>
          <Typography>{info?.getValue()}</Typography>
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
