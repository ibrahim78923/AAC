import React from 'react';

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
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import { AlertModals } from '@/components/AlertModals';
import AddFaq from './AddFaq';

import { columns, faqsFilterFiltersDataArray } from './Faqs.data';

import { FormProvider } from '@/components/ReactHookForm';

import { DownIcon, FilterSharedIcon, RefreshSharedIcon } from '@/assets/icons';
import PlusShared from '@/assets/icons/shared/plus-shared';

import { styles } from './Faqs.styles';

import { v4 as uuidv4 } from 'uuid';
import useFaqs from './useFaqs';

const Faqs = () => {
  const {
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,
    isDisabled,
    setIsDisabled,
    tableRowValues,
    setTableRowValues,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    loagingGetFaqs,
    dataGetFaqs,
    handleSearch,
    searchValue,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,
    modalTitle,
    openModalAddFaq,
    handleOpenModalFaq,
    handleCloseModalFaq,
    methodsAddFaqs,
    handleAddFaqSubmit,
    loadingAddFaq,
    handleDeleteFaq,
    loadingDelete,
    isFaqsDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
  } = useFaqs();
  const theme = useTheme();
  const getFaqsTableColumns = columns(
    setIsDisabled,
    tableRowValues,
    setTableRowValues,
  );

  return (
    <Box
      sx={{
        borderRadius: '15px',
        border: '1px solid #EAECF0',
        // padding: '16px 24px',
      }}
    >
      <Box sx={{ padding: '16px 24px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: '19px',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: '600' }}>
            FAQS
          </Typography>
          <Button
            variant="contained"
            sx={{ height: '36px', fontWeight: '500' }}
            onClick={() => handleOpenModalFaq('Add a New FAQ')}
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
            flexWrap: 'wrap',
            gap: '10px',
            width: '100%',
          }}
        >
          <Search
            label={'Search here'}
            value={searchValue}
            onChange={handleSearch}
            width="100%"
          />
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Button
              id="basic-button"
              aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={actionMenuOpen ? 'true' : undefined}
              onClick={handleActionsMenuClick}
              sx={{
                color: theme.palette.grey[500],
                height: '40px',
                border: '1.5px solid #e7e7e9',
                '@media (max-width:581px)': {
                  width: '100%',
                },
              }}
              disabled={isDisabled}
            >
              Actions &nbsp; <DownIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={actionMenuOpen}
              onClose={handleActionsMenuClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => handleOpenModalFaq('Edit FAQ')}>
                Edit
              </MenuItem>
              <MenuItem onClick={() => handleOpenModalFaq('FAQ')}>
                View
              </MenuItem>
              <MenuItem onClick={handleOpenModalDelete}>Delete</MenuItem>
            </Menu>
            <Button sx={styles.refreshButton(theme)} onClick={handleRefresh}>
              <RefreshSharedIcon />
            </Button>
            <Button sx={styles.filterButton(theme)} onClick={handleOpenFilters}>
              <FilterSharedIcon /> &nbsp; Filter
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <TanstackTable
          columns={getFaqsTableColumns}
          data={dataGetFaqs?.data?.faqs}
          isLoading={loagingGetFaqs}
        />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Box>
      <CommonDrawer
        isDrawerOpen={openFilters}
        onClose={handleCloseFilters}
        title="Filters"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={handleFiltersSubmit}
      >
        <FormProvider methods={methodsFilter}>
          <Grid container spacing={4}>
            {faqsFilterFiltersDataArray()?.map((item: any) => (
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
      </CommonDrawer>

      <AlertModals
        message={'Are you sure you want to delete this entry ?'}
        type="delete"
        open={isFaqsDeleteModal}
        handleClose={handleCloseModalDelete}
        handleSubmitBtn={handleDeleteFaq}
        loading={loadingDelete}
      />
      <AddFaq
        title={modalTitle}
        isAddModalOpen={openModalAddFaq}
        onClose={handleCloseModalFaq}
        formMethods={methodsAddFaqs}
        handleSubmit={handleAddFaqSubmit}
        isLoading={loadingAddFaq}
        // faqID={tableRowValues[0]}
      />
    </Box>
  );
};

export default Faqs;
