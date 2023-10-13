import React from 'react';

import Link from 'next/link';

import {
  Button,
  Typography,
  Box,
  Menu,
  MenuItem,
  Stack,
  Grid,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import PlanDetails from './PlanDetails';
import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import AppAvatarGroup from '@/components/AvatarGroup';
import { FormProvider } from '@/components/ReactHookForm';
import { UsePlanManagement } from './UsePlanManagement';

import {
  avatarGroupMockData,
  planManagementFilterFiltersDataArray,
} from './PlanManagement.data';

import { styles } from './PlanManagement.style';

import { FilterSharedIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';

const PlanManagement = () => {
  const {
    searchBy,
    setSearchBy,
    anchorEl,
    isFaqsFilterDrawerOpen,
    setIsFaqsFilterDrawerOpen,
    open,
    theme,
    handleClick,
    handleClose,
    onSubmit,
    methodsFaqsFilters,
    handleSubmit,
  } = UsePlanManagement();
  return (
    <Box sx={styles.main}>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1}
      >
        <Typography variant="h4" sx={styles.planManagementHeading}>
          Plan Management
        </Typography>

        <Box sx={styles.linkStyle}>
          <Link href={'/super-admin/plan-management/add-plan'}>
            <Button variant="contained" fullWidth>
              Add Plan
            </Button>
          </Link>
        </Box>
      </Box>

      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="0.8rem"
      >
        <Search
          label="Search here"
          width={'260px'}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
        />

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={styles.actionButton(theme)}
          >
            Actions <ArrowDropDownIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem>Edit</MenuItem>
          </Menu>

          <Button
            sx={styles.filterButton(theme)}
            onClick={() => setIsFaqsFilterDrawerOpen(true)}
          >
            <FilterSharedIcon /> &nbsp; Filter
          </Button>
        </Stack>
      </Stack>

      <br />
      <AppAvatarGroup data={avatarGroupMockData} />
      <CommonDrawer
        isDrawerOpen={isFaqsFilterDrawerOpen}
        onClose={() => setIsFaqsFilterDrawerOpen(false)}
        title="Filters"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={() => setIsFaqsFilterDrawerOpen(false)}
      >
        <Box sx={{ marginTop: '1.5rem' }}>
          <FormProvider
            methods={methodsFaqsFilters}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              {planManagementFilterFiltersDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>

      <PlanDetails />
    </Box>
  );
};

export default PlanManagement;

// test comment
