import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useListAccordion } from './UseListAccordion';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from '@mui/material';
import CheckboxLabel from '../CheckboxLabel';

import { v4 as uuidv4 } from 'uuid';

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
  color: '#000 !important',
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
  //   borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const ListAccordion = () => {
  const { expanded, handleChange, ListAccordionData } = useListAccordion();

  return (
    <div>
      <Accordion
        expanded={expanded === 'panel122222'}
        onChange={handleChange('panel122222')}
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
        expanded={expanded === 'panel222122222'}
        onChange={handleChange('panel222122222')}
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
        expanded={expanded === 'pane222l222122222'}
        onChange={handleChange('pane222l222122222')}
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
        expanded={expanded === 'pane2234322l222122222'}
        onChange={handleChange('pane2234322l222122222')}
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
