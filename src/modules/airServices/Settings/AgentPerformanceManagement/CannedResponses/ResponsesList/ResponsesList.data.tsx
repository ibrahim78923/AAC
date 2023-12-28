import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { CANNED_RESPONSES } from '@/constants/strings';
import { AvatarGroup, Box, Checkbox, Avatar } from '@mui/material';
import dayjs from 'dayjs';
export const responsesTableColumns = (
  responsesData: any,
  setResponsesData: any,
  responsesMainData: any,
): any => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!responsesData?.find((item: any) => item?._id === info?.getValue())
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setResponsesData([
                ...responsesData,
                responsesMainData?.find(
                  (item: any) => item?._id === info?.getValue(),
                ),
              ])
            : setResponsesData(
                responsesData?.filter((item: any) => {
                  return item?._id !== info?.getValue();
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
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created Date',
    cell: (info: any) =>
      dayjs(info?.getValue()).format('ddd MM, YYYY hh:mm:ss A'),
  },
  {
    accessorFn: (row: any) => row?.availableFor,
    id: 'availableFor',
    isSortable: true,
    header: 'Available for',
    cell: (info: any) => {
      return (
        <Box>
          {true ? (
            info?.getValue()
          ) : (
            <AvatarGroup max={4} sx={{ justifyContent: 'flex-end' }}>
              {info
                ?.getValue()
                ?.map((avatar: { src: string | undefined }) => (
                  <Avatar
                    key={avatar?.src}
                    alt="User Avatar"
                    src={avatar?.src}
                    sx={{ height: '30px', width: '30px' }}
                  />
                ))}
            </AvatarGroup>
          )}
        </Box>
      );
    },
  },
];

export const actionsOptions = (handleOptionsClick: any) => [
  {
    title: 'Edit',
    handleClick: (close: any) => {
      handleOptionsClick(CANNED_RESPONSES?.EDIT);
      close();
    },
  },
  {
    title: 'Delete',
    handleClick: (close: any) => {
      handleOptionsClick(CANNED_RESPONSES?.DELETE);
      close();
    },
  },
  {
    title: 'Move',
    handleClick: (close: any) => {
      handleOptionsClick(CANNED_RESPONSES?.MOVE);
      close();
    },
  },
];
