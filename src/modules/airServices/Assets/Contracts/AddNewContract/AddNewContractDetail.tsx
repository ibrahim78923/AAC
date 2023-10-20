import { FormProvider } from '@/components/ReactHookForm';
import { Grid, Typography } from '@mui/material';
import { addNewContractData } from './AddNewContractDetailForm';
import { v4 as uuidv4 } from 'uuid';
import ItemsDetails from './ItemsDetails';

const AddNewContractDetail = ({
  handleSubmitForm,
  methods,
  handleSubmit,
}: any) => {
  return (
    <div>
      <Grid
        container
        justifyContent={'center'}
        display={'flex'}
        alignItems={'center'}
        flexDirection={'row'}
      >
        <Grid item xs={12} sx={{ mb: '2rem' }}>
          <Typography variant="h5">General Details</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <Grid container spacing={4}>
              {addNewContractData?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select ? (
                      item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    ) : item?.heading ? (
                      item?.heading
                    ) : (
                      <ItemsDetails />
                    )}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddNewContractDetail;
