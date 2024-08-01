import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import Manage from './Manage';
import useCampaigns from './useCampaigns';
import { PlusIcon, ResetFilterIcon } from '@/assets/icons';
import Tasks from './Tasks';
import ImportIcon from '@/assets/icons/shared/import-icon';
import { campaignsTabs } from './Campaigns.data';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { campaignArray, compareCampaignArray } from './Compaigns.data';
import { AddCircle } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import Calendar from './Calendar';
import ResetTasksFilter from './ResetTasksFilter';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_CAMPAIGNS_PERMISSIONS } from '@/constants/permission-keys';

const Campaigns = () => {
  const {
    createCampaignsLoading,
    setIsResetTaskFilter,
    isResetTaskFilter,
    resetTasksFilters,
    setCurrentTabVal,
    setIsCreateTask,
    setIsOpenFilter,
    setTaskFilters,
    organizationId,
    isCreateTask,
    setIsFilters,
    setIsCompare,
    currentTabVal,
    userListData,
    handleSubmit,
    taskFilters,
    isFilters,
    isCompare,
    onSubmit,
    methods,
    compareMethods,
    theme,
  } = useCampaigns();

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
          <HorizontalTabs
            setActiveTab={(val: number) => {
              setCurrentTabVal(val);
            }}
            defaultValue={currentTabVal}
            tabsDataArray={campaignsTabs}
          >
            <Manage />
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
                {campaignArray(userListData, organizationId)?.map(
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
                            <option key={option?.value} value={option?.value}>
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
            <FormProvider methods={compareMethods}>
              <Grid container spacing={2}>
                {compareCampaignArray?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
                    <item.component {...item?.componentProps} size={'small'}>
                      {item?.componentProps?.select &&
                        item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                    </item.component>
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
          setCurrentTabVal={setCurrentTabVal}
          setIsOpen={setIsResetTaskFilter}
          setTaskFilters={setTaskFilters}
          setIsFiltersOpen={setIsFilters}
          isOpen={isResetTaskFilter}
          taskFilters={taskFilters}
          reset={resetTasksFilters}
          isFilterOpen={isFilters}
        />
      )}
    </Box>
  );
};
export default Campaigns;
