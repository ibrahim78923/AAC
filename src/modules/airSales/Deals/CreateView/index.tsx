import { useForm } from 'react-hook-form';

import {
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import { CreateViewData } from './CreateView.data';

import { FormProvider } from '@/components/ReactHookForm';

import { v4 as uuidv4 } from 'uuid';

const CreateView = ({ open, onClose }: any) => {
  const methods = useForm({});
  const theme = useTheme();
  return (
    <>
      <CommonDrawer
        isDrawerOpen={open}
        onClose={onClose}
        isOk
        submitHandler={onClose}
        okText="Submit"
        title="Create View"
      >
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {CreateViewData?.map((obj) => (
              <Grid item xs={12} key={uuidv4()}>
                <Typography
                  sx={{
                    colors: theme?.palette?.grey[600],
                    fontWeight: '500',
                    fontSize: '14px',
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
                  {obj?.componentProps?.select
                    ? obj?.options?.map((option) => (
                        <MenuItem key={uuidv4()} value={option?.value}>
                          {option?.label}
                        </MenuItem>
                      ))
                    : null}
                </obj.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
        <Typography
          sx={{
            mt: '20px',
            color: theme?.palette?.slateBlue['main'],
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          Shared with
        </Typography>
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
      </CommonDrawer>
    </>
  );
};

export default CreateView;
