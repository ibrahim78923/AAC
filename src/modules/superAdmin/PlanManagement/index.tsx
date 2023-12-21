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
  Tooltip,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import PlanDetails from './PlanDetails';
import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { usePlanManagement } from './usePlanManagement';

import { planManagementFilterFiltersDataArray } from './PlanManagement.data';

import { styles } from './PlanManagement.style';

import { isNullOrEmpty } from '@/utils';

import { FilterSharedIcon, PlusIcon, RefreshTasksIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import { PlanDetailsDataColumnFunction } from './PlanDetails/PlanDetails.data';
import { SUPER_ADMIN_PLAN_MANAGEMENT } from '@/routesConstants/paths';

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
    methodsFaqsFilters,
    filterSubmit,
    isDisabled,
    setIsDisabled,
    tableRowValues,
    setTableRowValues,
  } = usePlanManagement();

  const getPlanManagementRowData = PlanDetailsDataColumnFunction(
    isDisabled,
    setIsDisabled,
    tableRowValues,
    setTableRowValues,
  );

  return (
    <Box sx={styles?.main}>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1}
      >
        <Typography variant="h4" sx={styles?.planManagementHeading}>
          Plan Management
        </Typography>
        .
        <Box sx={styles?.linkStyle}>
          <Link href={`${SUPER_ADMIN_PLAN_MANAGEMENT?.ADD_PLAN}`}>
            <Button
              variant="contained"
              className="small"
              fullWidth
              startIcon={<PlusIcon />}
            >
              Add Plan
            </Button>
          </Link>
        </Box>
      </Box>

      <Stack
        direction="row"
        useFlexGap
        spacing={2}
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="0.8rem"
      >
        <Box width={{ xs: '100%', sm: 'auto' }}>
          <Search
            label="Search here"
            width={'260px'}
            searchBy={searchBy}
            size="small"
            fullWidth
            setSearchBy={setSearchBy}
          />
        </Box>

        <Stack
          direction={{ xs: 'row' }}
          spacing={1}
          useFlexGap
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          width={{ xs: '100%', sm: 'auto' }}
        >
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className="small"
            sx={styles?.actionButton(theme)}
          >
            Actions <ArrowDropDownIcon />
          </Button>
          <Tooltip title={'Refresh Filter'}>
            <Button variant="outlined" color="inherit" className="small">
              <RefreshTasksIcon />
            </Button>
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <Link
              href={{
                pathname: `${SUPER_ADMIN_PLAN_MANAGEMENT?.ADD_PLAN}`,
                query: { data: JSON?.stringify(tableRowValues?.row?.original) },
              }}
              as={`${SUPER_ADMIN_PLAN_MANAGEMENT?.ADD_PLAN}`}
            >
              <MenuItem>Edit</MenuItem>
            </Link>
          </Menu>

          <Button
            className="small"
            sx={styles?.filterButton(theme)}
            onClick={() => setIsFaqsFilterDrawerOpen(true)}
          >
            <FilterSharedIcon /> &nbsp; Filter
          </Button>
        </Stack>
      </Stack>

      <br />
      <CommonDrawer
        isDrawerOpen={isFaqsFilterDrawerOpen}
        onClose={() => setIsFaqsFilterDrawerOpen(false)}
        title="Filters"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={filterSubmit}
      >
        <Box sx={{ marginTop: '1.5rem' }}>
          <FormProvider methods={methodsFaqsFilters}>
            <Grid container spacing={4}>
              {planManagementFilterFiltersDataArray()?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {!isNullOrEmpty(item?.componentProps?.select)
                      ? item?.options?.map((option: any) => (
                          <option key={uuidv4()} value={option?.value}>
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

      <PlanDetails
        searchBy={searchBy}
        getPlanManagementRowData={getPlanManagementRowData}
      />
    </Box>
  );
};

export default PlanManagement;
