import CommonDrawer from '@/components/CommonDrawer';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { styles } from './CreateAudience.style';
import {
  FacebookSquareIcon,
  LinkedInSquareIcon,
  PlusIcon,
} from '@/assets/icons';
import usePaidAds from './useCreateAudience';
import { v4 as uuidv4 } from 'uuid';
import { createAudience } from './CreateAudience.data';
import WebsiteVisitors from './WebsiteVisitors';
import ContactList from './ContactList';
import CompnayList from './CompanyList';
import Lookalike from './Lookalike';
import Segments from './Segments';

const CreateAudience = () => {
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
      <Button
        startIcon={<PlusIcon />}
        className="audienceBtn small"
        onClick={() => setIsCreateAudience(true)}
        sx={{ width: { xs: '100%', sm: 'auto' } }}
      >
        Create Audience
      </Button>
      <CommonDrawer
        isDrawerOpen={isCreateAudience}
        onClose={() => setIsCreateAudience(false)}
        title="Create Audience"
        okText={'Add'}
        isOk={true}
        footer
      >
        {createAudience?.map((item: any) => (
          <Box
            sx={styles?.createDrawer}
            key={uuidv4()}
            onClick={() => handleDrawerActions(item?.title)}
          >
            <Typography variant="h6">{item?.title}</Typography>
            <Typography
              variant="body2"
              sx={{ color: theme?.palette?.custom?.main }}
            >
              {item?.desc}
            </Typography>
            <Box display="flex" gap={1} mt={1}>
              <LinkedInSquareIcon />
              <FacebookSquareIcon />
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

export default CreateAudience;
