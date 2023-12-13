import React from 'react';
import { Box, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertRolesData } from './UpsertRoleAndRightForm.data';
import useRoleAndRight from '@/modules/airSales/SettingSales/TabsData/RolesAndRight/useRoleAndRight';
const UpsertRoleAndRightForm = ({ submitHandler }: any) => {
  const { rolesMethods } = useRoleAndRight();
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box mt={1}>
            <FormProvider methods={rolesMethods} onSubmit={submitHandler}>
              <Grid container spacing={4}>
                {upsertRolesData?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
                    <item.component {...item?.componentProps} size={'small'}>
                      {item?.componentProps?.select &&
                        item?.options?.map((option: any) => (
                          <option key={uuidv4()} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                    </item.component>
                  </Grid>
                ))}
              </Grid>
            </FormProvider>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default UpsertRoleAndRightForm;
