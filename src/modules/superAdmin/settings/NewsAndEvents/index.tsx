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
import { AlertModals } from '@/components/AlertModals';
import NewsAndEventsModal from './NewsAndEventsModal';

import { FormProvider } from '@/components/ReactHookForm';

import {
  columns,
  newsAndEventsDateDefaultValues,
  newsAndEventsDateFiltersDataArray,
  newsAndEventsDateValidationSchema,
} from './NewsAndEvents.data';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { newsAndEventsTabledata } from '@/mock/modules/superAdmin/Settings/NewsAndEvents';

import PlusShared from '@/assets/icons/shared/plus-shared';
import { DownIcon, FilterSharedIcon, RefreshSharedIcon } from '@/assets/icons';

import { styles } from './NewsAndEvents.style';
import { v4 as uuidv4 } from 'uuid';

const NewsAndEvents = () => {
  const theme = useTheme();
  const [isNewsAndEventsFilterDrawerOpen, setIsNewsAndEventsFilterDrawerOpen] =
    useState(false);
  const [newsAndEventsSearch, setNewsAndEventsSearch] = useState('');
  const [isNewsAndEventsDeleteModal, setisNewsAndEventsDeleteModal] =
    useState(false);

  const [isNewsAndEventAddModal, setIsNewsAndEventAddModal] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const methodsNewsAndEventsFilters = useForm({
    resolver: yupResolver(newsAndEventsDateValidationSchema),
    defaultValues: newsAndEventsDateDefaultValues,
  });
  const onSubmit = () => {
    setIsNewsAndEventsFilterDrawerOpen(false);
  };
  const { handleSubmit } = methodsNewsAndEventsFilters;

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
          News And Events
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
          searchBy={newsAndEventsSearch}
          setSearchBy={setNewsAndEventsSearch}
          width="100%"
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
            aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={actionMenuOpen ? 'true' : undefined}
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
            open={actionMenuOpen}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem>Edit</MenuItem>
            <MenuItem>Active</MenuItem>
            <MenuItem>Inactive</MenuItem>
            <MenuItem onClick={() => setisNewsAndEventsDeleteModal(true)}>
              Delete
            </MenuItem>
          </Menu>
          <Button sx={styles.refreshButton(theme)}>
            <RefreshSharedIcon />
          </Button>
          <Button
            sx={styles.filterButton(theme)}
            onClick={() => setIsNewsAndEventsFilterDrawerOpen(true)}
          >
            <FilterSharedIcon /> &nbsp; Filter
          </Button>
          <Button
            variant="contained"
            sx={{ height: '36px', fontWeight: '500' }}
            onClick={() => setIsNewsAndEventAddModal(true)}
          >
            <PlusShared /> &nbsp; Add
          </Button>
        </Box>
      </Box>
      <Box>
        <TanstackTable columns={columns} data={newsAndEventsTabledata} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Box>
      <CommonDrawer
        isDrawerOpen={isNewsAndEventsFilterDrawerOpen}
        onClose={() => setIsNewsAndEventsFilterDrawerOpen(false)}
        title="Filters"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <>
          <FormProvider
            methods={methodsNewsAndEventsFilters}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              {newsAndEventsDateFiltersDataArray?.map((item: any) => (
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

      <NewsAndEventsModal
        isNewsAndEventAddModal={isNewsAndEventAddModal}
        setIsNewsAndEventAddModal={setIsNewsAndEventAddModal}
      />

      <AlertModals
        message={'Are you sure you want to delete this entry ?'}
        type="delete"
        open={isNewsAndEventsDeleteModal}
        handleClose={() => setisNewsAndEventsDeleteModal(false)}
        handleSubmit={() => setisNewsAndEventsDeleteModal(false)}
      />
    </Box>
  );
};

export default NewsAndEvents;
