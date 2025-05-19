import { SentIcon, SignedIcon, ViewedIcon } from '@/assets/icons';
import DocumentIcon from '@/assets/icons/modules/airSocial/contracts/documentIcon';
import FolderRoundedIcon from '@/assets/icons/shared/folder-rounded';
import { CustomTooltip } from '@/components/CustomTooltip';
import { IMG_URL } from '@/config';
import { DATE_FORMAT } from '@/constants';
import { ENUM_CONTRACT_STATUS, getPartyName } from '@/utils/contracts';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Typography,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';

export const contractsColumns = ({
  setIsViewAllActivityDrawerOpen,
  setSelectedRecords,
  selectedRecords,
  data,
  setViewMoreData,
}: any) => {
  const theme = useTheme();

  const handleClick = (item: any) => {
    if (selectedRecords?.some((record: any) => record?._id === item?._id)) {
      setSelectedRecords(
        selectedRecords?.filter((record: any) => record?._id !== item?._id),
      );
    } else {
      setSelectedRecords([...(selectedRecords || []), item]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRecords?.length === data?.length) {
      // If all items are already selected, clear the selection
      setSelectedRecords([]);
    } else {
      setSelectedRecords(data || []);
    }
  };

  const handelStatusSwitch = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return (
          <StatusChip
            background={theme?.palette?.custom?.tr_purple}
            color={theme?.palette?.custom?.br_purple}
            title="Draft"
          />
        );
      case 'SIGNED':
        return (
          <StatusChip
            background={theme?.palette?.custom?.tr_green}
            color={theme?.palette?.custom?.br_green}
            title="Signed"
          />
        );
      case 'PENDING':
        return (
          <StatusChip
            background={theme?.palette?.custom?.tr_yellow}
            color={theme?.palette?.custom?.br_yellow}
            title="Pending"
          />
        );
      case 'REJECTED':
        return (
          <StatusChip
            background={theme?.palette?.custom?.tr_red}
            color={theme?.palette?.custom?.br_red}
            title="Rejected"
          />
        );
      case 'CHANGE_REQUEST':
        return (
          <StatusChip
            background={theme?.palette?.custom?.tr_red}
            color={theme?.palette?.custom?.br_red}
            title="Change Request"
          />
        );
      default:
        return <StatusChip background="" color="" title="" />;
    }
  };
  const handelTypeSwitch = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return <DocumentIcon type="DRAFT" />;
      case 'SIGNED':
        return <DocumentIcon type="SIGNED" />;
      case 'PENDING':
        return <DocumentIcon type="PENDING" />;
      case 'REJECTED':
        return <DocumentIcon type="REJECTED" />;
      case 'CHANGE_REQUEST':
        return <DocumentIcon type="CHANGE_REQUEST" />;
      default:
        return '';
    }
  };
  const StatusChip = ({ background, color, title }: any) => {
    return (
      <Box
        sx={{
          background: background,
          color: color,
          padding: '5px 10px',
          borderRadius: '5px',
          width: 'fit-content',
          fontWeight: '600',
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </Box>
    );
  };

  return [
    {
      accessorFn: (row?: any) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
          checked={selectedRecords?.some(
            (record: any) => record._id === info?.row?.original?._id,
          )}
          color="primary"
          name={info?.getValue()}
          onClick={() => handleClick(info?.row?.original)}
        />
      ),
      header: (
        <Checkbox
          color="primary"
          name="Id"
          onClick={handleSelectAll}
          checked={
            selectedRecords?.length > 0
              ? selectedRecords?.length === data?.length
              : false
          }
        />
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      header: 'Contracts',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {handelTypeSwitch(info?.row?.original?.status)}{' '}
          <Box
            sx={{
              whiteSpace: 'nowrap',
            }}
          >
            {info?.getValue()}
          </Box>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.folders,
      id: 'folders',
      header: 'Folder',
      cell: (info: any) => (
        <Box
          display="flex"
          alignItems="center"
          gap="10px"
          sx={{ whiteSpace: 'nowrap' }}
        >
          {' '}
          <FolderRoundedIcon /> {info?.getValue()?.name ?? '--'}
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.owner,
      id: 'owner',
      header: 'Owner',
      cell: (info: any) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            whiteSpace: 'nowrap',
          }}
        >
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              textTransform: 'uppercase',
              fontSize: '14px',
              mr: '6px',
            }}
            alt={info?.getValue()}
            src={`${IMG_URL}${info?.getValue()?.avatar?.url}`}
          >
            {`${info?.getValue()?.firstName?.charAt(0)}${info
              ?.getValue()
              ?.lastName?.charAt(0)}`}
          </Avatar>
          {`${info?.getValue()?.firstName} ${info?.getValue()?.lastName}`}
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.activity,
      id: 'activity',
      header: 'Activity',
      cell: (info: any) => {
        return (
          <>
            {info?.row?.original?.signees?.length !== 0 ? (
              <>
                {info?.row?.original?.signees?.slice(0, 2)?.map((item: any) => {
                  return (
                    <Box
                      key={item?._id}
                      display="flex"
                      alignItems="flex-start"
                      gap="10px"
                    >
                      {info?.row?.original?.status !==
                        ENUM_CONTRACT_STATUS?.DRAFT && (
                        <Box
                          sx={{
                            display: 'flex',
                            gap: '5px',
                          }}
                        >
                          <CustomTooltip
                            title={item?.emailSent ? 'Sent' : 'Not sent'}
                          >
                            <Box
                              sx={{
                                display: 'inline-flex',
                                color: item?.emailSent
                                  ? 'primary.main'
                                  : 'inherit',
                              }}
                            >
                              <SentIcon />
                            </Box>
                          </CustomTooltip>

                          <CustomTooltip
                            title={item?.isViewed ? 'Viewed' : 'Not viewed'}
                          >
                            <Box
                              sx={{
                                display: 'inline-flex',
                                color: item?.isViewed
                                  ? 'primary.main'
                                  : 'inherit',
                              }}
                            >
                              <ViewedIcon />
                            </Box>
                          </CustomTooltip>

                          <CustomTooltip
                            title={
                              !item?.isViewed
                                ? 'Not viewed'
                                : item?.signatureStatus ===
                                    ENUM_CONTRACT_STATUS?.SIGNED
                                  ? 'Signed'
                                  : item?.signatureStatus ===
                                      ENUM_CONTRACT_STATUS?.REJECTED
                                    ? 'Rejected'
                                    : item?.signatureStatus ===
                                        ENUM_CONTRACT_STATUS?.PENDING
                                      ? 'Pending'
                                      : item?.signatureStatus ===
                                          ENUM_CONTRACT_STATUS?.CHANGE_REQUEST
                                        ? 'Change Request'
                                        : 'Not signed'
                            }
                          >
                            <Box
                              sx={{
                                display: 'inline-flex',
                                color: !item?.isViewed
                                  ? 'inherit'
                                  : item?.signatureStatus ===
                                      ENUM_CONTRACT_STATUS?.SIGNED
                                    ? 'primary.main'
                                    : item?.signatureStatus ===
                                        ENUM_CONTRACT_STATUS?.REJECTED
                                      ? 'error.main'
                                      : item?.signatureStatus ===
                                          ENUM_CONTRACT_STATUS?.PENDING
                                        ? 'error.main'
                                        : item?.signatureStatus ===
                                            ENUM_CONTRACT_STATUS?.CHANGE_REQUEST
                                          ? 'error.main'
                                          : 'inherit',
                              }}
                            >
                              <SignedIcon />
                            </Box>
                          </CustomTooltip>
                        </Box>
                      )}
                      <Box>
                        <Box
                          sx={{
                            fontSize: '14px',
                            fontWeight: '600',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {getPartyName(item?.moduleData)}
                        </Box>
                        <Box
                          sx={{
                            fontSize: '12px',
                            fontWeight: '400',
                            color: theme?.palette?.custom?.slate_blue,
                          }}
                        >
                          {item?.name ?? '--'}
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
                <Button
                  sx={{ marginLeft: '-10px', height: '30px' }}
                  onClick={() => {
                    setViewMoreData(info?.row?.original),
                      setIsViewAllActivityDrawerOpen(true);
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: theme?.palette?.primary?.main,
                    }}
                  >
                    View
                  </Typography>
                </Button>
              </>
            ) : (
              '--'
            )}
          </>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      header: 'Status',
      cell: (info: any) => (
        <>{handelStatusSwitch(info?.row?.original?.status)}</>
      ),
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      header: 'Created at',
      cell: (info: any) => (
        <> {dayjs(info?.getValue()).format(DATE_FORMAT.UI)}</>
      ),
    },
  ];
};

export const contractsData = [
  {
    contracts: 'Contract 1',
    folder: 'Practice Signed',
    activity: [
      {
        company: 'Orcalo Holdings',
        userName: 'John Doe',
      },
    ],
    owner: 'Owner 1',
    creationDate: 'Creation Date 1',
    status: 'DRAFT',
    createdAt: 'May 04, 2023',
  },
];

export const viewActivityData = [
  {
    category: 'Signed',
    activity: [
      {
        company: 'MarketiconLTD',
        userName: 'John Doe',
        statuses: ['SIGNED', 'SENT', 'VIEWED'],
      },
      {
        company: 'Orcalo LTD',
        userName: 'Ali Wahab',
        statuses: ['VIEWED', 'SENT'],
      },
    ],
  },
  {
    category: 'Private',
    activity: [
      {
        company: 'MarketiconLTD',
        userName: 'John Doe',
        statuses: ['SIGNED', 'SENT', 'VIEWED'],
      },
      {
        company: 'Orcalo LTD',
        userName: 'Ali Wahab',
        statuses: ['VIEWED', 'REJECTED'],
      },
    ],
  },
];
