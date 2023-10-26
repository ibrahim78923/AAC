import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';

import { useListAccordion } from './useDashboardAccordion';
import CheckboxLabel from '../CheckboxLabel';

import { v4 as uuidv4 } from 'uuid';

const DashboardAccordion = () => {
  const { ListAccordionDashboardData } = useListAccordion();

  return (
    <>
      <Accordion>
        <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
          <Typography variant="h4">Dashboard Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {ListAccordionDashboardData?.map((item: any) => (
              <Grid item xs={3} key={uuidv4()}>
                <Box sx={{ width: 'max-content' }}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked={item?.checked} />}
                      label={
                        <CheckboxLabel name={item?.name} desc={item?.desc} />
                      }
                    />
                  </FormGroup>
                </Box>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
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
  color: `${theme.palette.common.black} !important`,
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));
