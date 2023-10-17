import React, { useState } from 'react';

import {
  Box,
  Button,
  Typography,
  Grid,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';

import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

import { FormProvider } from '@/components/ReactHookForm';

import {
  columns,
  productFeaturesDefaultValues,
  productFeaturesFiltersDataArray,
  productFeaturesValidationSchema,
} from './ProductFeatures.data';

import { productFeatureTableData } from '@/mock/modules/superAdmin/Settings/ProductFeature';

import PlusShared from '@/assets/icons/shared/plus-shared';
import { DownIcon } from '@/assets/icons';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const ProductFeature = () => {
  const theme = useTheme();
  const [isAddProductFeatureDrawer, setIsAddProductFeatureDrawer] =
    useState(false);
  const [productFeatureSearch, setProductFeatureSearch] = useState('');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const methodsProductFeatures = useForm({
    resolver: yupResolver(productFeaturesValidationSchema),
    defaultValues: productFeaturesDefaultValues,
  });
  const onSubmit = () => {
    setIsAddProductFeatureDrawer(false);
  };
  const { handleSubmit } = methodsProductFeatures;

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
          Product Features Setup
        </Typography>
        <Box>...</Box>
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
          searchBy={productFeatureSearch}
          setSearchBy={setProductFeatureSearch}
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
          </Menu>
          <Button
            variant="contained"
            sx={{ height: '36px', fontWeight: '500' }}
            onClick={() => setIsAddProductFeatureDrawer(true)}
          >
            <PlusShared /> &nbsp; Add Feature
          </Button>
        </Box>
      </Box>
      <Box>
        <TanstackTable columns={columns} data={productFeatureTableData} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Box>

      <CommonDrawer
        isDrawerOpen={isAddProductFeatureDrawer}
        onClose={() => setIsAddProductFeatureDrawer(false)}
        title="Add Product Feature form"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <>
          <FormProvider
            methods={methodsProductFeatures}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              {productFeaturesFiltersDataArray?.map((item: any) => (
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

export default ProductFeature;
