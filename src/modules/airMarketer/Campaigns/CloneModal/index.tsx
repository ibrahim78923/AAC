import { useEffect } from 'react';

import { Grid, Box } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import { enqueueSnackbar } from 'notistack';
import {
  dataArrayFeatures,
  defaultValuesFeatures,
  validationSchemaFeatures,
} from './CloneModal.data';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import CommonDrawer from '@/components/CommonDrawer';
import useCampaigns from '../useCampaigns';
import dayjs from 'dayjs';
import { DATE_FORMAT, indexNumbers } from '@/constants';

const CloneModal = ({
  openCloneModal,
  handleCloseFeaturesModal,
  compaignsDataById,
  setSelectedRows,
}: any) => {
  const { createCampaignsLoading, UserListData, postCampaigns }: any =
    useCampaigns();

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

  const methods = useForm<any>({
    resolver: yupResolver(validationSchemaFeatures),
    defaultValues: defaultValuesFeatures,
  });
  const { handleSubmit, reset, setValue } = methods;

  const onSubmit = async (values: any) => {
    const campaignBudget = values.campaignBudget
      ? parseFloat(values.campaignBudget)
      : null;
    values.campaignOwner = values?.campaignOwner?._id;
    const obj = {
      ...values,
      startDate: values?.startDate
        ? dayjs(values?.startDate[0])?.format(DATE_FORMAT?.API)
        : undefined,
      endDate: values?.endDate
        ? dayjs(values?.endDate[0])?.format(DATE_FORMAT?.API)
        : undefined,
      campaignBudget,
    };
    try {
      await postCampaigns({ body: obj })?.unwrap();
      enqueueSnackbar('Campaigns created successfully', {
        variant: 'success',
      });
      handleCloseFeaturesModal();
    } catch (error) {
      enqueueSnackbar('Error while creating campaigns', {
        variant: 'error',
      });
    }
    reset();
    setSelectedRows([]);
  };
  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openCloneModal}
        onClose={() => handleCloseFeaturesModal()}
        title={'Clone Campaign'}
        okText={'Clone'}
        isOk
        cancelText={'Cancel'}
        footer
        submitHandler={handleSubmit(onSubmit)}
        isLoading={createCampaignsLoading}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={2}>
              {dataArrayFeatures(UserListData)?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                >
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
    </div>
  );
};
export default CloneModal;
