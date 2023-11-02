import React, { useState } from 'react';

import {
  Box,
  Button,
  Typography,
  useTheme,
  Grid,
  Menu,
  MenuItem,
} from '@mui/material';

import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import { FormProvider } from '@/components/ReactHookForm';
import { AlertModals } from '@/components/AlertModals';
import QueryModal from './QueryModal';

import { enquiriesTabledata } from '@/mock/modules/superAdmin/Settings/Enquiries';

import {
  columns,
  enquiriesFiltersDefaultValues,
  enquiriesFiltersFiltersDataArray,
  enquiriesFiltersValidationSchema,
} from './Enquiries.data';

import { DownIcon, FilterSharedIcon, RefreshSharedIcon } from '@/assets/icons';

import { styles } from './Enquiries.styles';

import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const Enquiries = () => {
  const theme = useTheme();
  const [isEnquiriesFilterDrawerOpen, setIsEnquiriesFilterDrawerOpen] =
    useState(false);
  const [faqsSearch, setFaqsSearch] = useState('');
  const [isEnquiriesDeleteModal, setIsEnquiriesDeleteModal] = useState(false);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isActionMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
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
        padding: '16px 24px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '19px',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: '600' }}>
          Enquiries
        </Typography>
      </Box>
      <Box
        mt={2}
        mb={3}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Search
          label={'Search here'}
          searchBy={faqsSearch}
          setSearchBy={setFaqsSearch}
          width="100%"
          size="small"
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Button
            id="basic-button"
            aria-controls={isActionMenuOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isActionMenuOpen ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              color: theme.palette.grey[500],
              height: '40px',
              border: '1.5px solid #e7e7e9',
            }}
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
          >
            <MenuItem onClick={() => setIsQueryModalOpen(true)}>Reply</MenuItem>
            <MenuItem>View</MenuItem>
            <MenuItem onClick={() => setIsEnquiriesDeleteModal(true)}>
              Delete
            </MenuItem>
          </Menu>
          <Button sx={styles.refreshButton(theme)}>
            <RefreshSharedIcon />
          </Button>
          <Button
            sx={styles.filterButton(theme)}
            onClick={() => setIsEnquiriesFilterDrawerOpen(true)}
          >
            <FilterSharedIcon /> &nbsp; Filter
          </Button>
        </Box>
      </Box>
      <Box>
        <TanstackTable columns={columns} data={enquiriesTabledata} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
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
        </>
      </CommonDrawer>

      <QueryModal
        isQueryModalOpen={isQueryModalOpen}
        setIsQueryModalOpen={setIsQueryModalOpen}
      />

      <AlertModals
        message={'Are you sure you want to delete this entry ?'}
        type="delete"
        open={isEnquiriesDeleteModal}
        handleClose={() => setIsEnquiriesDeleteModal(false)}
        handleSubmit={() => setIsEnquiriesDeleteModal(false)}
      />
    </Box>
  );
};

export default Enquiries;
