import React from 'react';

import { Box, Typography, Button, Grid } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import Search from '@/components/Search';

import { AlertModals } from '@/components/AlertModals';

import useContactStatus from './useContactStatus';

import { ContactStatusTableData, dataArray } from './ContactStatus.data';

import { styles } from './ContactStatus.style';

import { v4 as uuidv4 } from 'uuid';

const ContactStatus = () => {
  const {
    isDraweropen,
    setIsDraweropen,
    productSearch,
    setproductSearch,
    theme,
    handleCloseDrawer,
    ContactStatus,
    handleSubmit,
    onSubmit,
    getRowValues,
    isOpenAlert,
    handleCloseAlert,
    isModalHeading,
    setIsModalHeading,
  } = useContactStatus();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDraweropen}
        onClose={handleCloseDrawer}
        title={`${isModalHeading} Status Name`}
        okText={'Add'}
        footer={isModalHeading === 'View' ? false : true}
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={ContactStatus}>
            <Grid container spacing={4}>
              {dataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component
                    {...item.componentProps}
                    size={'small'}
                  ></item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>

      <Box
        sx={{
          border: `1px solid ${theme?.palette?.grey[700]}`,
          padding: '1rem',
          boxShadow: '0px 1px 2px 0px #1018280F',
          borderRadius: '8px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h4">Contact Status</Typography>
          <Button
            variant="contained"
            sx={styles.createBtn}
            onClick={() => {
              setIsDraweropen(true);
              setIsModalHeading('Create');
            }}
          >
            <AddCircleIcon
              sx={{
                color: `${theme?.palette?.common.white}`,
                fontSize: '16px',
              }}
            />{' '}
            Add Status
          </Button>
        </Box>
        <Box sx={styles.searchAction}>
          <Search
            label={'Search here'}
            searchBy={productSearch}
            setSearchBy={setproductSearch}
            width="100%"
            size="small"
            sx={{
              '@media (max-width: 500px)': {
                width: '100%',
              },
            }}
          />
        </Box>
        <Grid>
          <TanstackTable columns={getRowValues} data={ContactStatusTableData} />
          <CustomPagination
            count={1}
            rowsPerPageOptions={[1, 2]}
            entriePages={1}
          />
        </Grid>

        <AlertModals
          message={"You're about to delete the contact status."}
          type={'delete'}
          open={isOpenAlert}
          handleClose={handleCloseAlert}
          handleSubmit={() => {}}
        />
      </Box>
    </>
  );
};

export default ContactStatus;
