import {
  Box,
  Checkbox,
  Stack,
  Typography,
  LinearProgress,
  Avatar,
  AvatarGroup,
} from '@mui/material';

import { AIR_MARKETER } from '@/routesConstants/paths';
import { styles } from './Broadcast.style';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { getProgressColor, statusTag } from '@/utils';
import { useRouter } from 'next/router';
import { generateImage } from '@/utils/avatarUtils';

export const broadcastColumns: any = (columnsProps: any) => {
  const navigate = useRouter();
  const { theme, data, checkedRows, setCheckedRows, setRecordStatus } =
    columnsProps;
  const handleSelectBroadcastById = (
    checked: boolean,
    id: string,
    status: string,
  ): void => {
    setRecordStatus(status);
    if (checked) {
      setCheckedRows([...checkedRows, id]);
    } else {
      setCheckedRows(checkedRows?.filter((_id: any) => _id !== id));
    }
  };

  const handleSelectAllBroadcasts = (checked: boolean): void => {
    setCheckedRows(checked ? data?.map(({ _id }: any) => _id) : []);
  };
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: 'Id',
      cell: ({ row: { original } }: any) => (
        <Checkbox
          checked={checkedRows?.includes(original?._id)}
          onChange={({ target }) => {
            handleSelectBroadcastById(
              target.checked,
              original?._id,
              original?.status,
            );
          }}
        />
      ),
      header: (
        <Checkbox
          onChange={({ target }) => {
            handleSelectAllBroadcasts(target?.checked);
          }}
          checked={data?.length && checkedRows?.length === data?.length}
        />
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      isSortable: false,
      header: 'Broadcast Name',
      cell: (info: any) => (
        <Box
          onClick={() => {
            navigate?.push({
              pathname: `${AIR_MARKETER?.WHATSAPP_MERKETING}/details`,
              query: { id: info?.row?.original?._id },
            });
          }}
          sx={{
            color: theme?.palette?.custom?.bright,
            fontWeight: 500,
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          {info?.getValue() ?? 'N/A'}
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdOn',
      isSortable: false,
      header: 'Created On',
      cell: (info: any) => dayjs(info?.getValue()).format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: (row: any) => row?.successfullPercentage,
      id: 'successful',
      isSortable: false,
      header: 'Successful',
      cell: (info: any) => {
        const value = info?.getValue() || 0;
        return (
          <Stack gap={1}>
            <Typography variant="body3" textAlign={'center'}>
              {`${value} %`}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={value}
              sx={{
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getProgressColor(value, theme),
                },
              }}
            />
          </Stack>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.readMessagesPercentage,
      id: 'read',
      isSortable: false,
      header: 'Read',
      cell: (info: any) => {
        const value = info?.getValue() || 0;
        return (
          <Stack gap={1}>
            <Typography variant="body3" textAlign={'center'}>
              {`${value} %`}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={value}
              sx={{
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getProgressColor(value, theme),
                },
              }}
            />
          </Stack>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.repliedPercentage,
      id: 'replied',
      isSortable: false,
      header: 'Replied',
      cell: (info: any) => {
        const value = info?.getValue() || 0;
        return (
          <Stack gap={1}>
            <Typography variant="body3" textAlign={'center'}>
              {`${value} %`}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={value}
              sx={{
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getProgressColor(value, theme),
                },
              }}
            />
          </Stack>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.recipients,
      id: 'recipients',
      isSortable: false,
      header: 'Recipients',
      cell: (info: any) => {
        const recipients = info?.row?.original?.recipients;
        if (!recipients || recipients.length === 0) {
          return 'N/A';
        }
        return (
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <AvatarGroup
              max={4}
              sx={{
                '& .MuiAvatar-root': {
                  background: theme?.palette?.primary?.main,
                  height: '30px',
                  width: '30px',
                  fontSize: '12px',
                },
              }}
            >
              {info?.getValue()?.map((recipient: any) => {
                return (
                  <Avatar
                    key={recipient?._id}
                    alt="recipient_avatar"
                    src={generateImage(recipient?.profilePicture)}
                  />
                );
              })}
            </AvatarGroup>
          </Box>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.failedRecipients,
      id: 'failed',
      isSortable: false,
      header: 'Failed',
      cell: (info: any) => {
        const failedRecipients = info?.row?.original?.failedRecipients;
        if (!failedRecipients || failedRecipients.length === 0) {
          return 'N/A';
        }
        return (
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <AvatarGroup
              max={4}
              sx={{
                '& .MuiAvatar-root': {
                  background: theme?.palette?.primary?.main,
                  height: '30px',
                  width: '30px',
                  fontSize: '12px',
                },
              }}
            >
              {info?.getValue()?.map((failed: any) => {
                return (
                  <Avatar
                    key={failed?._id}
                    alt="recipient_avatar"
                    src={generateImage(failed?.profilePicture)}
                  />
                );
              })}
            </AvatarGroup>
          </Box>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: false,
      header: 'Status',
      cell: (info: any) => (
        <Box sx={styles?.statusBadge}>
          <Box
            sx={{
              width: '10px',
              height: '10px',
              backgroundColor: `${statusTag(info?.getValue(), theme)}`,
              borderRadius: '50%',
            }}
          />
          {info?.getValue()}
        </Box>
      ),
    },
  ];
};
