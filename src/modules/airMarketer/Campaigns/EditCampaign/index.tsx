import { useEffect } from 'react';
import { Grid, Box } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import { dataArray, validationSchema } from './EditCampaign.data';

import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import useCampaigns from '../useCampaigns';
import { indexNumbers } from '@/constants';

export default function EditCampaign({
  isOpenDrawer,
  onClose,
  initialValueProps,
  compaignsDataById,
}: any) {
  const { UserListData, updateCampaigns } = useCampaigns();

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  const { handleSubmit, setValue, reset } = methods;

  const onSubmit = async (values: any) => {
    delete values['title'];
    try {
      const updatedValues = {
        body: values,
        id: compaignsDataById?.data?._id,
      };
      await updateCampaigns(updatedValues)?.unwrap();
      enqueueSnackbar('Campaign Updated Successfully', {
        variant: 'success',
      });
      reset();
    } catch (error: any) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
    }
  };
  useEffect(() => {
    const data = compaignsDataById?.data[indexNumbers?.ZERO];

    const fieldsToSet: any = {
      title: data?.title,
      campaignOwner: data?.campaignOwner,
      startDate: dayjs(data?.startDate)?.isValid()
        ? dayjs(data?.startDate).toDate()
        : null,
      endDate: dayjs(data?.endDate)?.isValid()
        ? dayjs(data?.endDate)?.toDate()
        : null,
      campaignGoal: data?.campaignGoal,
      campaignAudience: data?.campaignAudience,
      campaignBudget: data?.campaignBudget,
      campaignStatus: data?.campaignStatus,
      description: data?.description,
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  }, [compaignsDataById]);

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Edit Campaign'}
      okText={'Update'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {dataArray(UserListData)?.map((item: any) => (
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
}
