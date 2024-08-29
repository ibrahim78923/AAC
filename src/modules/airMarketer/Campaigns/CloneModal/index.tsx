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
import { indexNumbers } from '@/constants';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { useGetCampaignsByIdQuery } from '@/services/airMarketer/campaigns';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const CloneModal = ({
  openCloneModal,
  handleCloseFeaturesModal,
  setSelectedRows,
  selectedRows,
}: any) => {
  const {
    createCampaignsLoading,
    userListData,
    postCampaignsClone,
    organizationId,
  }: any = useCampaigns();

  const { data: compaignsDataById, isLoading: campaignByIdLoading } =
    useGetCampaignsByIdQuery(selectedRows, {
      skip:
        !Array?.isArray(selectedRows) ||
        selectedRows?.length === indexNumbers?.ZERO,
    });

  useEffect(() => {
    const data = compaignsDataById?.data[indexNumbers?.ZERO];
    const fieldsToSet: any = {
      campaignOwner: data?.campaignOwnerDetails[0],
      startDate: dayjs(data?.startDate)?.isValid()
        ? dayjs(data?.startDate)?.toDate()
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
    // commented for future use
    // values.name = values?.title
    // delete values.title
    // const campaignBudget = values.campaignBudget
    //   ? parseFloat(values.campaignBudget)
    //   : null;
    // values.campaignOwner = values?.campaignOwner?._id;
    // const obj = {
    //   ...values,
    //   startDate: values?.startDate
    //     ? dayjs(values?.startDate[0])?.format(DATE_FORMAT?.API)
    //     : undefined,
    //   endDate: values?.endDate
    //     ? dayjs(values?.endDate[0])?.format(DATE_FORMAT?.API)
    //     : undefined,
    //   campaignBudget,
    // };
    try {
      await postCampaignsClone(values.title)?.unwrap();
      enqueueSnackbar('Campaign cloned successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      handleCloseFeaturesModal();
    } catch (error) {
      enqueueSnackbar('Error while cloning campaigns', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    reset();
    setSelectedRows([]);
  };
  return (
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
      {campaignByIdLoading ? (
        <SkeletonTable />
      ) : (
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={2}>
              {dataArrayFeatures(userListData, organizationId)?.map(
                (item: any) => (
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
                ),
              )}
            </Grid>
          </FormProvider>
        </Box>
      )}
    </CommonDrawer>
  );
};
export default CloneModal;
