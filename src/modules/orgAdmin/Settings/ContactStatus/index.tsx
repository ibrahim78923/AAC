import React from 'react';

import { Box, Typography, Button, Grid } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';

import { AlertModals } from '@/components/AlertModals';

import useContactStatus from './useContactStatus';

import { dataArray } from './ContactStatus.data';

import { styles } from './ContactStatus.style';

import { v4 as uuidv4 } from 'uuid';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_SETTINGS_CONTACT_STATUS_PERMISSIONS } from '@/constants/permission-keys';
import { DRAWER_ACTIONS_TITLES } from '@/constants/strings';

const ContactStatus = () => {
  const {
    setPageLimit,
    setPage,
    isDraweropen,
    setIsDraweropen,
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
    tableRow,
    loadingList,
    deleteContactsStatus,
    loadingUpdateContactStatus,
    setSearchValue,
    loadingAddStatus,
    loadingDelete,
  } = useContactStatus();

  return (
    <>
      {isDraweropen && (
        <CommonDrawer
          isDrawerOpen={isDraweropen}
          onClose={handleCloseDrawer}
          title={
            isModalHeading === DRAWER_ACTIONS_TITLES?.EDIT
              ? 'Edit Contact Status'
              : isModalHeading === DRAWER_ACTIONS_TITLES?.VIEW
                ? 'View Contact Status'
                : 'Create Contact Status'
          }
          okText={
            isModalHeading === DRAWER_ACTIONS_TITLES?.EDIT ? 'Update' : 'Add'
          }
          footer={isModalHeading === DRAWER_ACTIONS_TITLES?.VIEW ? false : true}
          isOk={true}
          submitHandler={handleSubmit(onSubmit)}
          isLoading={loadingUpdateContactStatus || loadingAddStatus}
        >
          <Box sx={{ paddingTop: '1rem' }}>
            <FormProvider methods={ContactStatus}>
              <Grid container spacing={4}>
                {dataArray?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
                    <item.component
                      disabled={
                        isModalHeading === DRAWER_ACTIONS_TITLES?.VIEW
                          ? true
                          : false
                      }
                      {...item.componentProps}
                      size={'small'}
                    ></item.component>
                  </Grid>
                ))}
              </Grid>
            </FormProvider>
          </Box>
        </CommonDrawer>
      )}

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
          <PermissionsGuard
            permissions={[
              ORG_ADMIN_SETTINGS_CONTACT_STATUS_PERMISSIONS?.ADD_CONTACT,
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
              />{' '}
              Add Status
            </Button>
          </PermissionsGuard>
        </Box>
        <Box sx={styles?.searchAction}>
          <Search
            label={'Search here'}
            setSearchBy={setSearchValue}
            size="small"
          />
        </Box>
        <Grid>
          <PermissionsGuard
            permissions={[
              ORG_ADMIN_SETTINGS_CONTACT_STATUS_PERMISSIONS?.GRIDVIEW,
            ]}
          >
            <TanstackTable
              columns={getRowValues}
              data={tableRow?.conatactStatus}
              isLoading={loadingList}
              currentPage={tableRow?.meta?.page}
              count={tableRow?.meta?.pages}
              pageLimit={tableRow?.meta?.limit}
              totalRecords={tableRow?.meta?.total}
              setPage={setPage}
              setPageLimit={setPageLimit}
              onPageChange={(page: any) => setPage(page)}
              isPagination
            />
          </PermissionsGuard>
        </Grid>

        <AlertModals
          message={"You're about to delete the contact status."}
          type={'delete'}
          open={isOpenAlert}
          handleClose={handleCloseAlert}
          handleSubmitBtn={() => {
            deleteContactsStatus();
          }}
          loading={loadingDelete}
        />
      </Box>
    </>
  );
};

export default ContactStatus;
