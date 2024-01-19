import { Box, Button, Grid, Typography } from '@mui/material';
import Manage from './Manage';
import useCampaigns from './useCampaigns';
import { PlusIcon } from '@/assets/icons';
import Tasks from './Tasks';
import ImportIcon from '@/assets/icons/shared/import-icon';
import Filters from './Filters';
import { campaignsTabs } from './Campaigns.data';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { useState } from 'react';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { campaignArray, compareCampaignArray } from './Compaigns.data';
import { AddCircle } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { v4 as uuidv4 } from 'uuid';

const Campaigns = () => {
  const { isOpenFilter, setIsOpenFilter, theme } = useCampaigns();
  const [isCreateTask, setIsCreateTask] = useState(false);
  const [isCompare, setIsCompare] = useState(false);
  const CampaignTask: any = useForm({});
  return (
    <Box>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.custom?.off_white_three} `,
          p: '24px 0px',
          borderRadius: '8px',
        }}
      >
        <Box
          justifyContent="space-between"
          alignItems="center"
          sx={{ padding: '0px 24px', display: { md: 'flex' } }}
        >
          <Typography variant="h4">Campaigns</Typography>

          <Box>
            <Button
              variant="outlined"
              className="small"
              color="inherit"
              sx={{ mr: 1, mt: 0.2 }}
              startIcon={<ImportIcon />}
              onClick={() => setIsCompare(true)}
            >
              Compare campaigns
            </Button>
            <Button
              variant="contained"
              className="small"
              startIcon={<PlusIcon />}
              onClick={() => setIsCreateTask(true)}
            >
              Create campaigns made changes
            </Button>
          </Box>
        </Box>

        <Box sx={{ padding: '0px 24px' }} mt={1.6}>
          <HorizontalTabs tabsDataArray={campaignsTabs}>
            <Manage />
            {/* <Calendar /> */}
            <Manage />
            <Tasks />
          </HorizontalTabs>
        </Box>
      </Box>
      {isOpenFilter && (
        <Filters
          isOpenDrawer={isOpenFilter}
          onClose={() => setIsOpenFilter(false)}
        />
      )}
      <CommonDrawer
        isDrawerOpen={isCreateTask}
        onClose={() => {
          setIsCreateTask(false);
        }}
        title={'Create Campaigns'}
        okText="Create"
        isOk
        footer={true}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={CampaignTask}>
            <Grid container spacing={2}>
              {campaignArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component
                    {...item.componentProps}
                    size={'small'}
                  ></item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>

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
          <FormProvider methods={CampaignTask}>
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
            <Button sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AddCircle /> Add More
            </Button>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </Box>
  );
};
export default Campaigns;
