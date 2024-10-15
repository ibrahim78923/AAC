import { Box, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { FileIcon } from '@/assets/icons';
import { useRouter } from 'next/router';
import { AIR_MARKETER } from '@/routesConstants/paths';
import RowSelection from '@/components/RowSelection';
import RowSelectionAll from '@/components/RowSelectionAll';

export const columns: any = (
  selectedRow: any,
  setSelectedRow: any,
  setShowSignUpForm: any,
  setFindStatus: any,
  theme: any,
  setSelectedRowStatus: any,
) => {
  const router = useRouter();
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      isSortable: false,
      header: (info: any) => {
        const rows = info?.table?.options?.data;
        return (
          <RowSelectionAll
            rows={rows}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            disabled={rows?.length === 0}
          />
        );
      },
      cell: (info: any) => {
        const rowData = info?.cell?.row?.original;
        const id = rowData?._id;
        return (
          <Box onClick={() => setSelectedRowStatus(rowData?.status)}>
            <RowSelection
              id={id}
              selectedRow={selectedRow}
              setSelectedRow={setSelectedRow}
            />
          </Box>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      header: 'Form Name',
      isSortable: true,
      cell: (info: any) => {
        const rowData = info?.row?.original;
        const formId = rowData?._id;
        return (
          <Box
            sx={{
              display: 'Flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
            }}
            onClick={() =>
              router.push({
                pathname: `${AIR_MARKETER.ALL_TABLE}/${formId}`,
                query: { status: rowData?.status },
              })
            }
          >
            <FileIcon />{' '}
            <Typography
              variant="body4"
              sx={{ color: theme?.palette?.blue?.dull_blue }}
            >
              {info?.getValue()}{' '}
            </Typography>
          </Box>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.pageViews,
      id: 'pageViews',
      isSortable: true,
      header: 'Page View',
      cell: (info: any) => (
        <Typography
          variant="body4"
          sx={{ color: theme?.palette?.custom?.main }}
        >
          {info?.getValue() < 10 ? `0${info?.getValue()}` : info?.getValue()}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.submissions,
      id: 'submissions',
      isSortable: true,
      header: 'Submission',
      cell: (info: any) => (
        <Typography
          variant="body4"
          sx={{ color: theme?.palette?.custom?.main }}
        >
          {info?.getValue() < 10 ? `0${info?.getValue()}` : info?.getValue()}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) =>
        (Number(row?.submissions) / Number(row?.pageViews)) * 100,
      id: 'pageResponses',
      isSortable: true,
      header: 'Page Responses',
      cell: (info: any) => {
        if (info?.getValue() % 1 !== 0) {
          return <>{info?.getValue().toFixed(2)}%</>;
        }
        return <>{info?.getValue()}%</>;
      },
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <Box
          sx={{
            backgroundColor:
              info?.getValue() === 'PUBLISHED'
                ? theme?.palette?.graph?.published
                : info?.getValue() === 'DRAFT'
                  ? theme?.palette?.graph?.published_not_bg
                  : theme?.palette?.graph?.Trash_bg,
            color:
              info?.getValue() === 'PUBLISHED'
                ? theme?.palette?.success?.main
                : info?.getValue() === 'DRAFT'
                  ? theme?.palette?.graph?.published_not_color
                  : theme?.palette?.blue?.main,
            width: 'fit-content',
            padding: '5px 12px',
            borderRadius: '25px',
            display: 'Flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <FiberManualRecordIcon sx={{ fontSize: '12px' }} />{' '}
          <Typography sx={{ fontSize: '12px', fontWeight: '500' }}>
            {info?.getValue().charAt(0) +
              info?.getValue().slice(1).toLowerCase()}
          </Typography>
        </Box>
      ),
    },
  ];
};

export const tabsArray = [
  { value: 'ALL', label: 'All' },
  { value: 'DRAFT', label: 'Draft' },
  { value: 'PUBLISHED', label: 'Published' },
];
