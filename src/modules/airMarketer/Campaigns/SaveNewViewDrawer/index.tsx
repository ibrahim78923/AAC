import { Grid, Box, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { dataArray, defaultValues } from './SaveNewViewDrawer.data';
import useCampaigns from '../useCampaigns';
import useSaveAndNewViewDrawer from './useSaveNewViewDrawer';

export default function SaveNewViewDrawer({
  isOpenDrawer,
  onClose,
  initialValueProps = defaultValues,
  setSelectedRows,
}: any) {
  const { postCampaignsSaveView, postCampaignsSaveViewLoading } =
    useCampaigns();
  const { theme, handleSubmit, onSubmit, methods } = useSaveAndNewViewDrawer(
    initialValueProps,
    setSelectedRows,
    onClose,
    postCampaignsSaveView,
  );

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Save New View'}
      okText={'Save'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
      isLoading={postCampaignsSaveViewLoading}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {dataArray()?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                {item?.componentProps?.heading && (
                  <Typography variant="h5">
                    {item?.componentProps?.heading}
                    <Typography
                      component="span"
                      sx={{ color: theme?.palette?.error?.main }}
                    >
                      *
                    </Typography>
                  </Typography>
                )}
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
}
