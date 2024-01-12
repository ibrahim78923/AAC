import { Grid, Typography } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';
import { RHFMultiCheckbox } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';

const DashboardAccordion = ({ subModules }: any) => {
  return (
    <>
      {subModules?.map((item: any) => (
        <Accordion sx={{ p: 0 }} key={uuidv4()}>
          <AccordionSummary
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{ p: 0 }}
          >
            <Typography variant="h6" fontWeight={600}>
              {item?.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <Grid container>
              <RHFMultiCheckbox
                name="permissions"
                options={item?.permissions?.map((item: any) => ({
                  label: item?.name,
                  value: item?.slug,
                }))}
                GridView={12}
              />
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default DashboardAccordion;

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  padding: '16px',
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'white !important',
  color: `${theme?.palette?.common?.black} !important`,
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme?.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme?.spacing(2),
}));
