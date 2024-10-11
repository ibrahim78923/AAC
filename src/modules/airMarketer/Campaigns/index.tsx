import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import Manage from './Manage';
import useCampaigns from './useCampaigns';
import { PlusIcon, ResetFilterIcon } from '@/assets/icons';
import Tasks from './Tasks';
import ImportIcon from '@/assets/icons/shared/import-icon';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { compareCampaignArray } from './Compaigns.data';
import { AddCircle } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import Calendar from './Calendar';
import ResetTasksFilter from './ResetTasksFilter';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_CAMPAIGNS_PERMISSIONS } from '@/constants/permission-keys';
import EditCampaign from './EditCampaign';
import CommonTabs from '@/components/Tabs';

const Campaigns = () => {
  const {
    setIsResetTaskFilter,
    isResetTaskFilter,
    setCreateCampaign,
    setCurrentTabVal,
    createCampaign,
    compareMethods,
    currentTabVal,
    setIsCompare,
    isCompare,
    theme,
    selectedRows,
    setSelectedRows,
  } = useCampaigns();

  return (
    <>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.custom?.off_white_three} `,
          p: '24px',
          borderRadius: '8px',
        }}
      >
        <Stack
          display="flex"
          direction={{ md: 'row' }}
          justifyContent="space-between"
        >
          <Typography variant="h4" mb={1}>
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
                onClick={() =>
                  setCreateCampaign({
                    isToggle: true,
                    type: 'create',
                    recId: [],
                  })
                }
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

        <Box mt={1.6}>
          <CommonTabs
            tabsArray={['Manage', 'Calendar', 'Tasks']}
            setActiveTab={(val: number) => {
              setCurrentTabVal(val);
            }}
            defaultValue={currentTabVal}
          >
            <Manage
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
            <Calendar />
            <Tasks />
          </CommonTabs>
        </Box>
      </Box>

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
          isOpen={isResetTaskFilter}
          setIsOpen={setIsResetTaskFilter}
          setCurrentTabVal={setCurrentTabVal}
        />
      )}

      {createCampaign?.isToggle && (
        <EditCampaign
          isOpenDrawer={createCampaign}
          onClose={() => {
            setCreateCampaign({
              ...createCampaign,
              isToggle: false,
              type: '',
              recId: [],
            });
          }}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      )}
    </>
  );
};
export default Campaigns;
