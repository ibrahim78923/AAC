import React, { useState } from 'react';

import {
  Box,
  Button,
  Typography,
  useTheme,
  Grid,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';

import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
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
import useNewsAndEvents from './useNewsAndEvents';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SUPER_ADMIN_SETTINGS_NEWS_AND_EVENTS_PERMISSIONS } from '@/constants/permission-keys';

const NewsAndEvents = () => {
  const theme = useTheme();
  const [isNewsAndEventsFilterDrawerOpen, setIsNewsAndEventsFilterDrawerOpen] =
    useState(false);
  const [newsAndEventsSearch, setNewsAndEventsSearch] = useState('');
  const [isNewsAndEventsDeleteModal, setisNewsAndEventsDeleteModal] =
    useState(false);
  const [isNewsAndEventAddModal, setIsNewsAndEventAddModal] = useState(false);

  const {
    anchorEl,
    actionMenuOpen,
    handleClick,
    handleClose,
    isDisabled,
    setIsDisabled,
    tableRowValues,
    setTableRowValues,
    isOpenEditDrawer,
    handleOpenEditDrawer,
    handleCloseEditDrawer,
  } = useNewsAndEvents();

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
      }}
    >
      <Box sx={{ padding: '16px 24px' }}>
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
        <Box sx={styles?.filterBar}>
          <PermissionsGuard
            permissions={[
              SUPER_ADMIN_SETTINGS_NEWS_AND_EVENTS_PERMISSIONS?.Search_and_Filter,
            ]}
          >
            <Box sx={styles?.search}>
              <Search
                label={'Search here'}
                searchBy={newsAndEventsSearch}
                setSearchBy={setNewsAndEventsSearch}
                width="100%"
              />
            </Box>
          </PermissionsGuard>

          <Box sx={styles?.filterButtons}>
            <Button
              id="basic-button"
              aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={actionMenuOpen ? 'true' : undefined}
              onClick={handleClick}
              disabled={!isDisabled}
              sx={styles?.actionBtn}
              className="small"
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
              PaperProps={{
                style: {
                  width: '112px',
                },
              }}
            >
              <PermissionsGuard
                permissions={[
                  SUPER_ADMIN_SETTINGS_NEWS_AND_EVENTS_PERMISSIONS?.Edit,
                ]}
              >
                <MenuItem onClick={handleOpenEditDrawer}>Edit</MenuItem>
              </PermissionsGuard>

              <MenuItem>Active</MenuItem>
              <MenuItem>Inactive</MenuItem>
              <PermissionsGuard
                permissions={[
                  SUPER_ADMIN_SETTINGS_NEWS_AND_EVENTS_PERMISSIONS?.Delete,
                ]}
              >
                <MenuItem onClick={() => setisNewsAndEventsDeleteModal(true)}>
                  Delete
                </MenuItem>
              </PermissionsGuard>
            </Menu>
            <PermissionsGuard
              permissions={[
                SUPER_ADMIN_SETTINGS_NEWS_AND_EVENTS_PERMISSIONS?.Refresh_Record,
              ]}
            >
              <Tooltip title={'Refresh Filter'} placement="top-start" arrow>
                <Button sx={styles?.refreshButton(theme)} className="small">
                  <RefreshSharedIcon />
                </Button>
              </Tooltip>
            </PermissionsGuard>

            <PermissionsGuard
              permissions={[
                SUPER_ADMIN_SETTINGS_NEWS_AND_EVENTS_PERMISSIONS?.Search_and_Filter,
              ]}
            >
              <Button
                sx={styles?.filterButton(theme)}
                className="small"
                onClick={() => setIsNewsAndEventsFilterDrawerOpen(true)}
              >
                <FilterSharedIcon /> &nbsp; Filter
              </Button>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                SUPER_ADMIN_SETTINGS_NEWS_AND_EVENTS_PERMISSIONS?.Add,
              ]}
            >
              <Button
                variant="contained"
                sx={{
                  fontWeight: '500',
                  width: '90px',
                  '@media (max-width:581px)': {
                    width: '100%',
                  },
                }}
                className="small"
                onClick={() => setIsNewsAndEventAddModal(true)}
              >
                <PlusShared /> &nbsp; Add
              </Button>
            </PermissionsGuard>
          </Box>
        </Box>
      </Box>
      <PermissionsGuard
        permissions={[
          SUPER_ADMIN_SETTINGS_NEWS_AND_EVENTS_PERMISSIONS?.News_and_Events_List,
        ]}
      >
        <Box>
          <TanstackTable
            columns={columns(
              isDisabled,
              setIsDisabled,
              tableRowValues,
              setTableRowValues,
            )}
            data={newsAndEventsTabledata}
            isPagination={true}
          />
        </Box>
      </PermissionsGuard>

      <CommonDrawer
        isDrawerOpen={isNewsAndEventsFilterDrawerOpen || isOpenEditDrawer}
        onClose={() => {
          setIsNewsAndEventsFilterDrawerOpen(false);
          handleCloseEditDrawer();
        }}
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
