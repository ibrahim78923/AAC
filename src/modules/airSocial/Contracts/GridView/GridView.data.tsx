import { SentIcon, SignedIcon, ViewedIcon } from '@/assets/icons';
import DocumentIcon from '@/assets/icons/modules/airSocial/contracts/documentIcon';
import FolderRoundedIcon from '@/assets/icons/shared/folder-rounded';
import { CustomTooltip } from '@/components/CustomTooltip';
import { IMG_URL } from '@/config';
import { DATE_FORMAT } from '@/constants';
import { AIR_SOCIAL_CONTRACTS } from '@/constants/routes';
import { ENUM_CONTRACT_STATUS, ENUM_CONTRACT_TYPE } from '@/utils/contracts';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Typography,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

export const contractsColumns = ({
  setIsViewAllActivityDrawerOpen,
  setSelectedRecords,
  selectedRecords,
  data,
  setViewMoreData,
}: any) => {
  const theme = useTheme();
  const router = useRouter();

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
              color: theme?.palette?.primary?.main,
              cursor: 'pointer',
            }}
            onClick={() => {
              if (info?.row?.original?.contractType === 'PDF') {
                router?.push({
                  pathname: AIR_SOCIAL_CONTRACTS?.CONTRACTS_CREATE,
                  query: {
                    contractType: ENUM_CONTRACT_TYPE?.PDF,
                    contractId: info?.row?.original?._id,
                  },
                });
              } else {
                router?.push({
                  pathname: AIR_SOCIAL_CONTRACTS?.CONTRACTS_CREATE,
                  query: { contractId: info?.row?.original?._id },
                });
              }
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
      cell: (info: any) => (
        <>
          <Box>
            {info?.row?.original?.signees ? (
              <Box>
                {info?.row?.original?.signees
                  ?.slice(0, 2)
                  ?.map((item: any, index: any) => {
                    return (
                      <Box
                        key={uuidv4()}
                        display="flex"
                        alignItems="flex-start"
                        gap="10px"
                      >
                        <Box
                          sx={{ display: 'flex', gap: '5px', minWidth: '80px' }}
                        >
                          {item?.signatureStatus ===
                            ENUM_CONTRACT_STATUS?.SIGNED && (
                            <CustomTooltip title="Signed">
                              <Box>
                                <SignedIcon />
                              </Box>
                            </CustomTooltip>
                          )}

                          {item?.signatureStatus ===
                            ENUM_CONTRACT_STATUS?.REJECTED && (
                            <CustomTooltip title="Rejected">
                              <Box>
                                <SignedIcon
                                  color={theme?.palette?.error?.main}
                                />
                              </Box>
                            </CustomTooltip>
                          )}

                          {(item?.signatureStatus ===
                            ENUM_CONTRACT_STATUS?.SIGNED ||
                            item?.signatureStatus ===
                              ENUM_CONTRACT_STATUS?.REJECTED) && (
                            <CustomTooltip title="Viewed">
                              <Box>
                                <ViewedIcon />
                              </Box>
                            </CustomTooltip>
                          )}

                          {item?.emailSent && (
                            <CustomTooltip title="Sent">
                              <Box>
                                <SentIcon />
                              </Box>
                            </CustomTooltip>
                          )}
                        </Box>

                        <Box>
                          <Box sx={{ fontSize: '14px', fontWeight: '600' }}>
                            {item?.party?.moduleData?.name ?? '--'}
                          </Box>
                          <Box
                            sx={{
                              fontSize: '12px',
                              fontWeight: '400',
                              color: theme?.palette?.custom?.slate_blue,
                            }}
                          >
                            {item?.personalTitle} {item?.name ?? '--'}
                          </Box>
                          {index !== 0 && (
                            <>
                              {info?.row?.original?.signees?.length > 2 && (
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
                                    View all
                                  </Typography>
                                </Button>
                              )}
                            </>
                          )}
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
            ) : (
              '--'
            )}
          </Box>
        </>
      ),
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
