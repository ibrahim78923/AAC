import { AntSwitch } from '@/components/AntSwitch';
import { Avatar, Box, Checkbox, Chip } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export const EventBaseWorkflowActionsDropdown = (handleActionClick: any) => [
  {
    title: 'Edit',
    handleClick: () => {
      handleActionClick('edit');
    },
  },
  {
    title: 'Clone',
    handleClick: () => {
      handleActionClick('clone');
    },
  },
  {
    title: 'Delete',
    handleClick: () => {
      handleActionClick?.('delete');
    },
  },
];

export const assetsListData: any = [
  {
    id: 1,
    workflowName: 'Update Assets',
    status: true,
    createdBy: 'Jane Cooper',
    createdOn: 'Oct 15, 2023 4:56:44 PM',
    lastActivity: 'Update by Andrew',
  },
  {
    id: 2,
    workflowName: 'Update Task',
    status: false,
    createdBy: 'Esther Howard',
    createdOn: 'Oct 15, 2023 4:56:44 PM',
    lastActivity: 'Update by Shaw',
  },
];
export const assetsListsColumnsFunction = (
  selectedAssetsList: any,
  setSelectedAssetsList: any,
  listData: any,
  theme: any,
): any => [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!selectedAssetsList?.find(
            (item: any) => item?.id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedAssetsList([
                ...selectedAssetsList,
                assetsListData?.find(
                  (item: any) => item?.id === info?.getValue(),
                ),
              ])
            : setSelectedAssetsList(
                selectedAssetsList?.filter((item: any) => {
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
        checked={selectedAssetsList?.length === listData?.length}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedAssetsList([...listData])
            : setSelectedAssetsList([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.workflowName,
    id: 'workflowName',
    isSortable: false,
    header: 'Workflow Name',
    cell: (info: any) => (
      <Box display={'flex'} gap={0.3}>
        {info?.getValue()}
        {info?.row?.original?.draft && (
          <Chip
            icon={
              <FiberManualRecordIcon
                fontSize="small"
                color={theme?.palette?.grey?.[900]}
              />
            }
            label="Draft"
            size="small"
          />
        )}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    header: 'Status',
    isSortable: false,
    cell: (info: any) => <AntSwitch values={info?.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.createdBy,
    id: 'createdBy',
    isSortable: false,
    header: 'Created By',
    cell: (info: any) => (
      <Box display={'flex'} gap={1} alignItems={'center'}>
        <Avatar />
        {info?.getValue()}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.createdOn,
    id: 'createdOn',
    isSortable: false,
    header: 'Created On',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.lastActivity,
    id: 'lastActivity',
    isSortable: false,
    header: 'Last Activity',
    cell: (info: any) => info?.getValue(),
  },
];
