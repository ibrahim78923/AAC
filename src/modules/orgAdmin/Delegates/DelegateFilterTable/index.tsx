import React from 'react';

import { Box, Button, Grid, Typography } from '@mui/material';

import { CheckCircle } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';

import { FilterrIcon, UserFeatureIcon } from '@/assets/icons';

import { FormProvider } from '@/components/ReactHookForm';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import CommonModal from '@/components/CommonModal';
import CustomPagination from '@/components/CustomPagination';
import CommonDrawer from '@/components/CommonDrawer';

import { columns, dataArray } from './DelegateFilter.data';
import useDelegateFilterTable from './useDelegateFilterTable';

import { v4 as uuidv4 } from 'uuid';

import { delegateData } from '@/mock/modules/orgAdmin/Delegate';

import { styles } from './DelegateFilterTable.style';

const DelegateFilterTable = () => {
  const {
    inProgress,
    setInProgress,
    setIsComplete,
    isComplete,
    value,
    setValue,
    status,
    setStatus,
    isFilter,
    setIsFilter,
    theme,
    methods,
  } = useDelegateFilterTable();

  return (
    <>
      <Box sx={{ marginTop: '1rem' }}>
        <Box>
          <Grid container spacing={2}>
            <Grid item lg={3} md={3} sm={6} xs={12}>
              <Search
                label="Search here"
                width="100%"
                searchBy={value}
                setSearchBy={(e: any) => {
                  setValue(e);
                }}
              />
            </Grid>
            <Grid item lg={9} md={9} sm={6} xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  onClick={() => {
                    setIsFilter(true);
                  }}
                  variant="outlined"
                  sx={styles?.fiterButton(theme)}
                >
                  <FilterrIcon /> Filter
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Grid sx={{ marginTop: '1rem' }}>
          <TanstackTable
            columns={columns(setInProgress, setStatus, setIsComplete)}
            data={delegateData}
          />
          <CustomPagination
            count={1}
            rowsPerPageOptions={[1, 2]}
            entriePages={1}
          />
        </Grid>
      </Box>
      <CommonDrawer
        isDrawerOpen={isFilter}
        onClose={() => {
          setIsFilter(false);
        }}
        title="Filters"
        okText="Apply"
        isOk={true}
        footer={true}
      >
        <FormProvider methods={methods}>
          <Grid container spacing={4}>
            {dataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </CommonDrawer>
      {status === 'Completed' ? (
        <CommonModal
          open={inProgress}
          handleClose={() => setInProgress(false)}
          handleSubmit={function (): void {
            throw new Error('Function not implemented.');
          }}
          headerIcon={<UserFeatureIcon />}
          okText=""
          title={'Track the application of Air Applecart in real-time'}
          footer={false}
        >
          <Box sx={{ borderRadius: '16px', background: '#EEF9F1' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Typography
                  sx={{
                    background: `${theme?.palette?.success?.main}`,
                    padding: '4px 12px',
                    borderRadius: '8px',
                    color: `${theme?.palette?.common?.white}`,
                    fontSize: '12px',
                    fontWeight: 400,
                  }}
                >
                  1
                </Typography>
                <Typography
                  sx={{
                    color: `${theme?.palette?.slateBlue?.main}`,
                    fontSize: '18px',
                    fontWeight: 400,
                  }}
                >
                  Sign Up
                </Typography>
              </Box>
              <CheckCircle sx={{ color: `${theme?.palette?.success?.main}` }} />
            </Box>
          </Box>
          <Box
            sx={{
              borderRadius: '16px',
              background: '#EEF9F1',
              marginTop: '1REM',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Typography
                  sx={{
                    background: `${theme?.palette?.success?.main}`,
                    padding: '4px 12px',
                    borderRadius: '8px',
                    color: `${theme?.palette?.common?.white}`,
                    fontSize: '12px',
                    fontWeight: 400,
                  }}
                >
                  2
                </Typography>
                <Typography
                  sx={{
                    color: `${theme?.palette?.slateBlue?.main}`,
                    fontSize: '18px',
                    fontWeight: 400,
                  }}
                >
                  Buy Product Plan
                </Typography>
              </Box>
              <CheckCircle sx={{ color: `${theme?.palette?.success?.main}` }} />
            </Box>
          </Box>
        </CommonModal>
      ) : status === 'In-progress' ? (
        <CommonModal
          open={isComplete}
          handleClose={() => setIsComplete(false)}
          handleSubmit={function (): void {
            throw new Error('Function not implemented.');
          }}
          headerIcon={<UserFeatureIcon />}
          okText=""
          title={'Track the application of Air Applecart in real-time'}
          footer={false}
        >
          <Box sx={{ borderRadius: '16px', background: '#EEF9F1' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Typography
                  sx={{
                    background: `${theme?.palette?.success?.main}`,
                    padding: '4px 12px',
                    borderRadius: '8px',
                    color: `${theme?.palette?.common?.white}`,
                    fontSize: '12px',
                    fontWeight: 400,
                  }}
                >
                  1
                </Typography>
                <Typography
                  sx={{
                    color: `${theme?.palette?.slateBlue?.main}`,
                    fontSize: '18px',
                    fontWeight: 400,
                  }}
                >
                  Sign Up
                </Typography>
              </Box>
              <CheckCircle sx={{ color: `${theme?.palette?.success?.main}` }} />
            </Box>
          </Box>
          <Box
            sx={{
              borderRadius: '16px',
              background: '#FF4A4A12',
              marginTop: '1REM',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Typography
                  sx={{
                    background: `${theme?.palette?.error?.main}`,
                    padding: '4px 12px',
                    borderRadius: '8px',
                    color: `${theme?.palette?.common?.white}`,
                    fontSize: '12px',
                    fontWeight: 400,
                  }}
                >
                  2
                </Typography>
                <Typography
                  sx={{
                    color: `${theme?.palette?.slateBlue?.main}`,
                    fontSize: '18px',
                    fontWeight: 400,
                  }}
                >
                  Buy Product Plan
                </Typography>
              </Box>
              <CancelIcon sx={{ color: `${theme?.palette?.error?.main}` }} />
            </Box>
          </Box>
        </CommonModal>
      ) : null}
    </>
  );
};

export default DelegateFilterTable;
