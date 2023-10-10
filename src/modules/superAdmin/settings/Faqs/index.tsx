import React, { useState } from 'react';

import {
  Box,
  Button,
  Typography,
  Grid,
  useTheme,
  MenuItem,
  Menu,
} from '@mui/material';

import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import { AlertModals } from '@/components/AlertModals';

import {
  columns,
  faqsFilterDefaultValues,
  faqsFilterFiltersDataArray,
  faqsFilterValidationSchema,
} from './Faqs.data';

import { faqsTableDate } from '@/mock/modules/Settings/Faqs';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';

import { DownIcon, FilterSharedIcon, RefreshSharedIcon } from '@/assets/icons';
import PlusShared from '@/assets/icons/shared/plus-shared';

import { styles } from './Faqs.styles';
import { v4 as uuidv4 } from 'uuid';

const Faqs = () => {
  const theme = useTheme();
  const [isFaqsFilterDrawerOpen, setIsFaqsFilterDrawerOpen] = useState(false);
  const [faqsSearch, setFaqsSearch] = useState('');
  const [isFaqsDeleteModal, setIsFaqsDeleteModal] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const methodsFaqsFilters = useForm({
    resolver: yupResolver(faqsFilterValidationSchema),
    defaultValues: faqsFilterDefaultValues,
  });

  const onSubmit = () => {
    setIsFaqsFilterDrawerOpen(false);
  };
  const { handleSubmit } = methodsFaqsFilters;

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
          FAQS
        </Typography>
        <Button variant="contained" sx={{ height: '36px', fontWeight: '500' }}>
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
          searchBy={faqsSearch}
          setSearchBy={setFaqsSearch}
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
            <MenuItem>View</MenuItem>
            <MenuItem onClick={() => setIsFaqsDeleteModal(true)}>
              Delete
            </MenuItem>
          </Menu>
          <Button sx={styles.refreshButton(theme)}>
            <RefreshSharedIcon />
          </Button>
          <Button
            sx={styles.filterButton(theme)}
            onClick={() => setIsFaqsFilterDrawerOpen(true)}
          >
            <FilterSharedIcon /> &nbsp; Filter
          </Button>
        </Box>
      </Box>
      <Box>
        <TanstackTable columns={columns} data={faqsTableDate} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Box>
      <CommonDrawer
        isDrawerOpen={isFaqsFilterDrawerOpen}
        onClose={() => setIsFaqsFilterDrawerOpen(false)}
        title="Filters"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={() => setIsFaqsFilterDrawerOpen(false)}
      >
        <>
          <FormProvider
            methods={methodsFaqsFilters}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              {faqsFilterFiltersDataArray?.map((item: any) => (
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
        open={isFaqsDeleteModal}
        handleClose={() => setIsFaqsDeleteModal(false)}
        handleSubmit={() => setIsFaqsDeleteModal(false)}
      />
    </Box>
  );
};

export default Faqs;
