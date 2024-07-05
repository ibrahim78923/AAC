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
import { NOTISTACK_VARIANTS } from '@/constants/strings';

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

    const filteredObj: { [key: string]: any } = Object.keys(obj).reduce(
      (acc: { [key: string]: any }, key: string) => {
        if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
          acc[key] = obj[key];
        }
        return acc;
      },
      {},
    );
    try {
      await postCampaignsSaveView(filteredObj)?.unwrap();
      enqueueSnackbar('View Save Successfully', {
        variant: 'success',
      });
      onClose();
      setSelectedRows([]);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const theme = useTheme();
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
