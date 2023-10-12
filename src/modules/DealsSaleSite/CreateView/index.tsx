import React from 'react';
import DealDrawer from '../DealDrawer';
import { CutomizeIcon } from '@/assets/icons';
import { CreateViewData } from './CreateView.data';
import { useForm } from 'react-hook-form';
import {
  Box,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';

const CreateView = () => {
  const methods = useForm({});
  return (
    <>
      <DealDrawer
        btnProps={{
          title: 'Add View',
          startIcon: <CutomizeIcon />,
          sx: { height: '30px' },
        }}
        drawerProps={{
          title: 'Create View',
          okText: 'Save',
          submitHandler: () => {},
        }}
      >
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {CreateViewData.map((obj) => (
              <Grid item xs={12} key={uuidv4()}>
                <Typography
                  sx={{
                    color: '#4B5563',
                    fontSize: '14px',
                    fontWeight: 500,
                    mb: 0.2,
                  }}
                >
                  {obj.title}
                </Typography>
                <obj.component
                  fullWidth
                  size={'small'}
                  SelectProps={{ sx: { borderRadius: '8px' } }}
                  {...obj.componentProps}
                >
                  {obj.componentProps.select
                    ? obj.options?.map((option) => (
                        <MenuItem key={uuidv4()} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))
                    : null}
                </obj.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
        <Box sx={{ mt: '20px' }}>Shared with</Box>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="Private"
          />
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="My Teams (test)"
          />
          <FormControlLabel
            value="other"
            control={<Radio />}
            label="Everyone"
          />
        </RadioGroup>
      </DealDrawer>
    </>
  );
};

export default CreateView;
