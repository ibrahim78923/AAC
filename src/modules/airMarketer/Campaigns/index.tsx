import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import Manage from './Manage';
import useCampaigns from './useCampaigns';
import { PlusIcon, ResetFilterIcon } from '@/assets/icons';
import Tasks from './Tasks';
import ImportIcon from '@/assets/icons/shared/import-icon';
import { campaignsTabs } from './Campaigns.data';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { useState } from 'react';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import {
  campaignArray,
  compareCampaignArray,
  initvalues,
  validationSchema,
} from './Compaigns.data';
import { AddCircle } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { v4 as uuidv4 } from 'uuid';
import Calendar from './Calendar';
import ResetTasksFilter from './ResetTasksFilter';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_CAMPAIGNS_PERMISSIONS } from '@/constants/permission-keys';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { useGetUsersListQuery } from '@/services/airSales/deals';
import { getSession } from '@/utils';
import { ROLES } from '@/constants/strings';

const Campaigns = () => {
  const {
    setIsOpenFilter,
    theme,
    isResetTaskFilter,
    setIsResetTaskFilter,
    postCampaigns,
    createCampaignsLoading,
    campaignsData,
    handeApplyFilter,
    handleResetFilters,
    filterLoading,
    handleSelectAllCheckbox,
    handleSelectSingleCheckBox,
    selectedRows,
    allCamopaignsData,
  } = useCampaigns();
  const [isCreateTask, setIsCreateTask] = useState(false);
  const [isCompare, setIsCompare] = useState(false);
  const { user }: any = getSession();
  const organizationId: any = user?.organization?._id;

  const { data: UserListData } = useGetUsersListQuery({
    role: ROLES?.ORG_EMPLOYEE,
    organization: organizationId,
  });
  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: initvalues,
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: any) => {
    const campaignBudget = values.campaignBudget
      ? parseFloat(values.campaignBudget)
      : null;

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
    } catch (error) {
      enqueueSnackbar('Error while creating campaigns', {
        variant: 'error',
      });
    }
    reset();
    setIsCreateTask(false);
  };

  return (
    <Box>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.custom?.off_white_three} `,
          p: '24px 0px',
          borderRadius: '8px',
        }}
      >
        <Stack
          display="flex"
          direction={{ md: 'row' }}
          justifyContent="space-between"
          sx={{ padding: '0px 24px' }}
        >
          <Typography variant="h4" mb={1} onClick={() => setIsOpenFilter(true)}>
            Campaigns
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={1}>
            <PermissionsGuard
              permissions={[
                AIR_MARKETER_CAMPAIGNS_PERMISSIONS?.COMPARE_CAMPAIGNS,
              ]}
            >
              <Button
                variant="outlined"
                className="small"
                color="inherit"
                sx={{ width: { sm: '200px', xs: '100%' } }}
                startIcon={<ImportIcon />}
                onClick={() => setIsCompare(true)}
              >
                Compare campaigns
              </Button>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                AIR_MARKETER_CAMPAIGNS_PERMISSIONS?.CREATE_CAMPAIGNS,
              ]}
            >
              <Button
                variant="contained"
                className="small"
                startIcon={<PlusIcon />}
                onClick={() => setIsCreateTask(true)}
                sx={{ width: { sm: '200px', xs: '100%' } }}
              >
                Create campaigns
              </Button>
            </PermissionsGuard>
            <Button
              variant="contained"
              color="secondary"
              className="small"
              onClick={() => {
                setIsResetTaskFilter(true);
              }}
            >
              <ResetFilterIcon />
            </Button>
          </Box>
        </Stack>

        <Box sx={{ padding: '0px 24px' }} mt={1.6}>
          <HorizontalTabs tabsDataArray={campaignsTabs}>
            <Manage
              campaignsData={campaignsData}
              handeApplyFilter={handeApplyFilter}
              handleResetFilters={handleResetFilters}
              filterLoading={filterLoading}
              handleSelectSingleCheckBox={handleSelectSingleCheckBox}
              handleSelectAllCheckbox={handleSelectAllCheckbox}
              selectedRows={selectedRows}
              allCamopaignsData={allCamopaignsData}
            />
            <Calendar />
            <Tasks />
          </HorizontalTabs>
        </Box>
      </Box>

      {isCreateTask && (
        <CommonDrawer
          isDrawerOpen={isCreateTask}
          onClose={() => {
            setIsCreateTask(false);
          }}
          title="Create Campaign"
          okText="Create"
          isOk
          footer={true}
          submitHandler={handleSubmit(onSubmit)}
          isLoading={createCampaignsLoading}
        >
          <Box sx={{ paddingTop: '1rem' }}>
            <FormProvider methods={methods}>
              <Grid container spacing={2}>
                {campaignArray(UserListData)?.map((item: any) => (
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
      )}

      {isCompare && (
        <CommonDrawer
          isDrawerOpen={isCompare}
          onClose={() => {
            setIsCompare(false);
          }}
          title={'Compare Campaigns'}
          okText="Create"
          isOk
          footer={true}
        >
          <Box sx={{ paddingTop: '1rem' }}>
            <FormProvider methods={''}>
              <Grid container spacing={2}>
                {compareCampaignArray?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
                    <item.component
                      {...item.componentProps}
                      size={'small'}
                    ></item.component>
                  </Grid>
                ))}
              </Grid>
              <Button
                sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <AddCircle /> Add More
              </Button>
            </FormProvider>
          </Box>
        </CommonDrawer>
      )}

      {isResetTaskFilter && (
        <ResetTasksFilter
          isOpen={isResetTaskFilter}
          setIsOpen={setIsResetTaskFilter}
        />
      )}
    </Box>
  );
};
export default Campaigns;
