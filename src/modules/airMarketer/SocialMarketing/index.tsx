import React from 'react';
import { Box, Button } from '@mui/material';
import Calender from './Calender';
import { PlusIcon } from '@/assets/icons';
import CommonTabs from '@/components/Tabs';

const SocialMarketing = () => {
  return (
    <Box
      justifyContent="space-between"
      alignItems="center"
      sx={{
        padding: '0px 24px',
        display: { md: 'flex' },
        position: 'relative',
      }}
    >
      <CommonTabs
        // getTabVal={(val: number) => setTabVal(val)}
        isHeader={false}
        tabsArray={['Calender', 'PostBox', 'Compare Social Post']}
      >
        <Calender />
        <>PostBox</>
        <>Compare Social Post</>
      </CommonTabs>
      <Button
        startIcon={<PlusIcon />}
        sx={{ position: 'absolute', top: '-5px', right: '0px' }}
        variant="contained"
        className="small"
      >
        Create Post
      </Button>
    </Box>
  );
};
export default SocialMarketing;
