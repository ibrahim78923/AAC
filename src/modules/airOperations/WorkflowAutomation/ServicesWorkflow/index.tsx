import Button from '@mui/material/Button';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { AIR_OPERATIONS } from '@/constants';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  cardRelatedData,
  serviceWorkflowsCardData,
} from './ServicesWorkflow.data';
import { v4 as uuidv4 } from 'uuid';
import { useServiceWorkflow } from './useServiceWorkflow';

export const ServicesWorkflow = () => {
  const { theme, router, activeItem, handleItemClick } = useServiceWorkflow();

  return (
    <>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        gap={1}
        border={`1px solid ${theme?.palette?.grey?.[700]}`}
        borderRadius={2}
        boxShadow={1}
        p={2}
        sx={{ cursor: 'pointer' }}
      >
        <Box display={'flex'} alignItems={'center'} gap={0.5} mb={1}>
          <IconButton
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              router?.push({
                pathname: AIR_OPERATIONS?.WORKFLOW_AUTOMATION,
              });
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h5">Services Workflow</Typography>
        </Box>
        <Grid container gap={4} justifyContent={'center'}>
          {serviceWorkflowsCardData?.map((item) => {
            return (
              <Grid
                key={uuidv4()}
                item
                md={3.7}
                p={2}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={'column'}
                boxShadow={'rgba(149, 157, 165, 0.2) 0px 8px 24px'}
                borderRadius={2}
                sx={{
                  backgroundColor:
                    activeItem === item?.id
                      ? theme?.palette?.primary?.light
                      : 'inherit',
                  '&:hover': {
                    boxShadow: `0 0 6px 0 ${theme?.palette?.warning?.light}`,
                  },
                }}
                onClick={() => handleItemClick?.(item.id)}
              >
                <Typography variant="h5" py={1}>
                  {item?.title}
                </Typography>
                <Typography textAlign={'center'} height={100}>
                  {item?.description}
                </Typography>
                <Button
                  sx={{
                    width: 258,
                    backgroundColor:
                      activeItem === item?.id
                        ? 'primary.main'
                        : 'primary.light',
                    color:
                      activeItem === item?.id
                        ? 'common.white'
                        : 'slateBlue.main',
                  }}
                >
                  {item?.buttonTitle}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box mt={2}>{cardRelatedData[activeItem]}</Box>
    </>
  );
};
