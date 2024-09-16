import React, { createElement } from 'react';
import { Box, Typography, Button, Grid, Skeleton } from '@mui/material';
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
import { componentMap } from '@/utils/dynamic-forms';
import { API_STATUS } from '@/constants';
import { DRAWER_ACTIONS_TITLES } from '@/constants/strings';

const LifeCycleStage = () => {
  const {
    postLifeCyleStageLoading,
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
    loadingDelete,
    form,
    getDynamicFieldsStatus,
    lifeCycleStageLoading,
  } = useLifeCycleStage();

  return (
    <>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.grey[700]}`,
          padding: '1rem',
          boxShadow: `0px 1px 2px 0px ${theme?.palette?.custom?.dark_shade_green}`,
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
          <Typography variant="h4">Life Cycle Stages</Typography>
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
            label={'Search by name'}
            searchBy={productSearch}
            setSearchBy={setproductSearch}
            size="small"
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

        {isOpenAlert && (
          <AlertModals
            message={"You're about to delete the lifecycle stage."}
            type={'delete'}
            open={isOpenAlert}
            handleClose={handleCloseAlert}
            handleSubmitBtn={deleteStageLifeCycle}
            loading={loadingDelete}
          />
        )}
      </Box>
      {isDraweropen && (
        <CommonDrawer
          isDrawerOpen={isDraweropen}
          onClose={handleCloseDrawer}
          title={`${isModalHeading} Lifecycle Stage`}
          okText={
            isModalHeading === DRAWER_ACTIONS_TITLES?.EDIT ? 'Update' : 'Add'
          }
          footer={isModalHeading === DRAWER_ACTIONS_TITLES?.VIEW ? false : true}
          isOk={true}
          submitHandler={handleSubmit(onSubmit)}
          isLoading={postLifeCyleStageLoading || lifeCycleStageLoading}
        >
          <Box sx={{ paddingTop: '1rem' }}>
            <FormProvider methods={LifeCycleStage}>
              <Grid container spacing={2}>
                {dataArray(isModalHeading)?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
                    <item.component
                      {...item?.componentProps}
                      size={'small'}
                    ></item.component>
                  </Grid>
                ))}

                {getDynamicFieldsStatus?.status === API_STATUS?.PENDING ? (
                  <>
                    <Grid item xs={12}>
                      <Skeleton
                        variant="rounded"
                        sx={{ width: '100%', height: '45px' }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Skeleton
                        variant="rounded"
                        sx={{ width: '100%', height: '45px' }}
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    {form?.map((item: any) => (
                      <Grid item xs={12} key={item?.id}>
                        {componentMap[item?.component] &&
                          createElement(componentMap[item?.component], {
                            ...item?.componentProps,
                            name: item?.componentProps?.label,
                            size: 'small',
                            disabled:
                              isModalHeading === DRAWER_ACTIONS_TITLES?.VIEW
                                ? true
                                : false,
                          })}
                      </Grid>
                    ))}
                  </>
                )}
              </Grid>
            </FormProvider>
          </Box>
        </CommonDrawer>
      )}
    </>
  );
};

export default LifeCycleStage;
