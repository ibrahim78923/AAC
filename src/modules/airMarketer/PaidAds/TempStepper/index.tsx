import { Button, Grid } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { RHFTextField } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';

const steps = [
  {
    name: 'Select campaign settings',
    formFields: [
      {
        componentProps: {
          name: 'contactList',
          label: '1',
          placeholder: 'Enter list name',
          required: true,
          fullWidth: true,
          small:
            'When a contact interacts with your ads, add them to an active list so you can market to them later.',
        },
        component: RHFTextField,
        md: 12,
      },
      {
        componentProps: {
          name: 'contactList1',
          label: '2',
          placeholder: 'Enter list name',
          required: true,
          fullWidth: true,
          small:
            'When a contact interacts with your ads, add them to an active list so you can market to them later.',
        },
        component: RHFTextField,
        md: 12,
      },
    ],
  },
  {
    name: 'Create an ad group',
    formFields: [
      {
        componentProps: {
          name: 'contactList3',
          label: '3',
          placeholder: 'Enter list name',
          required: true,
          fullWidth: true,
          small:
            'When a contact interacts with your ads, add them to an active list so you can market to them later.',
        },
        component: RHFTextField,
        md: 12,
      },
      {
        componentProps: {
          name: 'contactList4',
          label: '4',
          placeholder: 'Enter list name',
          required: true,
          fullWidth: true,
          small:
            'When a contact interacts with your ads, add them to an active list so you can market to them later.',
        },
        component: RHFTextField,
        md: 12,
      },
    ],
  },
];
const TempStepper = () => {
  // const {
  //   // activeStep,
  //   // setActiveStep,
  //   engagamentAdStepperData,
  //   handleCompleteStep,
  //   hanldeGoPreviousBack } = useTempStepper()
  // const theme = useTheme();

  //************ */
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    // const newActiveStep =
    //   isLastStep() && !allStepsCompleted()
    //     ? steps.findIndex((step, i) => !(i in completed))
    //     : activeStep + 1;
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const methods = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        contactList: Yup.string().required('Field is Required'),
        contactList1: Yup.string().required('Field is Required'),
        // contactList3: Yup.string().required('Field is Required'),
        // contactList4: Yup.string().required('Field is Required'),
      }),
    ),
    defaultValues: {
      contactList: '',
      contactList1: '',
      // contactList3: '',
      // contactList4: '',
    },
  });
  const { handleSubmit } = methods;
  // console.log(activeStep);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleNext)}>
      <Box sx={{ width: '100%' }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((item, index) => (
            <>
              <Step key={item.name}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {item.name}
                </StepButton>
              </Step>
            </>
          ))}
        </Stepper>
        <div>
          <React.Fragment>
            {steps
              .filter((_, step) => step == activeStep)
              .map((item) =>
                item.formFields.map((field) => (
                  <Grid item xs={12} md={field?.md} key={uuidv4()}>
                    <field.component
                      {...field.componentProps}
                      size={'small'}
                    ></field.component>
                    <small>{field?.componentProps?.small}</small>
                  </Grid>
                )),
              )}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button type="submit" sx={{ mr: 1 }}>
                Next
              </Button>
            </Box>
          </React.Fragment>
        </div>
      </Box>
    </FormProvider>
  );
};

export default TempStepper;
