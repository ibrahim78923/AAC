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
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { useGetCampaignsByIdQuery } from '@/services/airMarketer/campaigns';

export default function EditCampaign({
  isOpenDrawer,
  onClose,
  initialValueProps,
  selectedRows,
}: any) {
  const { UserListData, updateCampaigns, updateCampaignLoading } =
    useCampaigns();

  const { data: compaignsDataById } = useGetCampaignsByIdQuery(selectedRows, {
    skip:
      !Array?.isArray(selectedRows) ||
      selectedRows?.length === indexNumbers?.ZERO,
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  const { handleSubmit, setValue, reset } = methods;

  const onSubmit = async (values: any) => {
    const campaignBudget = values?.campaignBudget
      ? parseFloat(values?.campaignBudget)
      : null;

    const filteredValues: { [key: string]: any } = Object.keys(values).reduce(
      (acc: { [key: string]: any }, key: string) => {
        if (
          values[key] !== undefined &&
          values[key] !== null &&
          values[key] !== ''
        ) {
          acc[key] = values[key];
        }
        return acc;
      },
      {},
    );

    if (campaignBudget !== null) {
      filteredValues.campaignBudget = campaignBudget;
    }
    if (values.campaignStatus && values.campaignStatus !== '') {
      filteredValues.campaignStatus = values.campaignStatus;
    }

    try {
      const updatedValues = {
        body: filteredValues,
        id: compaignsDataById?.data[0]?._id,
      };

      await updateCampaigns(updatedValues)?.unwrap();
      enqueueSnackbar('Campaign Updated Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset();
      onClose();
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
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
      isLoading={updateCampaignLoading}
    >
      {updateCampaignLoading ? (
        <SkeletonTable />
      ) : (
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
      )}
    </CommonDrawer>
  );
}
