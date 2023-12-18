import React from 'react';

import { Box, Typography, Button, Grid } from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import useLifecycleStage from './useLifecycleStage';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';

import { styles } from './LifecycleStage.style';
import TanstackTable from '@/components/Table/TanstackTable';

import { drawerButtonTitle, drawerTitle } from './LifecycleStage.data';
import { LifeCycleStageTableData } from '@/mock/modules/airMarketer/SocialMarketing/SocialInbox';

const LifeCycleStage = () => {
  const {
    isDraweropen,
    setIsDraweropen,
    isDeleteModalOpen,
    productSearch,
    setproductSearch,
    theme,
    handleCloseDrawer,
    dealPipelines,
    handleSubmit,
    onSubmit,
    handleCloseDeleteModal,
    handleDelete,
    getRowValues,
  } = useLifecycleStage();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={!!isDraweropen}
        onClose={handleCloseDrawer}
        title={drawerTitle[isDraweropen]}
        okText={drawerButtonTitle[isDraweropen]}
        footer={isDraweropen === 'View' ? false : true}
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={dealPipelines}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <RHFTextField
                  name="StageName"
                  label="Stage Name"
                  size="small"
                  placeholder="Stage Name"
                  required={true}
                />
              </Grid>
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>

      <AlertModals
        message="You're about to delete Pipeline. Are you sure?"
        type="delete"
        open={isDeleteModalOpen}
        handleClose={handleCloseDeleteModal}
        handleSubmit={handleDelete}
      />
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginBottom: '10px',
          }}
        >
          <Typography variant="h3">Life Cycle Stages</Typography>
          <Button
            variant="contained"
            sx={styles?.createBtn}
            onClick={() => setIsDraweropen('Add')}
            className="small"
          >
            <AddCircleIcon
              sx={{
                color: `${theme?.palette?.common?.white}`,
                fontSize: '16px',
              }}
            />
            Add Stage
          </Button>
        </Box>

        <Search
          label={'Search here'}
          searchBy={productSearch}
          setSearchBy={setproductSearch}
          width="260px"
          size="small"

          // sx={{ marginTop: '2rem', marginBottom: '1rem' }}
        />

        <Grid sx={{ marginTop: '2rem' }}>
          <TanstackTable
            columns={getRowValues}
            data={LifeCycleStageTableData}
            isPagination
          />
        </Grid>
      </Box>
    </>
  );
};

export default LifeCycleStage;
