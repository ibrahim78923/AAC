import * as React from 'react';
import Typography from '@mui/material/Typography';
import { accordionNames } from './CustomizedAccordian.data';
import { v4 as uuidv4 } from 'uuid';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from '@mui/material';
import useCustomizedAccordians from './useCustomizedAccordians';

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<any>(null);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const { SelectedAccordianTable, accordianTableInfo } =
    useCustomizedAccordians();
  return (
    <div>
      {accordionNames?.map((accordianDescription: any) => {
        return (
          <Accordion
            key={uuidv4()}
            expanded={expanded === accordianDescription?.id}
            onChange={(event, newExpanded) => {
              handleChange(accordianDescription?.id)(event, newExpanded);
              SelectedAccordianTable(accordianDescription);
            }}
            style={{ marginTop: '15px' }}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Grid container>
                <Grid item md={2.4}>
                  <Typography variant="h6">
                    {accordianDescription?.name}
                  </Typography>
                </Grid>
                <Grid item md={2.4}>
                  <Typography variant="h6">
                    {accordianDescription?.description}
                  </Typography>
                </Grid>
                <Grid item md={2.4}>
                  <Typography variant="h6">
                    {accordianDescription?.actionViews}
                  </Typography>
                </Grid>
                <Grid item md={2.4}>
                  <Typography variant="h6">
                    {accordianDescription?.opens}
                  </Typography>
                </Grid>
                <Grid item md={2.4}>
                  <Typography variant="h6">
                    {accordianDescription?.submissions}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>{accordianTableInfo}</AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
