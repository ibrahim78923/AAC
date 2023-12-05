import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import {
  AvatarImage,
  DysonAvatarImage,
  UserAvatarImage,
} from '@/assets/images';
import { AvatarGroup, Box, Checkbox, Avatar } from '@mui/material';
export const responsesTableColumns = (
  responsesData: any,
  setResponsesData: any,
  responsesMainData: any,
): any => [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!responsesData?.find((item: any) => item?.id === info?.getValue())
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setResponsesData([
                ...responsesData,
                responsesMainData?.find(
                  (item: any) => item?.id === info?.getValue(),
                ),
              ])
            : setResponsesData(
                responsesData?.filter((item: any) => {
                  return item?.id !== info?.getValue();
                }),
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
        checked={responsesData?.length === responsesMainData?.length}
        onChange={(e: any) => {
          e?.target?.checked
            ? setResponsesData([...responsesMainData])
            : setResponsesData([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.title,
    id: 'title',
    cell: (info: any) => info?.getValue(),
    header: 'Title',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.createdDate,
    id: 'createdDate',
    isSortable: true,
    header: 'Created Date',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.availableFor,
    id: 'availableFor',
    isSortable: true,
    header: 'Available for',
    cell: (info: any) => {
      return (
        <Box>
          <AvatarGroup max={4} sx={{ justifyContent: 'flex-end' }}>
            {info
              ?.getValue()
              ?.map((avatar: { src: string | undefined }) => (
                <Avatar key={avatar?.src} alt="User Avatar" src={avatar?.src} />
              ))}
          </AvatarGroup>
        </Box>
      );
    },
  },
];

export const responsesTableData: any = [
  {
    id: 1,
    title: "We've received your request",
    createdDate: '06:45 - 07:15, Wed 29 Mar, 2023',
    availableFor: [
      UserAvatarImage,
      DysonAvatarImage,
      AvatarImage,
      DysonAvatarImage,
    ],
  },
  {
    id: 2,
    title: 'Delete',
    createdDate: '06:45 - 07:15, Wed 29 Mar, 2023',
    availableFor: [
      UserAvatarImage,
      DysonAvatarImage,
      AvatarImage,
      DysonAvatarImage,
    ],
  },
  {
    id: 3,
    title: 'Update',
    createdDate: '06:45 - 07:15, Wed 29 Mar, 2023',
    availableFor: [
      UserAvatarImage,
      DysonAvatarImage,
      AvatarImage,
      DysonAvatarImage,
    ],
  },
];
export const ACTION_TYPES = {
  DELETE: 'delete',
  EDIT: 'edit',
  MOVE: 'move',
};
export const actionsOptions = (handleOptionsClick: any) => [
  { title: 'Edit', handleClick: () => handleOptionsClick(ACTION_TYPES?.EDIT) },
  {
    title: 'Delete',
    handleClick: () => handleOptionsClick(ACTION_TYPES?.DELETE),
  },
  { title: 'Move', handleClick: () => handleOptionsClick(ACTION_TYPES?.MOVE) },
];
