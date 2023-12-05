import React from 'react';

import { Box, Button, Grid } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';

import { TemplatesTableData, dataArray } from './Templates.data';

import { styles } from './Templates.style';

import { v4 as uuidv4 } from 'uuid';
import useTemplates from './useTemplates';

const Templates = () => {
  const {
    isDraweropen,
    setIsDraweropen,
    productSearch,
    setproductSearch,
    theme,
    handleCloseDrawer,
    Templates,
    handleSubmit,
    onSubmit,
    getRowValues,
    isOpenAlert,
    handleCloseAlert,
    isModalHeading,
    setIsModalHeading,
    deleteStageLifeCycle,
  } = useTemplates();

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
          <FormProvider methods={Templates}>
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
          <Box sx={styles?.searchAction}>
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
            Add Stage
          </Button>
        </Box>

        <Grid>
          <TanstackTable columns={getRowValues} data={TemplatesTableData} />
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
          handleSubmitBtn={() => deleteStageLifeCycle()}
        />
      </Box>
    </>
  );
};

export default Templates;
