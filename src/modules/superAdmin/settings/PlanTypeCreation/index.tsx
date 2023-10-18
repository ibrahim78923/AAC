import React, { useState } from 'react';

import { Box, Button, Typography, Grid } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';

import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

import {
  columns,
  planTypeCreationDefaultValues,
  planTypeCreationFiltersDataArray,
  planTypeCreationValidationSchema,
} from './PlanTypeCreation.data';

import { planTypeCreationTableData } from '@/mock/modules/superAdmin/Settings/PlanTypeCreation';

import PlusShared from '@/assets/icons/shared/plus-shared';

import { v4 as uuidv4 } from 'uuid';

const PlanTypeCreation = () => {
  const [isPlanTypeCreationDrawer, setIsPlanTypeCreationDrawer] =
    useState(false);
  const [planTypeCreationSearch, setPlanTypeCreationSearch] = useState('');

  const methodsPlanTypeCreation = useForm({
    resolver: yupResolver(planTypeCreationValidationSchema),
    defaultValues: planTypeCreationDefaultValues,
  });

  const onSubmit = () => {
    setIsPlanTypeCreationDrawer(false);
  };
  const { handleSubmit } = methodsPlanTypeCreation;

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
          Plan Type Creation
        </Typography>
        <Box>Filter here</Box>
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
          searchBy={planTypeCreationSearch}
          setSearchBy={setPlanTypeCreationSearch}
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
            variant="contained"
            sx={{ height: '36px', fontWeight: '500' }}
            onClick={() => setIsPlanTypeCreationDrawer(true)}
          >
            <PlusShared /> &nbsp; Add Plan Type
          </Button>
        </Box>
      </Box>
      <Box>
        <TanstackTable columns={columns} data={planTypeCreationTableData} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Box>
      <CommonDrawer
        isDrawerOpen={isPlanTypeCreationDrawer}
        onClose={() => setIsPlanTypeCreationDrawer(false)}
        title="Add Plan Type"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <>
          <FormProvider
            methods={methodsPlanTypeCreation}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              {planTypeCreationFiltersDataArray?.map((item: any) => (
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
  );
};

export default PlanTypeCreation;
