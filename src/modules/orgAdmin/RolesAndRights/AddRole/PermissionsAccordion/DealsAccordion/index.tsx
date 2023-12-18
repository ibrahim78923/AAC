import { Grid, Typography } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';

import { useDealsAccordion } from './useDealsAccordion';

import { RHFMultiCheckbox } from '@/components/ReactHookForm';
import { ListAccordionDealsDetailsData } from './DealsAccordion.data';

const DealsAccordion = () => {
  const { ListAccordionDealsData } = useDealsAccordion();

  return (
    <>
      <Accordion>
        <AccordionSummary
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{ p: 0 }}
        >
          <Typography variant="h6" fontWeight={600}>
            Deal List
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <Grid container>
            <RHFMultiCheckbox
              name="dealsAcordList"
              options={ListAccordionDealsData}
              GridView={3}
            />
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{ p: 0 }}
        >
          <Typography variant="h6" fontWeight={600}>
            Deal Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <Grid container>
            <RHFMultiCheckbox
              name="dealsAcordDetails"
              options={ListAccordionDealsDetailsData}
              GridView={3}
            />
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default DealsAccordion;

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
