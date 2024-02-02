import React, { useState } from 'react';

import {
  Box,
  Button,
  Grid,
  Switch,
  Typography,
  useTheme,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';

import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

import { useForm } from 'react-hook-form';

import { isNullOrEmpty } from '@/utils';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider } from '@/components/ReactHookForm';
import { AlertModals } from '@/components/AlertModals';

import {
  quickLinksData,
  quickLinksTableData,
} from '@/mock/modules/superAdmin/Settings/QuickLinks';
import { columns, quickLinksFilterFiltersDataArray } from './QuickLinks.data';
import {
  jobApplicationDefaultValues,
  jobApplicationValidationSchema,
} from '../Jobs/JobApplication/JobApplication.data';

import {
  ArrowLeftIcon,
  DownIcon,
  FilterSharedIcon,
  RefreshSharedIcon,
} from '@/assets/icons';

import PlusShared from '@/assets/icons/shared/plus-shared';

import { styles } from './QuickLinks.style';
import { v4 as uuidv4 } from 'uuid';

const QuickLinks = () => {
  const theme = useTheme();
  const [isQuickLinksFilterDrawerOpen, setIsQuickLinksFilterDrawerOpen] =
    useState(false);
  const [quickLinksSearch, setQuickLinksSearch] = useState('');
  const [isManageQuickLinks, setIsManageQuickLinks] = useState<boolean>(false);
  const [isQuickLinksDeleteModal, setisQuickLinksDeleteModal] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const methodsJobApplication = useForm({
    resolver: yupResolver(jobApplicationValidationSchema),
    defaultValues: jobApplicationDefaultValues,
  });

  const onSubmit = () => {
    setIsQuickLinksFilterDrawerOpen(false);
  };
  const { handleSubmit } = methodsJobApplication;

  return (
    <>
      {!isManageQuickLinks ? (
        <Box
          sx={{
            borderRadius: '15px',
            border: '1px solid #EAECF0',
          }}
        >
          <Box sx={styles?.pageHeader}>
            <Box sx={styles?.heading}>
              <Typography variant="h3" sx={{ fontWeight: '600' }}>
                Quick Links
              </Typography>
              <Button
                variant="contained"
                sx={{ height: '36px', fontWeight: '500' }}
                onClick={() => setIsManageQuickLinks(true)}
              >
                <PlusShared /> &nbsp; Manage
              </Button>
            </Box>
            <Box sx={styles?.filterBar}>
              <Box sx={styles?.search}>
                <Search
                  label={'Search here'}
                  searchBy={quickLinksSearch}
                  setSearchBy={setQuickLinksSearch}
                  width="260px"
                  size="small"
                />
              </Box>
              <Box sx={styles?.filterButtons}>
                <Button
                  id="basic-button"
                  aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={actionMenuOpen ? 'true' : undefined}
                  onClick={handleClick}
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
                  <MenuItem
                    style={{ fontSize: '14px' }}
                    onClick={() => setisQuickLinksDeleteModal(true)}
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
                  onClick={() => setIsQuickLinksFilterDrawerOpen(true)}
                >
                  <FilterSharedIcon /> &nbsp; Filter
                </Button>
              </Box>
            </Box>
          </Box>
          <Box>
            <TanstackTable columns={columns} data={quickLinksTableData} />
            <CustomPagination
              count={1}
              rowsPerPageOptions={[1, 2]}
              entriePages={1}
            />
          </Box>
          <CommonDrawer
            isDrawerOpen={isQuickLinksFilterDrawerOpen}
            onClose={() => setIsQuickLinksFilterDrawerOpen(false)}
            title="Filters"
            okText="Apply"
            isOk={true}
            footer={true}
            submitHandler={() => setIsQuickLinksFilterDrawerOpen(false)}
          >
            <>
              <FormProvider
                methods={methodsJobApplication}
                onSubmit={handleSubmit(onSubmit)}
              >
                <Grid container spacing={4}>
                  {quickLinksFilterFiltersDataArray?.map((item: any) => (
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
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              cursor: 'pointer',
            }}
            onClick={() => setIsManageQuickLinks(false)}
          >
            <ArrowLeftIcon />
            <Typography variant="h4" sx={{ fontWeight: '600' }}>
              Quick Links
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ marginTop: '40px' }}>
            {!isNullOrEmpty(quickLinksData) &&
              quickLinksData.map((item: any) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                  <Box sx={styles.quickLinksCard(theme)}>
                    <Box sx={styles.quickLinksCardHead(theme)}>
                      <Typography variant="h6">{item.label}</Typography>
                    </Box>
                    {item.list.map((options: any) => (
                      <Box
                        key={uuidv4()}
                        sx={{
                          padding: '4px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography sx={{ fontWeight: '500' }}>
                          {options.label}
                        </Typography>
                        <Switch {...label} defaultChecked={options.isChecked} />
                      </Box>
                    ))}
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
      <AlertModals
        message={'Are you sure you want to delete this entry ?'}
        type="delete"
        open={isQuickLinksDeleteModal}
        handleClose={() => setisQuickLinksDeleteModal(false)}
        handleSubmit={() => setisQuickLinksDeleteModal(false)}
      />
    </>
  );
};

export default QuickLinks;
