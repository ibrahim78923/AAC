import React, { useState } from 'react';

import {
  Box,
  useTheme,
  Button,
  Checkbox,
  Grid,
  MenuItem,
  Menu,
} from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';
import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import { FormProvider } from '@/components/ReactHookForm';

import {
  jobPostingDataArray,
  jobPostingDefaultValues,
  jobPostingFiltersDataArray,
  jobPostingFiltersDefaultValues,
  jobPostingFiltersValidationSchema,
  jobPostingValidationSchema,
} from './jobPosting.data';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { JobPostingPropsI } from './JobPostingProps.interface';

import { jobPostingTabledata } from '@/mock/modules/Settings/Jobs';

import { DownIcon, FilterSharedIcon, RefreshSharedIcon } from '@/assets/icons';

import { styles } from './Jobs.styles';
import { v4 as uuidv4 } from 'uuid';
import { AlertModals } from '@/components/AlertModals';

const JobPosting = ({
  isJobPostingDrawer,
  setIsJobPostingDrawer,
}: JobPostingPropsI) => {
  const columns: any = [
    {
      accessorFn: (row: any) => row.id,
      id: 'id',
      cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.jobTitle,
      id: 'jobTitle',
      cell: (info: any) => info.getValue(),
      header: 'Job Title',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.shortDescription,
      id: 'shortDescription',
      isSortable: true,
      header: 'Short Discription',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.category,
      id: 'category',
      isSortable: true,
      header: 'Category',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.noOfVacancy,
      id: 'noOfVacancy',
      isSortable: true,
      header: 'No ofVacency',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.createdBy,
      id: 'createdBy',
      isSortable: true,
      header: 'Created By',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.createdDate,
      id: 'createdDate',
      isSortable: true,
      header: 'Created date',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => info.getValue(),
    },
  ];

  const theme = useTheme();
  const [jobPostingSearch, setJobPostingSearch] = useState<string>('');
  const [isJobPostingFilterDrawer, setIsJobPostingFilterDrawer] =
    useState<boolean>(false);
  const [isjobPostingDeleteModal, setIsJobPostingDeleteModal] =
    useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const methodsAddJobPosting = useForm({
    resolver: yupResolver(jobPostingValidationSchema),
    defaultValues: jobPostingDefaultValues,
  });
  const methodsFilterJobPosting = useForm({
    resolver: yupResolver(jobPostingFiltersValidationSchema),
    defaultValues: jobPostingFiltersDefaultValues,
  });

  const onSubmit = () => {
    setIsJobPostingDrawer(false);
  };

  const { handleSubmit } = methodsAddJobPosting;
  const { handleSubmit: filterSubmitHandler } = methodsFilterJobPosting;

  return (
    <Box>
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
          searchBy={jobPostingSearch}
          setSearchBy={setJobPostingSearch}
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
            <MenuItem onClick={() => setIsJobPostingDrawer(true)}>
              Edit
            </MenuItem>
            <MenuItem onClick={() => setIsJobPostingDrawer(true)}>
              View
            </MenuItem>
            <MenuItem onClick={() => setIsJobPostingDeleteModal(true)}>
              Delete
            </MenuItem>
          </Menu>

          <Button sx={styles.refreshButton}>
            <RefreshSharedIcon />
          </Button>
          <Button
            sx={styles.filterButton(theme)}
            onClick={() => setIsJobPostingFilterDrawer(true)}
          >
            <FilterSharedIcon /> &nbsp; Filter
          </Button>
        </Box>
      </Box>
      <Box>
        <TanstackTable columns={columns} data={jobPostingTabledata} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Box>
      <CommonDrawer
        isDrawerOpen={isJobPostingDrawer}
        onClose={() => setIsJobPostingDrawer(false)}
        title="Post a Job"
        okText="Post"
        isOk={true}
        footer={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <>
          <FormProvider
            methods={methodsAddJobPosting}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              {jobPostingDataArray?.map((item: any) => (
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
      <CommonDrawer
        isDrawerOpen={isJobPostingFilterDrawer}
        onClose={() => setIsJobPostingFilterDrawer(false)}
        title="Filters"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={filterSubmitHandler(onSubmit)}
      >
        <>
          <FormProvider
            methods={methodsFilterJobPosting}
            onSubmit={filterSubmitHandler(onSubmit)}
          >
            <Grid container spacing={4}>
              {jobPostingFiltersDataArray?.map((item: any) => (
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

      <AlertModals
        message={'Are you sure you want to delete this entry ?'}
        type="delete"
        open={isjobPostingDeleteModal}
        handleClose={() => setIsJobPostingDeleteModal(false)}
        handleSubmit={() => setIsJobPostingDeleteModal(false)}
      />
    </Box>
  );
};

export default JobPosting;
