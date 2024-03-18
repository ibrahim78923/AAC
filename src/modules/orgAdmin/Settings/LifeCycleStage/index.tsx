import React from 'react';

import { Box, Typography, Button, Grid } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';

import useLifeCycleStage from './useLifeCycleStage';

import { dataArray } from './LifeCycleStage.data';

import { styles } from './LifeCycleStage.style';

import { v4 as uuidv4 } from 'uuid';
import { ORG_ADMIN_SETTINGS_LIFECYCLE_STAGES_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

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
    tableRow,
    deleteStageLifeCycle,
    setPage,
    setPageLimit,
    isSuccess,
    isLoading,
  } = useLifeCycleStage();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDraweropen}
        onClose={handleCloseDrawer}
        title={`${isModalHeading} Lifecycle Stage`}
        okText={isModalHeading === 'Edit' ? 'Update' : 'Add'}
        footer={isModalHeading === 'View' ? false : true}
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={LifeCycleStage}>
            <Grid container spacing={4}>
              {dataArray(isModalHeading)?.map((item: any) => (
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
          <PermissionsGuard
            permissions={[
              ORG_ADMIN_SETTINGS_LIFECYCLE_STAGES_PERMISSIONS?.CREATE_STAGES,
            ]}
          >
            <Button
              variant="contained"
              sx={styles?.createBtn}
              onClick={() => {
                setIsDraweropen(true);
                setIsModalHeading('Create');
              }}
            >
              <AddCircleIcon
                sx={{
                  color: `${theme?.palette?.common?.white}`,
                  fontSize: '16px',
                }}
              />
              Add Stage
            </Button>
          </PermissionsGuard>
        </Box>
        <Box sx={styles?.searchAction}>
          <Search
            label={'Search here'}
            searchBy={productSearch}
            setSearchBy={setproductSearch}
            width="260px"
          />
        </Box>
        <Grid>
          <PermissionsGuard
            permissions={[
              ORG_ADMIN_SETTINGS_LIFECYCLE_STAGES_PERMISSIONS?.GRIDVIEW,
            ]}
          >
            <TanstackTable
              columns={getRowValues}
              data={tableRow?.data?.lifecycleStages}
              isPagination
              count={tableRow?.data?.meta?.pages}
              totalRecords={tableRow?.data?.meta?.total}
              onPageChange={(page: any) => setPage(page)}
              setPage={setPage}
              setPageLimit={setPageLimit}
              pageLimit={tableRow?.data?.meta?.limit}
              isLoading={isLoading}
              isSuccess={isSuccess}
            />
          </PermissionsGuard>
        </Grid>

        <AlertModals
          message={"You're about to delete the lifecycle stage Lead."}
          type={'delete'}
          open={isOpenAlert}
          handleClose={handleCloseAlert}
          handleSubmitBtn={() => deleteStageLifeCycle()}
        />
      </Box>
    </>
  );
};

export default LifeCycleStage;
