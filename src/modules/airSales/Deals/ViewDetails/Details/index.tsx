import { Box, Typography, Grid, Button, Divider } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import useDetails from './useDetails';
import { detailsDataArray } from './Details.data';
import { styles } from '../ViewDetails.style';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { LoadingButton } from '@mui/lab';

const Details = (props: any) => {
  const { selecetdDealId } = props;
  const {
    theme,
    methodsDetails,
    onSubmit,
    handleSubmit,
    isLoading,
    dealPipelineId,
    updateLoading,
  } = useDetails(selecetdDealId);

  return (
    <Box sx={styles?.horizontalTabsBox}>
      <Typography variant="h4">Details</Typography>
      {isLoading ? (
        <SkeletonForm />
      ) : (
        <Box sx={styles?.horizontalTabsInnnerBox}>
          <FormProvider methods={methodsDetails}>
            <Grid container spacing={4}>
              {detailsDataArray(dealPipelineId)?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                >
                  <item.component {...item?.componentProps} size={'small'}>
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
                <Divider sx={{ borderColor: theme?.palette?.grey[700] }} />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    gap: 1,
                  }}
                >
                  <Button className="small" variant="outlined">
                    Cancel
                  </Button>
                  <LoadingButton
                    className="small"
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                    loading={updateLoading}
                  >
                    Update
                  </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          </FormProvider>
        </Box>
      )}
    </Box>
  );
};

export default Details;
