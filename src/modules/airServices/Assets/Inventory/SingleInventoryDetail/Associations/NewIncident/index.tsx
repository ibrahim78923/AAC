import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid, Box } from '@mui/material';
import { dataArray } from './NewIncident.data';
import { v4 as uuidv4 } from 'uuid';
import { useNewIncident } from './useNewIncident';

export const NewIncident = ({ openDrawer, onClose }: any) => {
  const { handleSubmit, onSubmit, methods } = useNewIncident({ onClose });

  return (
    <CommonDrawer
      isDrawerOpen={openDrawer}
      onClose={() => onClose(false)}
      title={'Create and Link a new Incident to this asset'}
      okText={'Create'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={4}>
            {dataArray?.map((item: any) => (
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
    </CommonDrawer>
  );
};
