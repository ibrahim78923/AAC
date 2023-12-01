import CommonTabs from '@/components/Tabs';
import React from 'react';
import useWhatsAppMarketing from '../useWhatsAppMarketing';
import Dashboard from './Dashboard';
import Broadcast from './Broadcast';
import Contacts from './Contacts';
import Templates from './Templates';
import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import EditSmsIcon from '@/assets/icons/modules/airMarketer/SMSMarketing/edit-sms-icon';

const WhatsAppMarketingComponent = ({
  handelSwitch,
  setIsCreateTemplate,
  templateType,
  setTemplateType,
}: any) => {
  const { tabVal, setTabVal } = useWhatsAppMarketing();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4">WhatsApp Marketing</Typography>
        {tabVal === 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <Box>
              <FormControl fullWidth sx={{ width: '181px' }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={'monica'}
                >
                  <MenuItem value={'monica'}>Monica</MenuItem>
                  <MenuItem value={'nakita'}>Nakita</MenuItem>
                  <MenuItem value={'arkhan'}>AR Khan</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <EditSmsIcon />
            </Box>
          </Box>
        )}
      </Box>
      <CommonTabs
        tabsArray={['Dashboard', 'Broadcast', 'Contacts', 'Templates']}
        getTabVal={(val: number) => setTabVal(val)}
      >
        <Dashboard />
        <Broadcast />
        <Contacts />
        <Templates
          handelSwitch={handelSwitch}
          setIsCreateTemplate={setIsCreateTemplate}
          templateType={templateType}
          setTemplateType={setTemplateType}
        />
      </CommonTabs>
    </>
  );
};

export default WhatsAppMarketingComponent;
