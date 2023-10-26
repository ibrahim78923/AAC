import React, { useState } from 'react';

import { Box, useTheme, Button, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import { FormProvider } from '@/components/ReactHookForm';

import { jobApplicationTabledata } from '@/mock/modules/superAdmin/Settings/Jobs';

import {
  columns,
  jobApplicationDefaultValues,
  jobApplicationFiltersDataArray,
  jobApplicationValidationSchema,
} from './JobApplication.data';

import { FilterSharedIcon, RefreshSharedIcon } from '@/assets/icons';

import { styles } from './JobsApplication.styles';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const JobApplication = () => {
  const theme = useTheme();
  const [jobApplicationSearch, setJobApplicationSearch] = useState<string>('');
  const [isJobApplicationFilterDrawer, setIsJobApplicationFilterDrawer] =
    useState<boolean>(false);

  const methodsJobApplication = useForm({
    resolver: yupResolver(jobApplicationValidationSchema),
    defaultValues: jobApplicationDefaultValues,
  });

  const onSubmit = () => {
    setIsJobApplicationFilterDrawer(false);
  };
  const { handleSubmit } = methodsJobApplication;

  const handelStatusChange = () => {};

  const getColumns = columns(handelStatusChange);

  return (
    <Box>
      <Box
        mt={2}
        mb={3}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '10px',
        }}
      >
        <Search
          label={'Search here'}
          searchBy={jobApplicationSearch}
          setSearchBy={setJobApplicationSearch}
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
          <Button sx={styles.refreshButton(theme)}>
            <RefreshSharedIcon />
          </Button>
          <Button
            sx={styles.filterButton(theme)}
            onClick={() => setIsJobApplicationFilterDrawer(true)}
          >
            <FilterSharedIcon /> &nbsp; Filter
          </Button>
        </Box>
      </Box>
      <Box>
        <TanstackTable columns={getColumns} data={jobApplicationTabledata} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Box>
      <CommonDrawer
        isDrawerOpen={isJobApplicationFilterDrawer}
        onClose={() => setIsJobApplicationFilterDrawer(false)}
        title="Filter"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <>
          <FormProvider
            methods={methodsJobApplication}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              {jobApplicationFiltersDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component
                    {...item.componentProps}
                    size={'small'}
                    options={item?.options}
                  >
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
  );
};

export default JobApplication;
