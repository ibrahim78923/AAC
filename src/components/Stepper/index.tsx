import React from 'react';

import {
  Box,
  Stepper,
  Step,
  StepLabel,
  styled,
  useTheme,
  StepConnector,
  stepConnectorClasses,
} from '@mui/material';

import Check from '@mui/icons-material/Check';

import { isNullOrEmpty } from '@/utils';

import { v4 as uuidv4 } from 'uuid';

import { SingleStepI, HorizontalStepperI } from './stepper.interface';

const AppHorizontalStepper: React.FC<HorizontalStepperI> = ({
  stepsArray,
  activeStep = 0,
  stepperButtons,
  stepperPadding = '4rem 0',
  stepperMargin = '2rem 0',
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ margin: stepperMargin }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<CustomConnector />}
        sx={{ overflowX: 'auto' }}
      >
        {!isNullOrEmpty(stepsArray) &&
          stepsArray?.map((singleStem: SingleStepI, index: any) => (
            <Step key={uuidv4()} className={index === 0 ? 'first-step' : ''}>
              <StepLabel
                StepIconComponent={CustomStepIcon}
                sx={{
                  '& .MuiStepLabel-label.MuiStepLabel-label.MuiStepLabel-alternativeLabel':
                    {
                      marginTop: 0,
                      color:
                        index <= activeStep
                          ? theme.palette.primary.main
                          : theme.palette.blue.light,
                      fontWeight: 500,
                      fontSize: '14px',
                      lineHeight: '20px',
                    },
                }}
              >
                {singleStem?.label}
              </StepLabel>
            </Step>
          ))}
      </Stepper>

      <Box sx={{ width: '100%', padding: stepperPadding }}>
        {!isNullOrEmpty(stepsArray) && stepsArray[activeStep]?.component}
        {stepperButtons}
      </Box>
    </Box>
  );
};

export default AppHorizontalStepper;

const CustomStepIcon = (props: any) => {
  const { active, completed, className } = props;
  const theme = useTheme();

  return (
    <CustomStepIconRoot
      ownerState={{ active }}
      theme={theme}
      className={className}
    >
      {completed ? (
        <Check
          className="QontoStepIcon-completedIcon"
          sx={{ color: theme.palette.primary.main }}
        />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </CustomStepIconRoot>
  );
};

const CustomStepIconRoot = styled('div')<{
  ownerState: { active?: boolean };
  theme: any;
}>(({ ownerState, theme }) => ({
  display: 'flex',
  height: 22,
  alignItems: 'center',
  color: ownerState.active
    ? theme.palette.primary.main
    : theme.palette.blue.light,

  '& .QontoStepIcon-completedIcon': {
    color: theme.palette.primary.main,
    zIndex: 1,
    fontSize: 22,
  },
  '& .QontoStepIcon-circle': {
    width: 15,
    height: 15,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },

  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor:
        theme.palette.mode === 'light' ? theme.palette.primary.main : '#eaeaf0',
      borderTopWidth: 5,
      borderRadius: 5,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor:
        theme.palette.mode === 'light' ? theme.palette.primary.main : '#eaeaf0',
      borderTopWidth: 5,
      borderRadius: 5,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#eaeaf0',
    borderTopWidth: 5,
    borderRadius: 5,
  },
  '.firstStep &': {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
      borderTopWidth: 5,
    },
  },
}));
