import { Fragment } from 'react';

import { Grid, Typography } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';

import { RHFMultiCheckbox } from '@/components/ReactHookForm';
import { FormProvider } from '@/components/ReactHookForm';
import useSubModulesAccordian from './useSubModulesAccordian';

import { v4 as uuidv4 } from 'uuid';

const SubModulesAccordion = ({ subModules, methods, handleSubmit }: any) => {
  const { expandedAccordian, handleChangeAccordian } = useSubModulesAccordian();

  return (
    <>
      {subModules?.map((subModule: any) => {
        const permissions = subModule?.permissions;

        return (
          <Accordion
            key={uuidv4()}
            expanded={expandedAccordian === subModule?.name}
            onChange={handleChangeAccordian(subModule?.name)}
          >
            <Fragment key={subModule?.name}>
              <AccordionSummary
                aria-controls={`accordion-${subModule?.name}`}
                id={`accordion-${subModule?.name}`}
              >
                <Typography variant="h4">{subModule?.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormProvider methods={methods} onSubmit={handleSubmit}>
                  <Grid container>
                    <RHFMultiCheckbox
                      name="permissionSlugs"
                      options={permissions}
                    />
                  </Grid>
                </FormProvider>
              </AccordionDetails>
            </Fragment>
          </Accordion>
        );
      })}
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
  color: `${theme.palette?.common?.black} !important`,
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
