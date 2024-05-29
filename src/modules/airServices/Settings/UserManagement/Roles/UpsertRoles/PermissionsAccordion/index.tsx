import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material';
import { RHFCheckbox } from '@/components/ReactHookForm';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import usePermissionsAccordion from './usePermissionsAccordion';

export default function PermissionsAccordion() {
  const { isError, isLoading, isFetching, data, theme } =
    usePermissionsAccordion();

  if (isError) return <ApiErrorState />;

  if (isLoading || isFetching) return <SkeletonTable />;

  return (
    <>
      {data?.data?.permissions?.map((parent: any) => (
        <Accordion
          key={parent?.name}
          sx={{
            '&.MuiAccordion': {
              '&.Mui-expanded': {
                boxShadow: 'theme.customShadows.z8',
                borderRadius: '8px',
              },
              '&.Mui-disabled': {
                backgroundColor: 'transparent',
              },
            },
            '& .MuiAccordionSummary-root': {
              backgroundColor: theme?.palette?.blue?.main,
              color: theme.palette?.common?.white,
              borderRadius: '8px',
            },
            mt: 1,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            ria-controls={`${parent?.name}-content`}
            id={`${parent?.name}-header`}
          >
            <Typography>{parent?.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {parent?.subModules?.map((subModule: any) => (
              <Accordion
                key={subModule?.subModule}
                disableGutters
                sx={{
                  '& .MuiAccordionSummary-root': {
                    backgroundColor: 'inherit',
                    color: 'inherit',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  ria-controls={`${subModule?.name}-content`}
                  id={`${subModule?.name}-header`}
                >
                  <Typography>{subModule?.name}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Grid container spacing={1}>
                    {subModule?.permissions?.map((item: any) => (
                      <Grid item xs={12} md={4} key={item?.slug}>
                        <RHFCheckbox name={item?.slug} label={item?.name} />
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
