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
import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import { AlertModals } from '@/components/AlertModals';

import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';

import {
  addTaxFormDefaultValues,
  addTaxFormFiltersDataArray,
  addTaxFormValidationSchema,
  columns,
  taxFormFiltersDefaultValues,
  taxFormFiltersFiltersDataArray,
  taxFormFiltersValidationSchema,
} from './TaxCalculations.data';

import { taxCalculationTableData } from '@/mock/modules/Settings/TaxCalculation';

import { DownIcon, FilterSharedIcon, RefreshSharedIcon } from '@/assets/icons';
import PlusShared from '@/assets/icons/shared/plus-shared';

import { styles } from './TaxCalculations.styles';

import { yupResolver } from '@hookform/resolvers/yup';
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
  const [isTaxDeleteModal, setisTaxDeleteModal] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <MenuItem onClick={() => setisTaxDeleteModal(true)}>
              Delete
            </MenuItem>
          </Menu>
          <Button sx={styles.refreshButton(theme)}>
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
      <AlertModals
        message={'Are you sure you want to delete this entry ?'}
        type="delete"
        open={isTaxDeleteModal}
        handleClose={() => setisTaxDeleteModal(false)}
        handleSubmit={() => setisTaxDeleteModal(false)}
      />
    </Box>
  );
};

export default TaxCalculation;
