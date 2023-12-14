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

  const groupedDataSubModules: any = {};
  subModules?.forEach((item: any) => {
    // Extract module name
    const moduleName = item.subModule; // Replace with the actual property name

    // If the module name is not already a key in groupedData, create an array for it
    if (!groupedDataSubModules[moduleName]) {
      groupedDataSubModules[moduleName] = [];
    }

    // Extract relevant properties and push into the array
    groupedDataSubModules[moduleName].push({
      slug: item.slug,
      name: item.name,
      subModule: item.subModule,
    });
  });

  return (
    <>
      {Object.keys(groupedDataSubModules)?.length > 0
        ? Object.keys(groupedDataSubModules).map((subModule: any) => {
            return (
              <Accordion
                key={uuidv4()}
                expanded={expandedAccordian === subModule}
                onChange={handleChangeAccordian(subModule)}
              >
                <AccordionSummary
                  aria-controls={`accordion-${subModule}`}
                  id={`accordion-${subModule}`}
                >
                  <Typography variant="h4">{subModule}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormProvider methods={methods} onSubmit={handleSubmit}>
                    <Grid container>
                      {groupedDataSubModules[subModule]?.map(
                        (subModule: any) => {
                          return (
                            <div key={uuidv4()}>
                              <RHFMultiCheckbox
                                name="permissionSlugs"
                                options={[
                                  {
                                    label: subModule?.name,
                                    value: subModule?.slug,
                                  },
                                ]}
                              />
                            </div>
                          );
                        },
                      )}
                    </Grid>
                  </FormProvider>
                </AccordionDetails>
              </Accordion>
            );
          })
        : 'No Data'}
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
