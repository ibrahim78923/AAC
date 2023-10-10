import React from 'react';

import {
  Box,
  Typography,
  Grid,
  Button,
  ButtonGroup,
  Divider,
} from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import useDetails from './Details.hook';

import { detailsDataArray } from './Details.data';

import { v4 as uuidv4 } from 'uuid';

const Details = () => {
  const { theme, methodsDetails, onSubmit, handleSubmit } = useDetails();

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 15px 25px 15px',
        borderRadius: '10px',
      }}
    >
      <Typography variant="h4">Details</Typography>
      <Box sx={{ pt: 2 }}>
        <FormProvider
          methods={methodsDetails}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={4}>
            {detailsDataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : null}
                </item.component>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Divider sx={{ borderColor: theme.palette.grey[500] }} />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  gap: 1.5,
                }}
              >
                <ButtonGroup>
                  <Button sx={{ height: '35px' }}>Cancel</Button>
                </ButtonGroup>
                <ButtonGroup variant="contained" color="primary">
                  <Button sx={{ height: '35px' }}>Update</Button>
                </ButtonGroup>
              </Box>
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default Details;
