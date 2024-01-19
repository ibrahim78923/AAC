import React from 'react';
import {
  Box,
  Button,
  Typography,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import { useRouter } from 'next/router';
import CommonTabs from '@/components/Tabs';
import Dashboard from './Dashboard';
import Broadcast from './Broadcast';
import Contacts from './Contacts';
import Templates from './Templates';
import { PlusIcon } from '@/assets/icons';
import useWhatsAppMarketingComponent from './useWhatsAppMarketingComponent';
import EditSmsIcon from '@/assets/icons/modules/airMarketer/SMSMarketing/edit-sms-icon';
import { styles } from './WhatsAppMarketing.style';
import { AIR_MARKETER } from '@/routesConstants/paths';

const WhatsAppMarketingComponent = ({
  handelSwitch,
  setIsCreateTemplate,
  templateType,
  setTemplateType,
}: any) => {
  const router = useRouter();
  const { tabVal, setTabVal } = useWhatsAppMarketingComponent();

  return (
    <Box sx={styles?.wrapper}>
      <Box sx={styles.heading}>
        <Typography variant="h3">WhatsApp Marketing </Typography>
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
              <FormControl
                fullWidth
                sx={{
                  width: '181px',
                  '& .MuiInputBase-input': {
                    py: '14px',
                  },
                }}
              >
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
            <Box sx={{ height: '52px' }}>
              <EditSmsIcon />
            </Box>
          </Box>
        )}
        {tabVal === 1 && (
          <Button
            startIcon={<PlusIcon />}
            className="small"
            variant="contained"
            onClick={() =>
              router.push(AIR_MARKETER?.WHATSAPP_MERKETING_CREATE_BROADCAST)
            }
          >
            Create Broadcast
          </Button>
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
    </Box>
  );
};

export default WhatsAppMarketingComponent;
