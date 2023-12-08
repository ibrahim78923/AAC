import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import { stepperArray } from './EngagementAdsStepper.data';
import useTempStepper from './useEngagementAdsStepper';
import { AIR_MARKETER } from '@/routesConstants/paths';
import * as React from 'react';

const EngagementAdsStepper = () => {
  const { activeStep, router, handleBack, handleNext, methods, handleSubmit } =
    useTempStepper();

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleNext)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stepper activeStep={activeStep}>
            {stepperArray?.map((item) => (
              <Step key={item?.name}>
                <StepButton color="inherit">{item?.name}</StepButton>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={1}>
            {stepperArray
              ?.filter((_, step) => step == activeStep)
              ?.map(
                (item: any) =>
                  item?.formFields?.map((item: any) => {
                    return (
                      <Grid item xs={12} md={item?.md} key={uuidv4()}>
                        <item.component
                          {...item?.componentProps}
                          size={'small'}
                        >
                          {item?.componentProps?.select &&
                            item?.options?.map((option: any) => (
                              <option key={option?.value} value={option?.value}>
                                {option?.label}
                              </option>
                            ))}
                        </item.component>
                      </Grid>
                    );
                  }),
              )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              onClick={() =>
                activeStep < 0
                  ? router.push(AIR_MARKETER?.CREATE_AD)
                  : handleBack
              }
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button type="submit" sx={{ mr: 1 }}>
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default EngagementAdsStepper;
