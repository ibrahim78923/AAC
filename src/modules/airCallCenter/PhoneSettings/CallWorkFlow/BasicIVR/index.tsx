import React from 'react';
import useBasicIVR from './useBasicIVR';
import { Grid, Stack, Typography } from '@mui/material';
import { BackArrIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import { basicIvrArray } from './BasicIVR.data';
import { PHONE_SETTINGS } from '@/routesConstants/paths';

const BasicIVR = () => {
  const { methods, navigate } = useBasicIVR();
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        gap={2}
        mb={3}
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          navigate?.push(PHONE_SETTINGS?.PHONE_SETTINGS_MAIN);
        }}
      >
        <BackArrIcon />
        <Typography variant="h3">Basic IVR</Typography>
      </Stack>
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {basicIvrArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
              </item.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </>
  );
};

export default BasicIVR;
