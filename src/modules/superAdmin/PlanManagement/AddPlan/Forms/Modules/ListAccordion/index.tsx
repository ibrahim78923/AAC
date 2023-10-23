import { styled } from '@mui/material/styles';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import { useListAccordion } from './useListAccordion';

import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@mui/material';

import CheckboxLabel from '../CheckboxLabel';

import { v4 as uuidv4 } from 'uuid';

const ListAccordion = () => {
  const { expanded, handleChange, ListAccordionData } = useListAccordion();

  return (
    <div>
      <Accordion
        expanded={expanded === 'List View'}
        onChange={handleChange('List View')}
      >
        <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
          <Typography variant="h4">List View</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {ListAccordionData?.map((item: any) => (
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
      <Accordion
        expanded={expanded === 'Board List'}
        onChange={handleChange('Board List')}
      >
        <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
          <Typography variant="h4">Board List</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {ListAccordionData?.map((item: any) => (
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
      <Accordion
        expanded={expanded === 'Create Deal'}
        onChange={handleChange('Create Deal')}
      >
        <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
          <Typography variant="h4">Create Deal</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {ListAccordionData?.map((item: any) => (
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

      <Accordion
        expanded={expanded === 'Import Deals'}
        onChange={handleChange('Import Deals')}
      >
        <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
          <Typography variant="h4">Import Deals</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {ListAccordionData?.map((item: any) => (
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
    </div>
  );
};

export default ListAccordion;

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
