import React from 'react';

import { Box, Typography, Button, Grid } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import Search from '@/components/Search';

import useLifeCycleStage from './useLifeCycleStage';

import { LifeCycleStageTableData, dataArray } from './LifeCycleStage.data';

import { styles } from './LifeCycleStage.style';

import { v4 as uuidv4 } from 'uuid';
import { AlertModals } from '@/components/AlertModals';

const LifeCycleStage = () => {
  const {
    isDraweropen,
    setIsDraweropen,
    productSearch,
    setproductSearch,
    theme,
    handleCloseDrawer,
    LifeCycleStage,
    handleSubmit,
    onSubmit,
    getRowValues,
    isOpenAlert,
    handleCloseAlert,
    isModalHeading,
    setIsModalHeading,
  } = useLifeCycleStage();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDraweropen}
        onClose={handleCloseDrawer}
        title={`${isModalHeading} Lifecycle Stage`}
        okText={'Add'}
        footer={isModalHeading === 'View' ? false : true}
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={LifeCycleStage}>
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
          <Typography variant="h4">Life cycle Stages</Typography>
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
            Add Stage
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
          <TanstackTable
            columns={getRowValues}
            data={LifeCycleStageTableData}
          />
          <CustomPagination
            count={1}
            rowsPerPageOptions={[1, 2]}
            entriePages={1}
          />
        </Grid>

        <AlertModals
          message={"You're about to delete the lifecycle stage Lead."}
          type={'delete'}
          open={isOpenAlert}
          handleClose={handleCloseAlert}
          handleSubmit={() => {}}
        />
      </Box>
    </>
  );
};

export default LifeCycleStage;
