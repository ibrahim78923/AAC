import { Box, Button, Grid, Typography } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

import { PlusIcon } from '@/assets/icons';

import useCompaigns from './useCompaigns';
import Manage from './Manage';
import Calendar from './Calendar';
import Tasks from './Tasks';

import CommonTabs from '@/components/Tabs';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import { campaignArray, compareCampaignArray } from './Compaigns.data';

import { v4 as uuidv4 } from 'uuid';

const Compaigns = () => {
  const {
    theme,
    setTabVal,
    isCreateTask,
    setIsCreateTask,
    CampaignTask,
    isCompare,
    setIsCompare,
  } = useCompaigns();
  return (
    <>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
          p: '24px 0px',
          borderRadius: '8px',
        }}
      >
        <Box
          justifyContent="space-between"
          alignItems="center"
          sx={{ padding: '0px 24px', display: { md: 'flex' } }}
        >
          <Typography variant="h4">Compaigns</Typography>

          <Box>
            <Button
              onClick={() => setIsCompare(true)}
              variant="outlined"
              sx={{ mr: 1, mt: 0.2 }}
              startIcon={<PlusIcon />}
            >
              Compare compaigns
            </Button>
            <Button
              onClick={() => setIsCreateTask(true)}
              variant="contained"
              startIcon={<PlusIcon />}
            >
              Create compaigns
            </Button>
          </Box>
        </Box>

        <Box sx={{ padding: '0px 24px' }}>
          <CommonTabs
            getTabVal={(val: number) => setTabVal(val)}
            isHeader={true}
            tabsArray={['Manage', 'Calendar', 'Tasks']}
          >
            <Manage />
            <Box sx={{ paddingTop: '1rem' }}>
              <Calendar />
            </Box>
            <Tasks />
          </CommonTabs>
        </Box>
      </Box>
      <CommonDrawer
        isDrawerOpen={isCreateTask}
        onClose={() => {
          setIsCreateTask(false);
        }}
        title={'Create Task'}
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
        title={'Show Result'}
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
    </>
  );
};
export default Compaigns;
