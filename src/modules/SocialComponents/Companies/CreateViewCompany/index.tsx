// import React from 'react';

import {
  Box,
  // FormControlLabel,
  Grid,
  // Radio,
  // RadioGroup,
  Typography,
} from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import useCreateViewCompany from './useCreateViewCompany';

import { FormProvider } from '@/components/ReactHookForm';
import { createViewArr } from './CreateViewCompany.data';

import { v4 as uuidv4 } from 'uuid';

const CreateViewCompany = (props: any) => {
  const { isCreateView, setIsCreateView } = props;
  const { methods, theme, handleSubmit, onSubmit, reset } =
    useCreateViewCompany();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isCreateView}
        onClose={() => {
          reset();
          setIsCreateView(false);
        }}
        title="Create View"
        submitHandler={handleSubmit(onSubmit)}
        okText="Save"
        isOk={true}
        footer={true}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {createViewArr()?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  {item?.componentProps?.heading && (
                    <Typography variant="h5">
                      {item?.componentProps?.heading}
                      <Typography
                        component="span"
                        sx={{ color: theme?.palette?.error?.main }}
                      >
                        {' '}
                        *
                      </Typography>
                    </Typography>
                  )}
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={uuidv4()}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ))}
              {/* <Grid>
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
              </Grid> */}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};

export default CreateViewCompany;
