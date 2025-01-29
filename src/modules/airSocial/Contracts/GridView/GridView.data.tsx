import { SentIcon, SignedIcon, ViewedIcon } from '@/assets/icons';
import DocumentIcon from '@/assets/icons/modules/airSocial/contracts/documentIcon';
import FolderRoundedIcon from '@/assets/icons/shared/folder-rounded';
import { CustomTooltip } from '@/components/CustomTooltip';
import { CONTRACTS_STATUS } from '@/constants';
import { Box, Button, Checkbox, Typography, useTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export const contractsColumns = ({
  setIsViewAllActivityDrawerOpen,
  setSelectedRecords,
  selectedRecords,
  data,
}: any) => {
  const theme = useTheme();

  const handleClick = (itemId: string) => {
    if (selectedRecords?.includes(itemId)) {
      setSelectedRecords(selectedRecords.filter((id: string) => id !== itemId));
    } else {
      setSelectedRecords([...(selectedRecords || []), itemId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRecords?.length === data?.length) {
      setSelectedRecords([]);
    } else {
      const allTaskIds = data?.map((task: { _id: string }) => task?._id) || [];
      setSelectedRecords(allTaskIds);
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
          // checked={false}
          checked={selectedRecords?.includes(info?.row?.original?._id)}
          color="primary"
          name={info?.getValue()}
          onClick={() => handleClick(info?.row?.original?._id)}
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
          // checked={false}
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
          <Box sx={{ whiteSpace: 'nowrap' }}>{info?.getValue()}</Box>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.folder,
      id: 'folder',
      header: 'Folder',
      cell: (info: any) => (
        <Box
          display="flex"
          alignItems="center"
          gap="10px"
          sx={{ whiteSpace: 'nowrap' }}
        >
          {' '}
          <FolderRoundedIcon /> {info?.getValue() ?? '--'}
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
          <Box
            sx={{
              background: theme?.palette?.grey[300],
              width: '40px',
              height: '40px',
              borderRadius: '50%',
            }}
          ></Box>
          {info?.getValue()}
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
            {info?.getValue() ? (
              <Box>
                {info?.getValue()?.map((item: any, index: any) => (
                  <Box
                    key={uuidv4()}
                    display="flex"
                    alignItems="flex-start"
                    gap="10px"
                  >
                    <Box sx={{ display: 'flex', gap: '5px' }}>
                      {item?.statuses?.map((status: string) => (
                        <Box key={uuidv4()}>
                          {status?.includes(CONTRACTS_STATUS?.SIGNED) && (
                            <CustomTooltip title="Signed">
                              <Box>
                                <SignedIcon />
                              </Box>
                            </CustomTooltip>
                          )}
                          {status?.includes(CONTRACTS_STATUS?.REJECTED) && (
                            <CustomTooltip title="Rejected">
                              <Box>
                                <SignedIcon
                                  color={theme?.palette?.error?.main}
                                />
                              </Box>
                            </CustomTooltip>
                          )}
                          {status?.includes(CONTRACTS_STATUS?.VIEWED) && (
                            <CustomTooltip title="Viewed">
                              <Box>
                                <ViewedIcon />
                              </Box>
                            </CustomTooltip>
                          )}
                          {status?.includes(CONTRACTS_STATUS?.SENT) && (
                            <CustomTooltip title="Sent">
                              <Box>
                                <SentIcon />
                              </Box>
                            </CustomTooltip>
                          )}
                        </Box>
                      ))}
                    </Box>
                    <Box>
                      <Box sx={{ fontSize: '14px', fontWeight: '600' }}>
                        {item?.company}
                      </Box>
                      <Box
                        sx={{
                          fontSize: '12px',
                          fontWeight: '400',
                          color: theme?.palette?.custom?.slate_blue,
                        }}
                      >
                        {item?.userName}
                      </Box>
                      {info?.row?.original?.activity?.length === index + 1 && (
                        <Button
                          sx={{ marginLeft: '-10px', height: '30px' }}
                          onClick={() => setIsViewAllActivityDrawerOpen(true)}
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
                    </Box>
                  </Box>
                ))}
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
      cell: (info: any) => <> {info?.getValue()}</>,
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
