import { RHFTextField } from '@/components/ReactHookForm';
import { Box, Typography } from '@mui/material';
import * as Yup from 'yup';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { FileIcon } from '@/assets/icons';

export const FormsvalidationSchema = Yup?.object()?.shape({
  Name: Yup?.string()?.required('Required Field'),
});

export const FormsDefaultValues = {
  Name: '',
};

export const formsArray = [
  {
    componentProps: {
      name: 'Name',
      label: 'Name',
      fullWidth: true,
      placeholder: 'Enter form name',
    },
    component: RHFTextField,
    md: 12,
  },
];

export const columns: any = (
  setShowSignUpForm: any,
  setFindStatus: any,
  theme: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
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
      accessorFn: (row: any) => row?.pageResponses,
      id: 'pageResponses',
      isSortable: true,
      header: 'Page Responses',
      cell: (info: any) => (
        <Typography
          variant="body4"
          sx={{ color: theme?.palette?.custom?.main }}
        >
          {`${info?.getValue()}%`}
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

export const formStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  TRASH: 'TRASH',
};
