import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { FilterAlt } from '@mui/icons-material';
import CommonDrawer from '@/components/Drawer';

const FilterDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Box>
      <Button
        sx={{ border: '1px solid #D1D5DB', color: '#6B7280' }}
        startIcon={<FilterAlt />}
        onClick={() => setIsDrawerOpen(true)}
      >
        Filter
      </Button>

      <CommonDrawer
        okText="Apply"
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        title="Filters"
        isOk={true}
        submitHandler={() => {}}
      >
        <></>
      </CommonDrawer>
    </Box>
  );
};

export default FilterDrawer;
