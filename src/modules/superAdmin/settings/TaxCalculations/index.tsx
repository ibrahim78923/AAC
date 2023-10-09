import React, { useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  Typography,
  useTheme,
  Grid,
} from '@mui/material';

import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

import { FormProvider } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import {
  addTaxFormDefaultValues,
  addTaxFormFiltersDataArray,
  addTaxFormValidationSchema,
  taxFormFiltersDefaultValues,
  taxFormFiltersFiltersDataArray,
  taxFormFiltersValidationSchema,
} from './TaxCalculations.data';

import { taxCalculationTableData } from '@/mock/modules/Settings/TaxCalculation';

import { FilterSharedIcon, RefreshSharedIcon } from '@/assets/icons';
import PlusShared from '@/assets/icons/shared/plus-shared';

import { styles } from './TaxCalculations.styles';
import { v4 as uuidv4 } from 'uuid';

const TaxCalculation = () => {
  const theme = useTheme();
  const [
    isTaxCalculationFilterDrawerOpen,
    setIsTaxCalculationFilterDrawerOpen,
  ] = useState(false);
  const [isTaxCalculationDrawerOpen, setIsTaxCalculationDrawerOpen] =
    useState(false);
  const [taxCalculationSearch, setTaxCalculationSearch] = useState('');

  const columns: any = [
    {
      accessorFn: (row: any) => row.id,
      id: 'id',
      cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.taxName,
      id: 'taxName',
      cell: (info: any) => info.getValue(),
      header: 'Tax Name',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.taxPercentage,
      id: 'taxPercentage',
      isSortable: true,
      header: 'tax Percentage',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.description,
      id: 'description',
      isSortable: true,
      header: 'Description',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.createDate,
      id: 'createDate',
      isSortable: true,
      header: 'Create Date',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.activeModule,
      id: 'activeModule',
      isSortable: true,
      header: 'Active Module',
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

  const methodsAddTaxForm = useForm({
    resolver: yupResolver(addTaxFormValidationSchema),
    defaultValues: addTaxFormDefaultValues,
  });

  const methodsTaxFormFilters = useForm({
    resolver: yupResolver(taxFormFiltersValidationSchema),
    defaultValues: taxFormFiltersDefaultValues,
  });

  const onSubmit = () => {
    setIsTaxCalculationDrawerOpen(false);
  };
  const { handleSubmit } = methodsAddTaxForm;
  const { handleSubmit: submitHandler } = methodsTaxFormFilters;

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
          Tax Calculation
        </Typography>
        <Button
          variant="contained"
          sx={{ height: '36px', fontWeight: '500' }}
          onClick={() => setIsTaxCalculationDrawerOpen(true)}
        >
          <PlusShared /> &nbsp; Add
        </Button>
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
          searchBy={taxCalculationSearch}
          setSearchBy={setTaxCalculationSearch}
          width="100%"
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Button sx={styles.refreshButton}>
            <RefreshSharedIcon />
          </Button>
          <Button
            sx={styles.filterButton(theme)}
            onClick={() => setIsTaxCalculationFilterDrawerOpen(true)}
          >
            <FilterSharedIcon /> &nbsp; Filter
          </Button>
        </Box>
      </Box>

      <Box>
        <TanstackTable columns={columns} data={taxCalculationTableData} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Box>

      <CommonDrawer
        isDrawerOpen={isTaxCalculationFilterDrawerOpen}
        onClose={() => setIsTaxCalculationFilterDrawerOpen(false)}
        title="Filters"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={submitHandler(onSubmit)}
      >
        <>
          <FormProvider
            methods={methodsAddTaxForm}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              {taxFormFiltersFiltersDataArray?.map((item: any) => (
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
        isDrawerOpen={isTaxCalculationDrawerOpen}
        onClose={() => setIsTaxCalculationDrawerOpen(false)}
        title="Tax Form"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <>
          <FormProvider
            methods={methodsAddTaxForm}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              {addTaxFormFiltersDataArray?.map((item: any) => (
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

export default TaxCalculation;
