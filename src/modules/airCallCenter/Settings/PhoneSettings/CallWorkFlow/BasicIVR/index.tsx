import useBasicIVR from './useBasicIVR';
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
import { BackArrIcon, PlusIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import { basicIvrArray, columns, data } from './BasicIVR.data';
import { AIR_CALL_CENTER } from '@/routesConstants/paths';
import TanstackTable from '@/components/Table/TanstackTable';

const BasicIVR = () => {
  const { methods, navigate, handleSubmit, onSubmit } = useBasicIVR();
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        gap={2}
        mb={3}
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          navigate?.push(AIR_CALL_CENTER?.SETTINGS?.CALL_WORKFLOW);
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
          <Grid item xs={12}>
            <Card sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="end" mb={2}>
                <Button
                  variant="contained"
                  className="small"
                  startIcon={<PlusIcon />}
                >
                  Add New Keypress
                </Button>
              </Stack>
              <TanstackTable columns={columns} data={data} />
            </Card>
          </Grid>
          <Grid item sm={12}>
            <Stack direction={{ md: 'row' }} gap={1} justifyContent="end">
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  navigate?.push(AIR_CALL_CENTER?.SETTINGS?.CALL_WORKFLOW);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};

export default BasicIVR;
