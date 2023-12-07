import { Box, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { FileIcon } from '@/assets/icons';

export const columns: any = (
  setShowSignUpForm: any,
  setFindStatus: any,
  theme: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.FormName,
      id: 'FormName',
      header: 'Form Name',
      isSortable: true,
      cell: (info: any) => (
        <Box
          sx={{
            display: 'Flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
          }}
          onClick={() => {
            setShowSignUpForm(true), setFindStatus(info);
          }}
        >
          <FileIcon />{' '}
          <Typography
            variant="body4"
            sx={{ color: theme?.palette?.blue?.dull_blue }}
          >
            {info?.getValue()}{' '}
          </Typography>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.PageView,
      id: 'PageView',
      isSortable: true,
      header: 'Page View',
      cell: (info: any) => (
        <Typography
          variant="body4"
          sx={{ color: theme?.palette?.custom?.main }}
        >
          {info?.getValue()}{' '}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.Submission,
      id: 'Submission',
      isSortable: true,
      header: 'Submission',
      cell: (info: any) => (
        <Typography
          variant="body4"
          sx={{ color: theme?.palette?.custom?.main }}
        >
          {info?.getValue()}{' '}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.PageResponses,
      id: 'PageResponses',
      isSortable: true,
      header: 'Page Responses',
      cell: (info: any) => (
        <Typography
          variant="body4"
          sx={{ color: theme?.palette?.custom?.main }}
        >
          {info?.getValue()}{' '}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <Box
          sx={{
            background:
              info?.getValue() === 'Published'
                ? theme?.palette?.custom?.published
                : theme?.palette?.custom?.published_not_bg,
            color:
              info?.getValue() === 'Published'
                ? theme?.palette?.success?.main
                : theme?.palette?.custom?.published_not_color,
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
            {info?.getValue()}{' '}
          </Typography>
        </Box>
      ),
    },
  ];
};
