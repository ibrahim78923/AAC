import CommonDrawer from '@/components/CommonDrawer';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { styles } from './PaidAds.styles';
import { FacebookIcon, LinkdinIcon } from '@/assets/icons';
import usePaidAds from './usePaidAds';
import { v4 as uuidv4 } from 'uuid';
import { createAudience } from './PaidAds.data';
import WebsiteVisitors from './WebsiteVisitors';
import ContactList from './ContactList';
import CompnayList from './CompanyList';
import Lookalike from './Lookalike';
import Segments from './Segments';

const PaidAds = () => {
  const {
    isCreateAudience,
    setIsCreateAudience,
    handleCloseDrawer,
    theme,
    handleDrawerActions,
    isDrawerOpen,
  } = usePaidAds();

  return (
    <>
      <Button onClick={() => setIsCreateAudience(true)}>Create Audience</Button>
      <CommonDrawer
        isDrawerOpen={isCreateAudience}
        onClose={() => setIsCreateAudience(false)}
        title="Create Audience"
      >
        {createAudience.map((item: any) => (
          <Box
            sx={styles.createDrawer}
            key={uuidv4()}
            onClick={() => handleDrawerActions(item?.title)}
          >
            <Typography variant="h6">{item?.title}</Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.custom.main }}
            >
              {item?.desc}
            </Typography>
            <Box display="flex" ml="-10px">
              <FacebookIcon />
              <LinkdinIcon />
            </Box>
          </Box>
        ))}
      </CommonDrawer>
      {isDrawerOpen === 'Websites Visitors' && (
        <WebsiteVisitors
          open={Boolean(isDrawerOpen)}
          onClose={handleCloseDrawer}
        />
      )}
      {isDrawerOpen === 'Contact List' && (
        <ContactList open={Boolean(isDrawerOpen)} onClose={handleCloseDrawer} />
      )}
      {isDrawerOpen === 'Company List' && (
        <CompnayList open={Boolean(isDrawerOpen)} onClose={handleCloseDrawer} />
      )}
      {isDrawerOpen === 'Lookalike' && (
        <Lookalike open={Boolean(isDrawerOpen)} onClose={handleCloseDrawer} />
      )}
      {isDrawerOpen === 'Segments' && (
        <Segments open={Boolean(isDrawerOpen)} onClose={handleCloseDrawer} />
      )}
    </>
  );
};

export default PaidAds;
