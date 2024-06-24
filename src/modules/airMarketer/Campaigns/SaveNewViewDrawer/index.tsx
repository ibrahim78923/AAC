import { Grid, Box, useTheme, Typography } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import {
  dataArray,
  defaultValues,
  validationSchema,
} from './SaveNewViewDrawer.data';
import useCampaigns from '../useCampaigns';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

export default function SaveNewViewDrawer({
  isOpenDrawer,
  onClose,
  initialValueProps = defaultValues,
  setSelectedRows,
}: any) {
  const { postCampaignsSaveView, postCampaignsSaveViewLoading } =
    useCampaigns();
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {
    const obj = {
      ...values,
      startDate: values?.startDate
        ? dayjs(values?.startDate)?.format(DATE_FORMAT?.API)
        : undefined,
      endDate: values?.endDate
        ? dayjs(values?.endDate)?.format(DATE_FORMAT?.API)
        : undefined,
    };

    try {
      await postCampaignsSaveView(obj)?.unwrap();
      enqueueSnackbar('View Save Successfully', {
        variant: 'success',
      });
      onClose();
      setSelectedRows([]);
    } catch (error) {
      enqueueSnackbar('Error while Save View', {
        variant: 'error',
      });
    }
    // enqueueSnackbar('Export Campaign Exported Successfully', {
    //   variant: 'success',
    // });
  };
  const theme = useTheme();
  // const { accessValue, handleChangeAccessValue } = useSaveAndNewViewDrawer();
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
