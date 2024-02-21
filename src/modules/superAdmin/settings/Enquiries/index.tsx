'use client';
import React, { useState } from 'react';

import {
  Box,
  Button,
  Typography,
  Grid,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';

import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import { FormProvider } from '@/components/ReactHookForm';
import { AlertModals } from '@/components/AlertModals';
import QueryModal from './QueryModal';

import {
  enquiriesFiltersDefaultValues,
  enquiriesFiltersFiltersDataArray,
  enquiriesFiltersValidationSchema,
} from './Enquiries.data';

import { DownIcon, FilterSharedIcon, RefreshSharedIcon } from '@/assets/icons';

import { styles } from './Enquiries.styles';

import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEnquiries } from './useEnquiries';

const Enquiries = () => {
  const [isEnquiriesFilterDrawerOpen, setIsEnquiriesFilterDrawerOpen] =
    useState(false);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isActionMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const {
    tableData,
    tableRowIds,
    handleDeleteEnquiries,
    handleDeleteModal,
    isEnquiriesDeleteModal,
    search,
    setSearch,
  } = useEnquiries();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const methodsEnquiriesFilters = useForm({
    resolver: yupResolver(enquiriesFiltersValidationSchema),
    defaultValues: enquiriesFiltersDefaultValues,
  });

  const onSubmit = () => {
    setIsEnquiriesFilterDrawerOpen(false);
  };
  const { handleSubmit } = methodsEnquiriesFilters;

  return (
    <Box
      sx={{
        borderRadius: '15px',
        border: '1px solid #EAECF0',
      }}
    >
      <Box sx={styles?.pageHeader}>
        <Box sx={styles?.heading}>
          <Typography variant="h3" sx={{ fontWeight: '600' }}>
            Enquiries
          </Typography>
        </Box>
        <Box sx={styles?.filterBar}>
          <Box sx={styles?.search}>
            <Search
              label={'Search here'}
              searchBy={search}
              setSearchBy={setSearch}
              width="260px"
              size="small"
            />
          </Box>
          <Box sx={styles?.filterButtons}>
            <Button
              disabled={tableRowIds.length > 0 ? false : true}
              id="basic-button"
              aria-controls={isActionMenuOpen ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={isActionMenuOpen ? 'true' : undefined}
              onClick={handleClick}
              sx={styles?.actionBtn}
              className="small"
            >
              Actions &nbsp; <DownIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={isActionMenuOpen}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              PaperProps={{
                style: {
                  width: '112px',
                },
              }}
            >
              <MenuItem
                onClick={() => setIsQueryModalOpen(true)}
                style={{ fontSize: '14px' }}
              >
                Reply
              </MenuItem>
              <MenuItem style={{ fontSize: '14px' }}>View</MenuItem>
              <MenuItem
                onClick={handleDeleteModal}
                style={{ fontSize: '14px' }}
              >
                Delete
              </MenuItem>
            </Menu>
            <Tooltip title={'Refresh Filter'} placement="top-start" arrow>
              <Button sx={styles?.refreshButton} className="small">
                <RefreshSharedIcon />
              </Button>
            </Tooltip>
            <Button
              sx={styles?.filterButton}
              className="small"
              onClick={() => setIsEnquiriesFilterDrawerOpen(true)}
            >
              <FilterSharedIcon /> &nbsp; Filter
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <TanstackTable {...tableData} isPagination={true} />
      </Box>
      <CommonDrawer
        isDrawerOpen={isEnquiriesFilterDrawerOpen}
        onClose={() => setIsEnquiriesFilterDrawerOpen(false)}
        title="Filters"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={() => setIsEnquiriesFilterDrawerOpen(false)}
      >
        <>
          <FormProvider
            methods={methodsEnquiriesFilters}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              {enquiriesFiltersFiltersDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
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
        </>
      </CommonDrawer>

      <QueryModal
        isQueryModalOpen={isQueryModalOpen}
        setIsQueryModalOpen={setIsQueryModalOpen}
      />

      {isEnquiriesDeleteModal && (
        <AlertModals
          message={'Are you sure you want to delete this entry ?'}
          type="delete"
          open={isEnquiriesDeleteModal}
          handleClose={handleDeleteModal}
          handleSubmitBtn={handleDeleteEnquiries}
        />
      )}
    </Box>
  );
};

export default Enquiries;
