import { Fragment, useState } from 'react';
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

import CheckboxLabel from '../CheckboxLabel';

import { v4 as uuidv4 } from 'uuid';

const SubModulesAccordion = ({ subModules }: any) => {
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  const handleCheckboxChange = (itemName: string) => {
    const isSelected = selectedCheckboxes.includes(itemName);

    if (isSelected) {
      setSelectedCheckboxes((prevSelected) =>
        prevSelected.filter((item) => item !== itemName),
      );
    } else {
      setSelectedCheckboxes((prevSelected) => [...prevSelected, itemName]);
    }
  };

  return (
    <>
      {subModules?.map((subModule: any) => (
        <Accordion
          key={uuidv4()}
          expanded={expanded === subModule?.name}
          onChange={handleChange(subModule?.name)}
        >
          <Fragment key={subModule?.name}>
            <AccordionSummary
              aria-controls={`accordion-${subModule?.name}`}
              id={`accordion-${subModule?.name}`}
            >
              <Typography variant="h4">{subModule?.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                {subModule?.permissions?.map((item: any) => (
                  <Grid item xs={3} key={uuidv4()}>
                    <Box sx={{ width: 'max-content' }}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedCheckboxes.includes(item?.label)}
                              onChange={() => handleCheckboxChange(item?.label)}
                            />
                          }
                          label={
                            <CheckboxLabel
                              name={item?.label}
                              desc={item?.desc}
                            />
                          }
                        />
                      </FormGroup>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Fragment>
        </Accordion>
      ))}
    </>
  );
};

export default SubModulesAccordion;

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
