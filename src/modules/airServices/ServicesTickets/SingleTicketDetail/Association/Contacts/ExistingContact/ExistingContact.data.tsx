import { Avatar, Box, Checkbox, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { fullName, fullNameInitial, generateImage } from '@/utils/avatarUtils';

export const useAddContactsColumns = ({
  theme,
  setSelected,
  selected,
  associatesContactsList,
}: any) => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={!!selected?.find((item: any) => item === info?.getValue())}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelected([...selected, info?.getValue()])
            : setSelected(
                selected?.filter((item: any) => item !== info?.getValue()),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          associatesContactsList?.length
            ? selected?.length === associatesContactsList?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelected(
                associatesContactsList?.map((asset: any) => asset?._id),
              )
            : setSelected([]);
        }}
        disabled={!associatesContactsList?.length}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?._id,
    id: 'contactID',
    cell: (info: any) => `#PBR - ${info?.getValue()?.slice(-3)}`,
    header: 'Contact ID',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row,
    id: 'name',
    header: 'Owner',
    isSortable: true,
    cell: (info: any) => (
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <Avatar
          sx={{ bgcolor: theme?.palette?.blue?.main, width: 28, height: 28 }}
          src={generateImage(info?.getValue()?.profilePicture?.url)}
        >
          <Typography variant="body2" textTransform={'uppercase'}>
            {fullNameInitial(
              info?.getValue()?.firstName,
              info?.getValue()?.lastName,
            )}
          </Typography>
        </Avatar>
        <Box display={'flex'} flexDirection={'column'}>
          <Typography variant="body2">
            {fullName(info?.getValue()?.firstName, info?.getValue()?.lastName)}
          </Typography>
          {info?.getValue()?.email}
        </Box>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.jobTitle,
    id: 'jobTitle',
    isSortable: true,
    header: 'Job Title',
    cell: (info: any) => info?.getValue() ?? '---',
  },
];
