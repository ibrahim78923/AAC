import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { CANNED_RESPONSES } from '@/constants/strings';
import {
  AvatarGroup,
  Checkbox,
  Avatar,
  Tooltip,
  Typography,
} from '@mui/material';
import { DATE_TIME_FORMAT } from '@/constants';
import { AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { TruncateText } from '@/components/TruncateText';
import { fullName, fullNameInitial, generateImage } from '@/utils/avatarUtils';
import { otherDateFormat } from '@/lib/date-time';

export const responsesTableColumns = (
  responsesData: any,
  setResponsesData: any,
  responsesMainData: any,
): any => [
  {
    accessorFn: (row: { _id: string }) => row?._id,
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
        checked={
          !!responsesMainData?.length
            ? responsesData?.length === responsesMainData?.length
            : false
        }
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
    accessorFn: (row: { title: string }) => row?.title,
    id: 'title',
    header: 'Title',
    isSortable: true,
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
  },
  {
    accessorFn: (row: { createdAt: string }) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created Date',
    cell: (info: any) =>
      otherDateFormat(info?.getValue(), DATE_TIME_FORMAT?.DMYHMSA),
  },
  {
    accessorFn: (row: any) => ({
      availableFor: row?.availableFor,
      agents: row?.agentDetails,
    }),
    id: 'availableFor',
    isSortable: true,
    header: 'Available for',
    cell: (info: any) => {
      return (
        <>
          {info?.getValue()?.availableFor ===
          CANNED_RESPONSES?.SELECT_AGENTS ? (
            <AvatarGroup max={4} sx={{ justifyContent: 'flex-end' }}>
              {info?.getValue()?.agents?.map((agent: any) => (
                <Tooltip
                  title={fullName(agent?.firstName, agent?.lastName)}
                  key={agent?._id}
                >
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 28,
                      height: 28,
                    }}
                    variant={'circular'}
                    src={generateImage(agent?.avatar)}
                  >
                    <Typography variant={'body2'} textTransform={'uppercase'}>
                      {fullNameInitial(agent?.firstName, agent?.lastName)}
                    </Typography>
                  </Avatar>
                </Tooltip>
              ))}
            </AvatarGroup>
          ) : (
            <TruncateText
              text={info
                ?.getValue()
                ?.availableFor?.replace(/_/g, ' ')
                ?.toLowerCase()}
            />
          )}
        </>
      );
    },
  },
];

export const actionsOptions = (handleOptionsClick: any) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [
      AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.SEARCH_EDIT_DELETE_CANNED_RESPONSES,
    ],
    handleClick: (close: () => void) => {
      handleOptionsClick(CANNED_RESPONSES?.EDIT);
      close();
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: [
      AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.SEARCH_EDIT_DELETE_CANNED_RESPONSES,
    ],
    handleClick: (close: () => void) => {
      handleOptionsClick(CANNED_RESPONSES?.DELETE);
      close();
    },
  },
  {
    id: 3,
    title: 'Move',
    permissionKey: [
      AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.SEARCH_EDIT_DELETE_CANNED_RESPONSES,
    ],
    handleClick: (close: () => void) => {
      handleOptionsClick(CANNED_RESPONSES?.MOVE);
      close();
    },
  },
];
