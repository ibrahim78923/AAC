import React from 'react';

import {
  Box,
  Theme,
  Typography,
  useTheme,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';

import { style } from './EventCard.style';
import { steps } from './EventCard.data';

import { v4 as uuidv4 } from 'uuid';

const CustomStepperIcon = ({
  icon,
  borderColor,
}: {
  icon: any;
  borderColor: any;
}) => {
  return (
    <Box sx={style.stepperIconColor(borderColor)}>
      <>{icon}</>
    </Box>
  );
};

const EventCards = () => {
  const theme = useTheme<Theme>();

  return (
    <Box
      sx={{
        border: `1px solid ${theme?.palette?.grey[700]}`,
        borderRadius: '8px',
        padding: '1rem',
      }}
    >
      <Typography
        variant="body2"
        sx={{ color: `${theme?.palette?.grey[800]}`, fontWeight: 600 }}
      >
        Event & Notifications
      </Typography>
      <Box sx={{ paddingTop: '1rem' }}>
        <Stepper orientation="vertical">
          {steps?.map((step) => (
            <Step key={uuidv4()}>
              <StepLabel
                icon={
                  <CustomStepperIcon
                    icon={step?.icon}
                    borderColor={step?.borderColor}
                  />
                }
              >
                {step.label}
                <Typography
                  variant="body3"
                  sx={{ color: '#A4ABC5', fontWeight: 400 }}
                >
                  {step.description}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
};

export default EventCards;
